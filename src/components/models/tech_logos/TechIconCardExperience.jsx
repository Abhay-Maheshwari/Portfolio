import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef, Suspense } from "react";
import * as THREE from "three";

// Loader component for 3D models
const ModelLoader = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#4B5563" wireframe />
  </mesh>
);

// Separate component for the 3D model to enable Suspense
const Model3D = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group scale={model.scale} rotation={model.rotation}>
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIconCardExperience = ({ model }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
    if (mobile) return;

    const currentCanvas = canvasRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
      }
    );

    if (currentCanvas) {
      observer.observe(currentCanvas);
    }

    return () => {
      if (currentCanvas) {
        observer.unobserve(currentCanvas);
      }
    };
  }, []);

  if (isMobile) {
    const initials = model.name === "Three.js" ? "3D" : model.name.substring(0, 2).toUpperCase();
    const glowColor = model.name === "React" ? "rgba(34, 211, 238, 0.25)" : 
                      model.name === "Python" ? "rgba(251, 191, 36, 0.25)" :
                      model.name === "Node.js" ? "rgba(74, 222, 128, 0.25)" : 
                      "rgba(139, 92, 246, 0.25)";
    const borderGlow = model.name === "React" ? "border-cyan-500/30 hover:border-cyan-400" : 
                       model.name === "Python" ? "border-amber-500/30 hover:border-amber-400" :
                       model.name === "Node.js" ? "border-green-500/30 hover:border-green-400" : 
                       "border-purple-500/30 hover:border-purple-400";
    const textGlow = model.name === "React" ? "text-cyan-400 text-shadow-[0_0_15px_rgba(34,211,238,0.6)]" : 
                     model.name === "Python" ? "text-amber-400 text-shadow-[0_0_15px_rgba(251,191,36,0.6)]" :
                     model.name === "Node.js" ? "text-green-400 text-shadow-[0_0_15px_rgba(74,222,128,0.6)]" : 
                     "text-purple-400 text-shadow-[0_0_15px_rgba(139,92,246,0.6)]";
    
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div 
          className={`size-24 rounded-full border ${borderGlow} flex items-center justify-center transition-all duration-500 transform group-hover:scale-110`}
          style={{ 
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            boxShadow: `0 0 35px -5px ${glowColor}`
          }}
        >
          <span className={`text-2xl font-bold tracking-wider ${textGlow}`}>{initials}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      {isVisible ? (
        <Canvas>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
          />
          <Environment preset="city" />

          <Suspense fallback={<ModelLoader />}>
            <Model3D model={model} />
          </Suspense>

          <OrbitControls enableZoom={false} />
        </Canvas>
      ) : (
        <div className="w-full h-full bg-gray-800/30 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-500 text-xs">Loading...</div>
        </div>
      )}
    </div>
  );
};

// Preload only critical models
useGLTF.preload("/models/react_logo-transformed.glb");

export default TechIconCardExperience;
