/**
 * Input and event handling for the 3D scene
 */

// State
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
export const mousePosition = { x: 0, y: 0 };
export const laptopRotation = { x: 0.1, y: 0 };

/**
 * Sets up all event listeners
 * @param {Object} handlers - Event handler callbacks
 * @param {Function} handlers.onResize - Window resize handler
 */
export function setupEventListeners(handlers) {
    // Mouse events
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Touch events
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    
    window.addEventListener('resize', handlers.onResize);
    
    const ctaBtn = document.getElementById('exploreBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            console.log('Explore clicked');
        });
    }
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseUp() {
    isDragging = false;
}

function onMouseMove(event) {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        // Update laptop rotation based on drag
        laptopRotation.y += deltaMove.x * 0.005;
        laptopRotation.x -= deltaMove.y * 0.005;
        
        // Clamp rotation to prevent extreme angles
        laptopRotation.x = Math.max(-0.5, Math.min(0.5, laptopRotation.x));
        
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
}

function onTouchStart(event) {
    if (event.touches.length > 0) {
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
}

function onTouchEnd() {
    isDragging = false;
}

function onTouchMove(event) {
    if (event.touches.length > 0) {
        mousePosition.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        
        if (isDragging) {
            const deltaMove = {
                x: event.touches[0].clientX - previousMousePosition.x,
                y: event.touches[0].clientY - previousMousePosition.y
            };
            
            laptopRotation.y += deltaMove.x * 0.005;
            laptopRotation.x -= deltaMove.y * 0.005;
            
            laptopRotation.x = Math.max(-0.5, Math.min(0.5, laptopRotation.x));
            
            previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }
}

/**
 * Checks if currently dragging
 * @returns {boolean}
 */
export function getIsDragging() {
    return isDragging;
}

