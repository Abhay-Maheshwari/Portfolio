import { CONFIG } from './config/index.js';
import { mousePosition, laptopRotation, getIsDragging } from './controls/events.js';

// Target positions for smooth interpolation
const targetCameraPosition = { x: 0, y: 0 };

/**
 * Creates the animation loop
 * @param {Object} params - Animation parameters
 * @param {THREE.Clock} params.clock - Three.js clock
 * @param {THREE.Camera} params.camera - The camera
 * @param {THREE.Mesh} params.grid - The grid mesh
 * @param {THREE.Points} params.particles - The particles
 * @param {THREE.Group} params.laptop - The laptop group
 * @param {EffectComposer} params.composer - The effect composer
 * @returns {Function} The animation function
 */
export function createAnimationLoop({ clock, camera, grid, particles, laptop, composer }) {
    function animate() {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        
        // Camera parallax (subtle)
        targetCameraPosition.x = mousePosition.x * CONFIG.parallax.intensity;
        targetCameraPosition.y = mousePosition.y * CONFIG.parallax.intensity * 0.5 + CONFIG.camera.position.y;
        
        camera.position.x += (targetCameraPosition.x - camera.position.x) * CONFIG.parallax.smoothing;
        camera.position.y += (targetCameraPosition.y - camera.position.y) * CONFIG.parallax.smoothing;
        camera.lookAt(0, 0, 0);
        
        // Animate Grid and Particles
        if (grid) {
            grid.position.z = (time * 0.5) % 1.5; // Infinite scrolling grid
            grid.rotation.z = Math.sin(time * 0.1) * 0.02;
        }
        
        if (particles) {
            particles.rotation.y = time * 0.03;
            particles.rotation.x = Math.sin(time * 0.05) * 0.02;
        }
        
        // Laptop follows mouse cursor or drag
        if (laptop) {
            if (getIsDragging()) {
                // When dragging, use stored rotation
                laptop.rotation.x = laptopRotation.x;
                laptop.rotation.y = laptopRotation.y;
            } else {
                // When not dragging, follow mouse with hover effect
                const hoverRotationY = mousePosition.x * 0.15;
                const hoverRotationX = -mousePosition.y * 0.1;
                
                // Blend between current rotation and hover target
                laptopRotation.y += (hoverRotationY - laptopRotation.y) * 0.03;
                laptopRotation.x += (0.1 + hoverRotationX - laptopRotation.x) * 0.03;
                
                laptop.rotation.x = laptopRotation.x;
                laptop.rotation.y = laptopRotation.y;
            }
        }
        
        // Render
        composer.render();
    }
    
    return animate;
}

