import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BackgroundDust = () => {
    const pointsRef = useRef();
    const count = 3000;
    const mousePosition = useRef({ x: 0, y: 0 });
    const targetPosition = useRef({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            targetPosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetPosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const [positions, scales] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Distribute widely across the scene
            positions[i * 3 + 0] = (Math.random() - 0.5) * 40; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z (slightly pushed back)

            scales[i] = Math.random();
        }

        return [positions, scales];
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.elapsedTime;
        
        // Smoothly interpolate mouse position
        mousePosition.current.x = THREE.MathUtils.lerp(mousePosition.current.x, targetPosition.current.x, 0.05);
        mousePosition.current.y = THREE.MathUtils.lerp(mousePosition.current.y, targetPosition.current.y, 0.05);

        // Apply time-based rotation PLUS mouse-based parallax offset
        pointsRef.current.rotation.y = (time * 0.05) + (mousePosition.current.x * 0.8);
        pointsRef.current.rotation.x = (time * 0.02) + (-mousePosition.current.y * 0.8);
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={count}
                    array={scales}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#ffffff"
                transparent
                opacity={0.3}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                sizeAttenuation={true}
            />
        </points>
    );
};

export default BackgroundDust;
