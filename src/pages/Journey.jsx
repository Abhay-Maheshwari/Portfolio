import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import AnimatedPage from "../components/AnimatedPage";
import { expCards, expLogos } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import "./Journey.css";

const Journey = () => {
    const canvasRef = useRef(null);
    const grainRef = useRef(null);
    const tooltipRef = useRef(null);
    const [hoveredExpIndex, setHoveredExpIndex] = useState(null);
    const [selectedExpIndex, setSelectedExpIndex] = useState(null);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const raycaster = new THREE.Raycaster();

        // ---------- content ----------
        const PROJECTS = expCards.map((exp, index) => ({
            name: exp.company,
            sub: exp.title,
            hue: (index * 0.18) % 1.0
        }));
        const SPACING = 7.5;

        // ---------- renderer / scene ----------
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 11);

        const world = new THREE.Group();
        scene.add(world);

        const bgLayer = new THREE.Group();
        const crystalLayer = new THREE.Group();
        const logoLayer = new THREE.Group();
        world.add(bgLayer, crystalLayer, logoLayer);

        // ---------- disposable tracking ----------
        const materialsToDispose = [];
        const geometriesToDispose = [];
        const texturesToDispose = [];





        // ---------- crystal geometry ----------
        function noise3(x, y, z) {
            return Math.sin(x * 1.3 + y * 2.1) * Math.cos(y * 1.7 - z * 1.1) * Math.sin(z * 1.9 + x * 0.7);
        }
        function makeCrystalGeometry(seed) {
            const geo = new THREE.IcosahedronGeometry(1, 2);
            const pos = geo.attributes.position;
            const sx = seed * 3.1, sy = seed * 1.7, sz = seed * 2.3;
            for (let i = 0; i < pos.count; i++) {
                const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)).normalize();
                let d = 1.0
                    + 0.32 * noise3(v.x * 1.6 + sx, v.y * 1.6 + sy, v.z * 1.6 + sz)
                    + 0.14 * noise3(v.x * 3.4 + sx * 2.0, v.y * 3.4 + sy * 2.0, v.z * 3.4 + sz * 2.0);
                d = Math.max(d, 0.55);
                pos.setXYZ(i, v.x * d, v.y * d, v.z * d);
            }
            geo.computeVertexNormals();
            const flat = geo.index ? geo.toNonIndexed() : geo;
            flat.computeVertexNormals();
            geometriesToDispose.push(flat);
            if (geo !== flat) geometriesToDispose.push(geo);
            return flat;
        }

        // ---------- crystal shader material ----------
        const vertexShader = `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vScreenUV;
        void main(){
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
          vViewPosition = -mvPosition.xyz;
          vec4 proj = projectionMatrix * mvPosition;
          gl_Position = proj;
          vScreenUV = (proj.xy/proj.w)*0.5+0.5;
        }`;
        const fragmentShader = `
        precision highp float;
        uniform sampler2D tBackground;
        uniform float uTime;
        uniform float uAberration;
        uniform float uRefraction;
        uniform float uHue;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vScreenUV;
        
        vec3 palette(float t){
          vec3 a = vec3(0.5,0.5,0.5);
          vec3 b = vec3(0.5,0.5,0.5);
          vec3 c = vec3(1.0,1.0,1.0);
          vec3 d = vec3(0.0,0.33,0.67) + uHue;
          return a + b*cos(6.28318*(c*t+d));
        }
        
        void main(){
          vec3 normal = normalize(vNormal);
          if(!gl_FrontFacing) normal = -normal;
          vec3 viewDir = normalize(vViewPosition);
        
          float NdV = clamp(dot(normal, viewDir), 0.0, 1.0);
          float fresnel = pow(1.0 - NdV, 3.2);
        
          vec2 refractOffset = normal.xy * uRefraction;
          vec2 uvR = vScreenUV + refractOffset * (1.0 - uAberration);
          vec2 uvG = vScreenUV + refractOffset;
          vec2 uvB = vScreenUV + refractOffset * (1.0 + uAberration);
        
          float r = texture2D(tBackground, clamp(uvR,0.001,0.999)).r;
          float g = texture2D(tBackground, clamp(uvG,0.001,0.999)).g;
          float b = texture2D(tBackground, clamp(uvB,0.001,0.999)).b;
          vec3 refracted = vec3(r,g,b);
        
          float iridT = fresnel*1.6 + normal.x*0.4 + normal.y*0.25 + uTime*0.015;
          vec3 irid = palette(iridT);
        
          vec3 lightDir = normalize(vec3(0.4, 0.6, 0.7));
          vec3 halfV = normalize(lightDir + viewDir);
          float spec = pow(clamp(dot(normal, halfV), 0.0, 1.0), 60.0);
        
          vec3 lightDir2 = normalize(vec3(-0.5, -0.3, 0.6));
          vec3 halfV2 = normalize(lightDir2 + viewDir);
          float spec2 = pow(clamp(dot(normal, halfV2), 0.0, 1.0), 90.0);
        
          vec3 color = refracted;
          color = mix(color, color + irid*0.5, fresnel*0.35);
          color = mix(color, vec3(1.0), fresnel*0.22);
          color += spec*1.4 + spec2*1.1;
        
          gl_FragColor = vec4(color, 1.0);
        }`;

        // ---------- render target for refraction capture ----------
        const rt = new THREE.WebGLRenderTarget(512, 512, { depthBuffer: false });
        texturesToDispose.push(rt);

        const textureLoader = new THREE.TextureLoader();

        // ---------- build crystals ----------
        const crystals = [];
        const linePoints = [];
        for (let i = 0; i < PROJECTS.length; i++) {
            const p = PROJECTS[i];

            const seed = i * 7.13 + 1.0;
            const geo = makeCrystalGeometry(seed);
            const mat = new THREE.ShaderMaterial({
                vertexShader, fragmentShader,
                uniforms: {
                    tBackground: { value: rt.texture },
                    uTime: { value: 0 },
                    uAberration: { value: 0.05 },
                    uRefraction: { value: 0.14 },
                    uHue: { value: p.hue }
                }
            });
            materialsToDispose.push(mat);
            const mesh = new THREE.Mesh(geo, mat);

            const sideSign = i % 2 === 0 ? -1 : 1;
            const isMobile = window.innerWidth < 768;
            const baseX = isMobile ? (Math.random() - 0.5) * 0.5 : sideSign * (1.3 + Math.random() * 1.0);
            const baseY = -i * SPACING + (Math.random() - 0.5) * 0.6;
            const baseZ = -Math.random() * 2.2;
            const scale = isMobile ? (0.8 + Math.random() * 0.4) : (1.5 + Math.random() * 0.9);
            mesh.position.set(baseX, baseY, baseZ);
            mesh.scale.setScalar(scale);
            mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

            crystalLayer.add(mesh);

            const logoPath = expLogos[i % expLogos.length].imgPath;
            const logoTex = textureLoader.load(logoPath);
            texturesToDispose.push(logoTex);
            
            const spriteMat = new THREE.SpriteMaterial({ 
                map: logoTex, 
                color: new THREE.Color().setRGB(8, 8, 8), // Super bright multiplier
                transparent: true, 
                opacity: 0.1,
                depthWrite: false,
                blending: THREE.AdditiveBlending 
            });
            materialsToDispose.push(spriteMat);
            
            const logoSprite = new THREE.Sprite(spriteMat);
            const spriteScale = isMobile ? 1.8 : 3.5;
            logoSprite.scale.set(spriteScale, spriteScale, 1);
            logoSprite.position.set(baseX, baseY, baseZ - 0.5);
            logoLayer.add(logoSprite);

            crystals.push({
                mesh,
                logoSprite,
                baseX, baseY, baseZ,
                baseScale: scale,
                currentScale: scale,
                currentAberration: 0.05,
                currentRefraction: 0.14,
                spin: new THREE.Vector3((Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.1),
                bobSpeed: 0.4 + Math.random() * 0.4,
                bobAmp: 0.18 + Math.random() * 0.12,
                phase: Math.random() * Math.PI * 2,
                index: i
            });
            linePoints.push(new THREE.Vector3(baseX, baseY, baseZ));
        }

        // ---------- timeline line ----------
        if (linePoints.length > 1) {
            const curve = new THREE.CatmullRomCurve3(linePoints);
            const curvePoints = curve.getPoints(50 * linePoints.length);
            const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
            const lineMat = new THREE.LineDashedMaterial({
                color: 0xffffff,
                linewidth: 1,
                scale: 1,
                dashSize: 0.2,
                gapSize: 0.1,
                transparent: true,
                opacity: 0.4
            });
            const timelineLine = new THREE.Line(lineGeo, lineMat);
            timelineLine.computeLineDistances();
            crystalLayer.add(timelineLine);
            geometriesToDispose.push(lineGeo);
            materialsToDispose.push(lineMat);
        }

        // ---------- starfield ----------
        const starField = new THREE.Group();
        scene.add(starField);

        const COUNT = 1400;
        const positions = new Float32Array(COUNT * 3);
        const scales = new Float32Array(COUNT);
        const phases = new Float32Array(COUNT);

        const yRange = SPACING * (PROJECTS.length + 2);
        for (let i = 0; i < COUNT; i++) {
            const r = 18 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const depthBias = Math.random();
            positions[i * 3 + 0] = Math.cos(theta) * r * (0.4 + depthBias * 0.6);
            positions[i * 3 + 1] = (Math.random() - 0.5) * yRange - yRange * 0.15;
            positions[i * 3 + 2] = -6 - depthBias * 34;
            scales[i] = (Math.random() * 1.6 + 0.4) * (depthBias * 0.6 + 0.5);
            phases[i] = Math.random() * Math.PI * 2;
        }

        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
        geometriesToDispose.push(starGeo);

        const starMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: { uTime: { value: 0 } },
            vertexShader: `
              attribute float aScale;
              attribute float aPhase;
              varying float vPhase;
              varying float vScale;
              void main(){
                vPhase = aPhase;
                vScale = aScale;
                vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
                gl_PointSize = aScale * (240.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
              }`,
            fragmentShader: `
              precision highp float;
              uniform float uTime;
              varying float vPhase;
              varying float vScale;
              void main(){
                float d = length(gl_PointCoord - vec2(0.5));
                float disc = smoothstep(0.5, 0.0, d);
                float twinkle = 0.55 + 0.45*sin(uTime*1.2 + vPhase);
                float alpha = disc * twinkle * min(vScale, 1.0);
                vec3 col = vec3(1.0);
                gl_FragColor = vec4(col, alpha);
              }`
        });
        materialsToDispose.push(starMat);

        const points = new THREE.Points(starGeo, starMat);
        starField.add(points);
        starField.userData.material = starMat;


        // ---------- scroll handling ----------
        let targetScroll = 0, currentScroll = 0;
        const maxScroll = (PROJECTS.length - 1) * SPACING + 2;
        const onWheel = (e) => {
            targetScroll += e.deltaY * 0.012;
            targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
            setHasScrolled(true);
        };

        let touchY = null;
        const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
        const onTouchMove = (e) => {
            if (touchY === null) return;
            const dy = touchY - e.touches[0].clientY;
            targetScroll += dy * 0.02;
            targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
            touchY = e.touches[0].clientY;
            setHasScrolled(true);
        };

        const mouse = new THREE.Vector2(0, 0);
        const mouseTarget = new THREE.Vector2(0, 0);
        const onMouseMove = (e) => {
            mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
            if (tooltipRef.current && window.innerWidth >= 768) {
                const rect = tooltipRef.current.getBoundingClientRect();
                let x = e.clientX + 20;
                let y = e.clientY + 20;
                
                // Prevent overflowing right side
                if (x + rect.width > window.innerWidth - 20) {
                    x = e.clientX - rect.width - 20;
                }
                
                // Prevent overflowing bottom
                if (y + rect.height > window.innerHeight - 20) {
                    y = e.clientY - rect.height - 20;
                }

                tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        const onClick = () => {
            if (lastHoveredI !== -1) {
                setSelectedExpIndex(lastHoveredI);
            }
        };

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedExpIndex(null);
            }
        };

        const resize = () => {
            const w = window.innerWidth, h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            rt.setSize(w * Math.min(window.devicePixelRatio, 2), h * Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', resize);
        resize();

        // ---------- render loop ----------
        const clock = new THREE.Clock();
        let rafId;
        let lastHoveredI = -1;

        function animate() {
            rafId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            currentScroll += (targetScroll - currentScroll) * 0.07;
            world.position.y = currentScroll;
            starField.position.y = currentScroll * 0.25;
            starField.rotation.y = t * 0.006;
            starField.userData.material.uniforms.uTime.value = t;

            mouse.x += (mouseTarget.x - mouse.x) * 0.06;
            mouse.y += (mouseTarget.y - mouse.y) * 0.06;
            world.rotation.y = mouse.x * 0.12;
            world.rotation.x = -mouse.y * 0.06;

            crystals.forEach(c => {
                const isHovered = c.index === lastHoveredI;
                
                const targetS = isHovered ? c.baseScale * 1.25 : c.baseScale;
                c.currentScale += (targetS - c.currentScale) * 0.1;
                c.mesh.scale.setScalar(c.currentScale);

                const targetAb = isHovered ? 0.45 : 0.05;
                c.currentAberration += (targetAb - c.currentAberration) * 0.1;
                c.mesh.material.uniforms.uAberration.value = c.currentAberration;

                const targetRef = isHovered ? 0.35 : 0.14;
                c.currentRefraction += (targetRef - c.currentRefraction) * 0.1;
                c.mesh.material.uniforms.uRefraction.value = c.currentRefraction;

                const speedMult = isHovered ? 3.0 : 1.0;
                c.mesh.rotation.x += c.spin.x * 0.01 * speedMult;
                c.mesh.rotation.y += c.spin.y * 0.01 * speedMult;
                c.mesh.rotation.z += c.spin.z * 0.01 * speedMult;
                
                c.mesh.position.y = c.baseY + Math.sin(t * c.bobSpeed + c.phase) * c.bobAmp;
                c.mesh.position.x = c.baseX + Math.sin(t * c.bobSpeed * 0.6 + c.phase) * 0.12;
                c.mesh.material.uniforms.uTime.value = t;

                const targetLogoOpacity = isHovered ? 1.0 : 0.15;
                c.logoSprite.material.opacity += (targetLogoOpacity - c.logoSprite.material.opacity) * 0.15;
                c.logoSprite.position.y = c.baseY + Math.sin(t * c.bobSpeed + c.phase) * c.bobAmp * 0.5;
                c.logoSprite.position.x = c.baseX + Math.sin(t * c.bobSpeed * 0.6 + c.phase) * 0.06;
            });

            raycaster.setFromCamera(mouseTarget, camera);
            const hits = raycaster.intersectObjects(crystals.map(c => c.mesh));
            if (hits.length > 0) {
                const hitMesh = hits[0].object;
                const hitCrystal = crystals.find(c => c.mesh === hitMesh);
                if (hitCrystal && lastHoveredI !== hitCrystal.index) {
                    lastHoveredI = hitCrystal.index;
                    setHoveredExpIndex(hitCrystal.index);
                }
            } else {
                if (lastHoveredI !== -1) {
                    lastHoveredI = -1;
                    setHoveredExpIndex(null);
                }
            }

            // pass 1: render background only
            crystalLayer.visible = false;
            renderer.setRenderTarget(rt);
            renderer.setClearColor(0x0b0e1a, 1);
            renderer.clear();
            renderer.render(scene, camera);

            // pass 2: render full scene to screen
            crystalLayer.visible = true;
            renderer.setRenderTarget(null);
            renderer.setClearColor(0x000000, 0);
            renderer.clear();
            renderer.render(scene, camera);
        }
        animate();

        // ---------- grain animation ----------
        const grainInterval = setInterval(() => {
            if (grainRef.current) {
                grainRef.current.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`;
            }
        }, 90);

        // ---------- cleanup ----------
        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
            clearInterval(grainInterval);

            geometriesToDispose.forEach(g => g.dispose());
            materialsToDispose.forEach(m => m.dispose());
            texturesToDispose.forEach(t => t.dispose());
            renderer.dispose();
            rt.dispose();
        };
    }, []);

    const selectedExp = selectedExpIndex !== null ? expCards[selectedExpIndex] : null;

    return (
        <AnimatedPage>
            <SEO 
                title="Professional Journey | Abhay Maheshwari"
                description="My career timeline and experience as a Software Engineer."
                url="https://abhay-maheshwari.site/journey"
            />
            <div className="journey-page">
                <canvas ref={canvasRef} id="gl-journey"></canvas>
                <div className="journey-vignette"></div>
                <div className="journey-grain" ref={grainRef}></div>

                <div className="journey-header">
                    <h1>Professional Journey</h1>
                    <p>A chronological path of my experience</p>
                </div>

                <div className={`journey-scrollhint ${hasScrolled ? 'hidden' : ''}`}>Scroll</div>

                <div ref={tooltipRef} className={`journey-tooltip ${hoveredExpIndex !== null && selectedExpIndex === null ? 'show' : ''}`}>
                    {hoveredExpIndex !== null && expCards[hoveredExpIndex] && (
                        <>
                            <h2>{expCards[hoveredExpIndex].company}</h2>
                            <p>{expCards[hoveredExpIndex].title} — {expCards[hoveredExpIndex].date}</p>
                        </>
                    )}
                </div>

                <AnimatePresence>
                    {selectedExp && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="journey-popup-overlay"
                            onClick={() => setSelectedExpIndex(null)}
                        >
                            <div className="journey-popup-content" onClick={e => e.stopPropagation()}>
                                <button className="journey-popup-close" onClick={() => setSelectedExpIndex(null)}>
                                    &times;
                                </button>
                                <h2>{selectedExp.title}</h2>
                                <h3>{selectedExp.company}</h3>
                                <p className="journey-popup-date">{selectedExp.date} &bull; {selectedExp.roleType}</p>
                                
                                <div className="journey-popup-review">
                                    <p>"{selectedExp.review}"</p>
                                </div>
                                
                                <div className="journey-popup-tech">
                                    {selectedExp.technologies.map((tech, i) => (
                                        <span key={i} className="tech-badge">{tech.name}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AnimatedPage>
    );
};

export default Journey;
