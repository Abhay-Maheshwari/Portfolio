import * as THREE from 'three';

/**
 * Creates and adds lighting to the scene
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function createLighting(scene) {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    
    // Key light (main) - neutral white - shifted to create better separation
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);
    
    // Fill light (subtle purple tint)
    const fillLight = new THREE.DirectionalLight(0x9d8df1, 0.3);
    fillLight.position.set(-5, 4, 4);
    scene.add(fillLight);
    
    // Rim light (back) - increased intensity for better silhouette
    const rimLight = new THREE.DirectionalLight(0xfff5e1, 0.8);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);
    
    // Screen light (simulates screen glow on laptop) - softer
    const screenLight = new THREE.PointLight(0x8b7dd8, 0.6, 4);
    screenLight.position.set(0, 1, 0);
    scene.add(screenLight);
}

