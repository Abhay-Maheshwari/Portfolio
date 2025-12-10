import * as THREE from 'three';
import { CONFIG } from './config.js';
import { createLighting } from './lighting.js';
import { createEnvironment } from './environment.js';
import { createLaptop } from './laptop/index.js';
import { setupPostProcessing } from './postprocessing.js';
import { setupEventListeners, cleanupEventListeners } from './events.js';
import { createAnimationLoop } from './animation.js';

/**
 * Creates and manages the 3D scene
 */
export class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.laptop = null;
        this.grid = null;
        this.particles = null;
        this.clock = null;
        this.animationController = null;
        this.resizeHandler = null;
    }

    init() {
        this.clock = new THREE.Clock();

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505); // Deep black

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            window.innerWidth / window.innerHeight,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        this.camera.position.set(
            CONFIG.camera.position.x,
            CONFIG.camera.position.y,
            CONFIG.camera.position.z
        );

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;

        // Create scene elements
        createLighting(this.scene);
        const environment = createEnvironment(this.scene);
        this.grid = environment.grid;
        this.particles = environment.particles;
        this.laptop = createLaptop(this.scene);

        // Center and lower the laptop for better spacing
        if (this.laptop) {
            this.laptop.position.y = -0.6;
        }

        // Post-processing
        this.composer = setupPostProcessing(this.renderer, this.scene, this.camera);

        // Events
        this.resizeHandler = this.onWindowResize.bind(this);
        setupEventListeners({ onResize: this.resizeHandler });

        // Apply responsive sizing on initial load
        this.onWindowResize();

        // Start animation
        this.animationController = createAnimationLoop({
            clock: this.clock,
            camera: this.camera,
            grid: this.grid,
            particles: this.particles,
            laptop: this.laptop,
            composer: this.composer
        });
        this.animationController.start();

        return this;
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);

        // Adjust camera distance and laptop scale based on screen size
        if (width < 480) {
            // Small mobile - scale down laptop and move camera back
            this.camera.position.z = 10;
            if (this.laptop) {
                const scale = 0.7;
                this.laptop.scale.set(scale, scale, scale);
            }
        } else if (width < 768) {
            // Mobile / large phone
            this.camera.position.z = 9;
            if (this.laptop) {
                const scale = 0.85;
                this.laptop.scale.set(scale, scale, scale);
            }
        } else if (width < 1024) {
            // Tablet
            this.camera.position.z = 7.5;
            if (this.laptop) {
                this.laptop.scale.set(1, 1, 1);
            }
        } else {
            // Desktop
            this.camera.position.z = 6.5;
            if (this.laptop) {
                this.laptop.scale.set(1, 1, 1);
            }
        }
    }

    dispose() {
        // Stop animation
        if (this.animationController) {
            this.animationController.stop();
        }

        // Clean up event listeners
        if (this.resizeHandler) {
            cleanupEventListeners({ onResize: this.resizeHandler });
        }

        // Dispose of Three.js resources
        if (this.scene) {
            this.scene.traverse((object) => {
                if (object.geometry) {
                    object.geometry.dispose();
                }
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        if (this.composer) {
            this.composer.dispose();
        }
    }
}
