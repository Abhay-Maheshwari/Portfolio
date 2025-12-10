import * as THREE from 'three';

/**
 * Creates the keyboard with backlit keys
 * @param {THREE.Group} laptopGroup - The laptop group to add keyboard to
 */
export function createKeyboard(laptopGroup) {
    // Premium matte black keys with subtle emissive glow
    const keyMaterial = new THREE.MeshStandardMaterial({
        color: 0x050505,
        roughness: 0.5,
        metalness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.05
    });

    // Key dimensions - properly fitted to deck (3.88 width × 2.48 depth)
    const keyWidth = 0.16;
    const keyHeight = 0.015;
    const keyDepth = 0.18;
    const keyGap = 0.018;
    const keySpacing = keyWidth + keyGap;

    // Rounded key shape function
    const createKeyGeometry = (widthScale = 1, depthScale = 1) => {
        const width = keyWidth * widthScale - 0.01;
        const depth = keyDepth * depthScale - 0.01;
        return new THREE.BoxGeometry(width, keyHeight, depth, 2, 2, 2);
    };

    // Function to add soft backlight glow under each key
    const addKeyBacklight = (x, y, z, widthScale = 1, depthScale = 1) => {
        const glowGeometry = new THREE.PlaneGeometry(
            keyWidth * widthScale * 1.15,
            keyDepth * depthScale * 1.15
        );
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.rotation.x = -Math.PI / 2;
        glow.position.set(x, y - 0.008, z);
        laptopGroup.add(glow);
    };

    // Starting position - centered on deck
    const startX = -1.7;
    const startZ = -0.95;
    const baseY = -0.432;

    // Row 1: Numbers (13 regular + 1 wide backspace)
    let xOffset = startX;

    for (let i = 0; i < 13; i++) {
        const keyX = xOffset + keyWidth / 2;
        const key = new THREE.Mesh(createKeyGeometry(), keyMaterial);
        key.position.set(keyX, baseY, startZ);
        laptopGroup.add(key);
        addKeyBacklight(keyX, baseY, startZ, 1, 1);
        xOffset += keyWidth + keyGap;
    }
    // Backspace (wider)
    const backspaceX = xOffset + (keyWidth * 1.4) / 2;
    const backspace = new THREE.Mesh(createKeyGeometry(1.4), keyMaterial);
    backspace.position.set(backspaceX, baseY, startZ);
    laptopGroup.add(backspace);
    addKeyBacklight(backspaceX, baseY, startZ, 1.4, 1);

    // Row 2: Tab + QWERTY row
    xOffset = startX;
    const tabX = xOffset + (keyWidth * 1.4) / 2;
    const tab = new THREE.Mesh(createKeyGeometry(1.4), keyMaterial);
    tab.position.set(tabX, baseY, startZ + keySpacing);
    laptopGroup.add(tab);
    addKeyBacklight(tabX, baseY, startZ + keySpacing, 1.4, 1);
    xOffset += keyWidth * 1.4 + keyGap;

    for (let i = 0; i < 12; i++) {
        const keyX = xOffset + keyWidth / 2;
        const key = new THREE.Mesh(createKeyGeometry(), keyMaterial);
        key.position.set(keyX, baseY, startZ + keySpacing);
        laptopGroup.add(key);
        addKeyBacklight(keyX, baseY, startZ + keySpacing, 1, 1);
        xOffset += keyWidth + keyGap;
    }

    const backslash = new THREE.Mesh(createKeyGeometry(1.4), keyMaterial);
    backslash.position.set(xOffset + (keyWidth * 1.4) / 2, baseY, startZ + keySpacing);
    laptopGroup.add(backslash);

    // Row 3: Caps + ASDFGH row + Enter
    xOffset = startX;
    const caps = new THREE.Mesh(createKeyGeometry(1.6), keyMaterial);
    caps.position.set(xOffset + (keyWidth * 1.6) / 2, baseY, startZ + keySpacing * 2);
    laptopGroup.add(caps);
    xOffset += keyWidth * 1.6 + keyGap;

    for (let i = 0; i < 11; i++) {
        const key = new THREE.Mesh(createKeyGeometry(), keyMaterial);
        key.position.set(xOffset + keyWidth / 2, baseY, startZ + keySpacing * 2);
        laptopGroup.add(key);
        xOffset += keyWidth + keyGap;
    }

    const enter = new THREE.Mesh(createKeyGeometry(1.8), keyMaterial);
    enter.position.set(xOffset + (keyWidth * 1.8) / 2, baseY, startZ + keySpacing * 2);
    laptopGroup.add(enter);

    // Row 4: Shift + ZXCVB row + Shift
    xOffset = startX;
    const leftShift = new THREE.Mesh(createKeyGeometry(2.0), keyMaterial);
    leftShift.position.set(xOffset + (keyWidth * 2.0) / 2, baseY, startZ + keySpacing * 3);
    laptopGroup.add(leftShift);
    xOffset += keyWidth * 2.0 + keyGap;

    for (let i = 0; i < 10; i++) {
        const key = new THREE.Mesh(createKeyGeometry(), keyMaterial);
        key.position.set(xOffset + keyWidth / 2, baseY, startZ + keySpacing * 3);
        laptopGroup.add(key);
        xOffset += keyWidth + keyGap;
    }

    const rightShift = new THREE.Mesh(createKeyGeometry(2.4), keyMaterial);
    rightShift.position.set(xOffset + (keyWidth * 2.4) / 2, baseY, startZ + keySpacing * 3);
    laptopGroup.add(rightShift);

    // Row 5: Bottom modifiers + Space + Arrows
    xOffset = startX;
    const modifiers = [1.0, 1.0, 1.0, 1.0]; // Fn, Ctrl, Alt, Cmd
    modifiers.forEach(size => {
        const key = new THREE.Mesh(createKeyGeometry(size), keyMaterial);
        key.position.set(xOffset + (keyWidth * size) / 2, baseY, startZ + keySpacing * 4);
        laptopGroup.add(key);
        xOffset += keyWidth * size + keyGap;
    });

    // Space bar
    const space = new THREE.Mesh(createKeyGeometry(5.6), keyMaterial);
    space.position.set(xOffset + (keyWidth * 5.6) / 2, baseY, startZ + keySpacing * 4);
    laptopGroup.add(space);
    xOffset += keyWidth * 5.6 + keyGap;

    // Right modifiers
    [1.0, 1.0].forEach(size => {
        const key = new THREE.Mesh(createKeyGeometry(size), keyMaterial);
        key.position.set(xOffset + (keyWidth * size) / 2, baseY, startZ + keySpacing * 4);
        laptopGroup.add(key);
        xOffset += keyWidth * size + keyGap;
    });

    // Arrow keys (smaller)
    [0.8, 0.8, 0.8].forEach(size => {
        const key = new THREE.Mesh(createKeyGeometry(size), keyMaterial);
        key.position.set(xOffset + (keyWidth * size) / 2, baseY, startZ + keySpacing * 4);
        laptopGroup.add(key);
        xOffset += keyWidth * size + keyGap;
    });

    // Create numpad
    createNumpad(laptopGroup, keyMaterial, createKeyGeometry, startZ, keySpacing, keyWidth, keyGap, baseY);

    // Create keyboard backlight
    createKeyboardBacklight(laptopGroup, startZ, keySpacing, baseY);
}

/**
 * Creates the numpad section
 */
function createNumpad(laptopGroup, keyMaterial, createKeyGeometry, startZ, keySpacing, keyWidth, keyGap, baseY) {
    const numpadStartX = 1.05;
    const numpadStartZ = startZ + keySpacing * 0.2;
    const numpadKeySize = 0.85;
    const numpadGap = keyGap * 0.8;

    // Numpad Row 1: Num Lock, /, *, -
    let numpadX = numpadStartX;
    for (let i = 0; i < 4; i++) {
        const key = new THREE.Mesh(createKeyGeometry(numpadKeySize), keyMaterial);
        key.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ);
        laptopGroup.add(key);
        numpadX += keyWidth * numpadKeySize + numpadGap;
    }

    // Numpad Row 2: 7, 8, 9, +
    numpadX = numpadStartX;
    for (let i = 0; i < 3; i++) {
        const key = new THREE.Mesh(createKeyGeometry(numpadKeySize), keyMaterial);
        key.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing);
        laptopGroup.add(key);
        numpadX += keyWidth * numpadKeySize + numpadGap;
    }
    // + key (tall)
    const plusKey = new THREE.Mesh(createKeyGeometry(numpadKeySize, 1.95), keyMaterial);
    plusKey.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing * 1.475);
    laptopGroup.add(plusKey);

    // Numpad Row 3: 4, 5, 6
    numpadX = numpadStartX;
    for (let i = 0; i < 3; i++) {
        const key = new THREE.Mesh(createKeyGeometry(numpadKeySize), keyMaterial);
        key.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing * 2);
        laptopGroup.add(key);
        numpadX += keyWidth * numpadKeySize + numpadGap;
    }

    // Numpad Row 4: 1, 2, 3, Enter
    numpadX = numpadStartX;
    for (let i = 0; i < 3; i++) {
        const key = new THREE.Mesh(createKeyGeometry(numpadKeySize), keyMaterial);
        key.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing * 3);
        laptopGroup.add(key);
        numpadX += keyWidth * numpadKeySize + numpadGap;
    }
    // Enter key (tall)
    const numpadEnter = new THREE.Mesh(createKeyGeometry(numpadKeySize, 1.95), keyMaterial);
    numpadEnter.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing * 3.475);
    laptopGroup.add(numpadEnter);

    // Numpad Row 5: 0 (wide), .
    numpadX = numpadStartX;
    const zeroKey = new THREE.Mesh(createKeyGeometry(1.8, numpadKeySize), keyMaterial);
    zeroKey.position.set(numpadX + (keyWidth * 1.8) / 2, baseY, numpadStartZ + keySpacing * 4);
    laptopGroup.add(zeroKey);
    numpadX += keyWidth * 1.8 + numpadGap;

    const dotKey = new THREE.Mesh(createKeyGeometry(numpadKeySize), keyMaterial);
    dotKey.position.set(numpadX + (keyWidth * numpadKeySize) / 2, baseY, numpadStartZ + keySpacing * 4);
    laptopGroup.add(dotKey);
}

/**
 * Creates the keyboard backlight glow effect
 */
function createKeyboardBacklight(laptopGroup, startZ, keySpacing, baseY) {
    const backlightCanvas = document.createElement('canvas');
    backlightCanvas.width = 1024;
    backlightCanvas.height = 512;
    const ctx = backlightCanvas.getContext('2d');

    // Clear background
    ctx.clearRect(0, 0, 1024, 512);

    // Create uniform soft white glow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(0, 0, 1024, 512);

    // Add slight vignette from edges
    const vignetteGrad = ctx.createRadialGradient(512, 256, 200, 512, 256, 512);
    vignetteGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    vignetteGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.04)');
    vignetteGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = vignetteGrad;
    ctx.fillRect(0, 0, 1024, 512);

    const backlightTexture = new THREE.CanvasTexture(backlightCanvas);
    const backlightGeometry = new THREE.PlaneGeometry(3.5, 1.7);
    const backlightMaterial = new THREE.MeshBasicMaterial({
        map: backlightTexture,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
    });

    const backlight = new THREE.Mesh(backlightGeometry, backlightMaterial);
    backlight.rotation.x = -Math.PI / 2;
    backlight.position.set(0.05, baseY - 0.001, startZ + keySpacing * 2.5);
    laptopGroup.add(backlight);
}
