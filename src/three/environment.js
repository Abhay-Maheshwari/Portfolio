import * as THREE from 'three';

/**
 * Creates the environment (grid floor and ambient particles)
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {{ grid: THREE.Mesh, particles: THREE.Points }}
 */
export function createEnvironment(scene) {
    // 1. Dynamic Floor Grid
    const gridGeometry = new THREE.PlaneGeometry(60, 60, 40, 40);
    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x2a2a2a,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2;
    scene.add(grid);

    // 3. Ambient Particles (Starfield)
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1500; // More stars
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        // Spread stars wider
        positions[i * 3] = (Math.random() - 0.5) * 100;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;  // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10; // z

        scales[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05, // Smaller crisp stars
        transparent: true,
        opacity: 0.8, // Brighter
        sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 4. Subtle Nebula Gradient (Mesh behind laptop)
    const nebulaGeometry = new THREE.PlaneGeometry(50, 30);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: 0x1e1b4b, // Deep Indigo
        transparent: true,
        opacity: 0.15, // Very subtle
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebula.position.set(0, 2, -10);
    scene.add(nebula);

    // No Fog - Clear view
    scene.fog = null;

    return { grid, particles };
}
