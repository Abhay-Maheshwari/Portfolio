/**
 * Portfolio 3D Scene - Main Entry Point
 * A Three.js portfolio featuring an interactive 3D laptop model
 */

import * as THREE from 'three';
import { CONFIG } from './config/index.js';
import { createLighting } from './scene/lighting.js';
import { createEnvironment } from './scene/environment.js';
import { createLaptop } from './laptop/index.js';
import { setupPostProcessing } from './postprocessing.js';
import { setupEventListeners } from './controls/events.js';
import { createAnimationLoop } from './animation.js';

// Scene elements
let scene, camera, renderer, composer;
let laptop, grid, particles;
let clock;

/**
 * Initialize the 3D scene
 */
function init() {
    clock = new THREE.Clock();

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505); // Deep black
    // Fog removed for clear starfield

    // Camera
    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.set(
        CONFIG.camera.position.x,
        CONFIG.camera.position.y,
        CONFIG.camera.position.z
    );

    // Renderer
    const canvas = document.getElementById('three-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Create scene elements
    createLighting(scene);
    const environment = createEnvironment(scene);
    grid = environment.grid;
    particles = environment.particles;
    laptop = createLaptop(scene);

    // Center and lower the laptop for better spacing
    if (laptop) {
        laptop.position.y = -0.6;
    }

    // Post-processing
    composer = setupPostProcessing(renderer, scene, camera);

    // Events
    setupEventListeners({ onResize: onWindowResize });

    // Apply responsive sizing on initial load
    onWindowResize();

    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1000);

    // Start animation
    const animate = createAnimationLoop({
        clock,
        camera,
        grid,
        particles,
        laptop,
        composer
    });
    animate();
}

/**
 * Handle window resize
 */
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);

    // Adjust camera distance and laptop scale based on screen size
    if (width < 480) {
        // Small mobile - scale down laptop and move camera back
        camera.position.z = 10;
        if (laptop) {
            const scale = 0.7;
            laptop.scale.set(scale, scale, scale);
        }
    } else if (width < 768) {
        // Mobile / large phone
        camera.position.z = 9;
        if (laptop) {
            const scale = 0.85;
            laptop.scale.set(scale, scale, scale);
        }
    } else if (width < 1024) {
        // Tablet
        camera.position.z = 7.5;
        if (laptop) {
            laptop.scale.set(1, 1, 1);
        }
    } else {
        // Desktop
        camera.position.z = 6.5;
        if (laptop) {
            laptop.scale.set(1, 1, 1);
        }
    }
}

// Initialize on DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

