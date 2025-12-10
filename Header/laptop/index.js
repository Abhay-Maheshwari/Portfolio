import * as THREE from 'three';
import { createKeyboard } from './keyboard.js';
import { createTrackpad } from './trackpad.js';
import { createLogo, createScreenContent } from './screen.js';

/**
 * Creates the complete laptop model
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Group} The laptop group
 */
export function createLaptop(scene) {
    const laptop = new THREE.Group();
    
    // Materials - Premium aluminum finish (Darker, more contrast)
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a, // Darker Grey (Space Grey)
        roughness: 0.3,
        metalness: 0.8, // More metallic
        envMapIntensity: 1.5
    });
    
    const screenBezelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111, // Almost black
        roughness: 0.2,
        metalness: 0.5
    });
    
    // Base (bottom chassis)
    const baseGeometry = new THREE.BoxGeometry(4.0, 0.06, 2.6);
    const base = new THREE.Mesh(baseGeometry, bodyMaterial);
    base.position.set(0, -0.48, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    
    // Keyboard deck (top surface) - Slightly lighter than body for separation
    const deckGeometry = new THREE.BoxGeometry(3.88, 0.025, 2.48);
    const deck = new THREE.Mesh(deckGeometry, new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        roughness: 0.4,
        metalness: 0.6
    }));
    deck.position.set(0, -0.44, 0);
    deck.receiveShadow = true;
    
    // Create keyboard and trackpad
    createKeyboard(laptop);
    createTrackpad(laptop);
    
    // Hinge
    const hingeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 3.8, 16);
    const hinge = new THREE.Mesh(hingeGeometry, bodyMaterial);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, -0.42, -1.28);
    laptop.add(hinge);
    
    // Screen group
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.85, -1.3);
    screenGroup.rotation.x = -0.18; // Optimal viewing angle
    
    // Screen frame (outer bezel)
    const frameGeometry = new THREE.BoxGeometry(3.9, 2.44, 0.06);
    const frame = new THREE.Mesh(frameGeometry, screenBezelMaterial);
    frame.position.z = -0.03;
    frame.castShadow = true;
    
    // Inner bezel
    const innerBezelGeometry = new THREE.BoxGeometry(3.82, 2.36, 0.04);
    const innerBezel = new THREE.Mesh(innerBezelGeometry, new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 0.2,
        metalness: 0.8
    }));
    innerBezel.position.z = 0.01;
    
    // Logo on back of screen
    createLogo(screenGroup);
    
    // Create artistic screen display
    createScreenContent(screenGroup);
    
    screenGroup.add(frame);
    screenGroup.add(innerBezel);
    
    // Assemble laptop
    laptop.add(base);
    laptop.add(deck);
    laptop.add(screenGroup);
    
    scene.add(laptop);
    
    return laptop;
}
