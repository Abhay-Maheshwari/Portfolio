import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { VignetteShader } from './shaders/vignette.js';
import { CONFIG } from './config/index.js';

/**
 * Sets up post-processing effects
 * @param {THREE.WebGLRenderer} renderer - The Three.js renderer
 * @param {THREE.Scene} scene - The scene
 * @param {THREE.Camera} camera - The camera
 * @returns {EffectComposer} The effect composer
 */
export function setupPostProcessing(renderer, scene, camera) {
    const composer = new EffectComposer(renderer);
    
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        CONFIG.bloom.strength,
        CONFIG.bloom.radius,
        CONFIG.bloom.threshold
    );
    composer.addPass(bloomPass);
    
    const vignettePass = new ShaderPass(VignetteShader);
    composer.addPass(vignettePass);
    
    return composer;
}

