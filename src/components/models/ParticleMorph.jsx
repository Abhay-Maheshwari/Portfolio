import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uProgress;
uniform float uTime;

attribute vec3 aTarget;
attribute vec3 aRandom;

varying vec3 vColor;
varying vec3 vPos;
varying float vProgress;

// Simple noise for turbulence
vec3 getNoise(vec3 pos, float time) {
    return vec3(
        sin(pos.y * 2.0 + time + aRandom.x * 6.28) * 0.2,
        cos(pos.x * 2.0 + time + aRandom.y * 6.28) * 0.2,
        sin(pos.z * 2.0 + time + aRandom.z * 6.28) * 0.2
    );
}

void main() {
    vProgress = uProgress;
    
    vec3 posA = position;
    vec3 posB = aTarget;
    
    // Add organic idle animation
    posA += getNoise(posA, uTime * 0.8);
    posB += getNoise(posB, uTime * 0.8);
    
    // Complete the morph early in the scroll (first 15%) so it stays as crisp DNA
    float p = smoothstep(0.0, 0.15, uProgress);
    
    // Interpolate positions
    vec3 mixedPos = mix(posA, posB, p);
    
    // Add organic fluid transition instead of a box explosion
    float arc = sin(p * 3.14159);
    
    // Gentle turbulence to make it look like fluid/gas
    vec3 turbulence = getNoise(mixedPos, uTime * 1.5) * arc * 2.0;
    mixedPos += turbulence;
    
    // 1. Gentle Radial expansion
    vec2 dir = normalize(mixedPos.xz + vec2(0.001)); // prevent div by zero
    mixedPos.xz += dir * arc * 0.5; 
    
    // 2. Add a beautiful twist during the morph
    float twistAngle = arc * 2.0;
    float st = sin(twistAngle * mixedPos.y * 0.2);
    float ct = cos(twistAngle * mixedPos.y * 0.2);
    mat2 rotT = mat2(ct, -st, st, ct);
    mixedPos.xz = rotT * mixedPos.xz;
    
    // Global rotation to make it feel alive
    // Keep rotating even after DNA is formed
    float rotAngle = uTime * 0.15 + (uProgress * 6.28); 
    float s = sin(rotAngle);
    float c = cos(rotAngle);
    mat2 rot = mat2(c, -s, s, c);
    mixedPos.xz = rot * mixedPos.xz;

    vPos = mixedPos;
    
    vec4 mvPosition = modelViewMatrix * vec4(mixedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation - properly scaled for perspective
    float baseSize = 12.0 * (1.0 + aRandom.x * 0.5);
    gl_PointSize = baseSize * (10.0 / -mvPosition.z);
    
    // Slightly increase particle size in the middle so it stays dense
    gl_PointSize *= (1.0 + arc * 0.2);
}
`;

const fragmentShader = `
varying vec3 vPos;
varying float vProgress;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float r = length(coord) * 2.0;
    if (r > 1.0) discard;
    
    // Glow edge
    float alpha = pow(1.0 - r, 1.5);

    // Video Palette: Fire and Ice morphing to stark blue/white DNA
    vec3 coral = vec3(1.0, 0.3, 0.2);     // Fire/Red
    vec3 deepBlue = vec3(0.0, 0.3, 0.9);  // Deep Blue
    vec3 cyan = vec3(0.0, 0.8, 1.0);      // Cyan
    vec3 white = vec3(1.0, 1.0, 1.0);     // Stark White
    
    // Base mix based on height and X position
    float mixFactor = (vPos.y + 6.0) / 12.0; // 0 to 1
    mixFactor += sin(vPos.x * 2.0) * 0.2;
    
    // Shape A Palette (Hourglass)
    vec3 colorA = mix(coral, deepBlue, clamp(mixFactor, 0.0, 1.0));
    
    // Shape B Palette (DNA)
    vec3 colorB = mix(deepBlue, cyan, clamp(mixFactor, 0.0, 1.0));
    if (mod(vPos.y * 8.0, 2.0) < 0.3) {
        colorB = mix(colorB, white, 0.8); // White rungs
    }
    
    // Morph colors based on uProgress
    vec3 finalColor = mix(colorA, colorB, vProgress);
    
    // Lower alpha to prevent additive blending blowout, 0.25 for crisp details
    gl_FragColor = vec4(finalColor, alpha * 0.25);
}
`;

const ParticleMorph = ({ progressRef }) => {
    const materialRef = useRef();
    const groupRef = useRef();
    const count = 40000; // Reduced for cleaner, sharper details

    const [positions, targets, randoms] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const tgt = new Float32Array(count * 3);
        const rnd = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Shape A: Abstract Flowing Saddle/Galaxy
            const r1 = Math.random() * 8.0;
            const theta1 = Math.random() * Math.PI * 2;
            const x1 = r1 * Math.cos(theta1);
            const z1 = r1 * Math.sin(theta1);
            // Hyperbolic paraboloid equation (saddle) with some vertical thickness
            const y1 = (Math.pow(x1 / 4.0, 2.0) - Math.pow(z1 / 4.0, 2.0)) * 3.0 + (Math.random() - 0.5) * 1.5;
            
            pos[i * 3 + 0] = x1;
            pos[i * 3 + 1] = y1;
            pos[i * 3 + 2] = z1;

            // Shape B: DNA Helix (Fits in screen)
            const y2 = (Math.random() - 0.5) * 12.0; // Height -6 to 6
            const isStrand = Math.random() > 0.15; // 85% strand, 15% bridge
            let x2, z2;
            const turns = 1.2; // tighter turns
            const twist = y2 * turns;

            if (isStrand) {
                const strandPhase = Math.random() > 0.5 ? 0 : Math.PI;
                const r2 = 2.0 + (Math.random() * 0.3 - 0.15); // Strand thickness
                x2 = r2 * Math.cos(twist + strandPhase);
                z2 = r2 * Math.sin(twist + strandPhase);
            } else {
                // Bridge
                const step = 0.5;
                const rungY = Math.round(y2 / step) * step;
                const rungTwist = rungY * turns;
                const t = Math.random() * 2.0 - 1.0; // -1 to 1 between strands
                x2 = t * 2.0 * Math.cos(rungTwist);
                z2 = t * 2.0 * Math.sin(rungTwist);
            }

            tgt[i * 3 + 0] = x2;
            tgt[i * 3 + 1] = y2;
            tgt[i * 3 + 2] = z2;

            // Random attributes for noise
            rnd[i * 3 + 0] = Math.random();
            rnd[i * 3 + 1] = Math.random();
            rnd[i * 3 + 2] = Math.random();
        }

        return [pos, tgt, rnd];
    }, [count]);

    const uniforms = useMemo(() => ({
        uProgress: { value: 0 },
        uTime: { value: 0 },
    }), []);

    useFrame((state) => {
        if (materialRef.current && progressRef && progressRef.current !== undefined) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // Smoothly interpolate progress
            materialRef.current.uniforms.uProgress.value += (progressRef.current - materialRef.current.uniforms.uProgress.value) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-aTarget"
                        count={count}
                        array={targets}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-aRandom"
                        count={count}
                        array={randoms}
                        itemSize={3}
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export default ParticleMorph;
