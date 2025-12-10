import * as THREE from 'three';

/**
 * Creates the trackpad with glass effect
 * @param {THREE.Group} laptopGroup - The laptop group to add trackpad to
 */
export function createTrackpad(laptopGroup) {
    // Darker trackpad to match the chassis
    const trackpadMaterial = new THREE.MeshStandardMaterial({
        color: 0x1c1c1e, // Matches keyboard keys
        roughness: 0.45, // Matches keyboard keys
        metalness: 0.2,  // Matches keyboard keys
        envMapIntensity: 0.5
    });
    
    // Visible border/frame
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x151515,
        roughness: 0.4,
        metalness: 0.6
    });
    
    // Main trackpad surface (glass-like) - centered below keyboard
    const trackpadGeometry = new THREE.BoxGeometry(1.5, 0.015, 0.75);
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, -0.434, 0.82);
    
    // Visible border around trackpad
    const borderGeometry = new THREE.BoxGeometry(1.56, 0.013, 0.81);
    const border = new THREE.Mesh(borderGeometry, frameMaterial);
    border.position.set(0, -0.437, 0.82);
    
    laptopGroup.add(border);
    laptopGroup.add(trackpad);
}

