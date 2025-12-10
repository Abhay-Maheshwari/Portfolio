import * as THREE from 'three';

/**
 * Creates the logo on the back of the screen
 * @param {THREE.Group} screenGroup - The screen group to add logo to
 */
export function createLogo(screenGroup) {
    // Load logo texture
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/images/logo-placeholder.png');

    // Configure texture
    logoTexture.minFilter = THREE.LinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;
    logoTexture.flipY = false;

    // Logo plane on back of screen - perfectly sized
    const logoGeometry = new THREE.PlaneGeometry(3.4, 1.95);
    const logoMaterial = new THREE.MeshBasicMaterial({
        map: logoTexture,
        transparent: true,
        opacity: 1,
        toneMapped: false
    });

    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0, -0.065); // Back of screen - slightly offset to prevent Z-fighting
    logo.rotation.y = Math.PI; // Flip to face backward
    logo.scale.x = 1; // Fix mirroring of text
    logo.renderOrder = 0;

    screenGroup.add(logo);
}

/**
 * Creates the screen display content
 * @param {THREE.Group} screenGroup - The screen group to add content to
 */
export function createScreenContent(screenGroup) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // 1. Very Dark Base - Dimmed so overlay text pops
    const gradient = ctx.createLinearGradient(0, 0, 0, 768);
    gradient.addColorStop(0, '#0a0a12'); // Almost black
    gradient.addColorStop(0.4, '#0f0f1a'); // Very dark indigo
    gradient.addColorStop(1, '#12081a'); // Very dark purple
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 768);

    // 2. Subtle ambient glow (very muted - 30% of original)
    ctx.globalCompositeOperation = 'screen';

    // Purple glow top right (dimmed)
    const grad1 = ctx.createRadialGradient(900, 100, 0, 900, 100, 450);
    grad1.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
    grad1.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
    grad1.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, 1024, 768);

    // Cyan glow bottom left (dimmed)
    const grad2 = ctx.createRadialGradient(120, 680, 0, 120, 680, 420);
    grad2.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
    grad2.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)');
    grad2.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, 1024, 768);

    ctx.globalCompositeOperation = 'source-over';

    // 3. Very subtle grid overlay
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x <= 1024; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 768); ctx.stroke();
    }
    for (let y = 0; y <= 768; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    }

    // 4. Very subtle abstract elements (dimmed to ~30%)
    const centerX = 1024 / 2;
    const centerY = 768 / 2;

    // Floating code lines (very faint - just texture)
    const codeLines = [
        { y: 180, widths: [120, 80, 200, 60] },
        { y: 220, widths: [60, 150, 100, 40, 80] },
        { y: 260, widths: [200, 40, 120] },
        { y: 300, widths: [80, 60, 180, 100] },
        { y: 340, widths: [40, 220, 60] },
        { y: 380, widths: [160, 80, 40, 120] },
        { y: 420, widths: [100, 40, 200] },
        { y: 460, widths: [60, 180, 80, 40] },
        { y: 500, widths: [140, 60, 100, 80] },
        { y: 540, widths: [80, 120, 60, 140] },
    ];

    codeLines.forEach(line => {
        let x = 150;
        line.widths.forEach((width, i) => {
            const colors = ['#a78bfa', '#22d3ee', '#4ade80', '#f472b6', '#fbbf24'];
            ctx.fillStyle = colors[i % colors.length];
            ctx.globalAlpha = 0.04 + (Math.random() * 0.04); // Very dim: 4-8%

            const radius = 4;
            const h = 16;
            ctx.beginPath();
            ctx.roundRect(x, line.y, width, h, radius);
            ctx.fill();

            x += width + 20;
        });
    });

    ctx.globalAlpha = 1;

    // Very subtle central glow
    const orbGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
    orbGrad.addColorStop(0, 'rgba(139, 92, 246, 0.12)');
    orbGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
    orbGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
    ctx.fill();

    // Faint decorative brackets
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Left bracket
    ctx.beginPath();
    ctx.moveTo(centerX - 180, centerY - 80);
    ctx.lineTo(centerX - 200, centerY);
    ctx.lineTo(centerX - 180, centerY + 80);
    ctx.stroke();

    // Right bracket  
    ctx.beginPath();
    ctx.moveTo(centerX + 180, centerY - 80);
    ctx.lineTo(centerX + 200, centerY);
    ctx.lineTo(centerX + 180, centerY + 80);
    ctx.stroke();

    // Barely visible AM monogram
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.font = 'bold 48px "Segoe UI", system-ui, sans-serif';
    ctx.fillText('AM', centerX, centerY);

    ctx.shadowBlur = 0;

    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16; // Sharpness

    // Display Mesh - optimized for 16:10 screen
    const displayGeometry = new THREE.PlaneGeometry(3.6, 2.25);
    const displayMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
        side: THREE.FrontSide,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    });

    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.04;
    display.renderOrder = 2;
    screenGroup.add(display);

    // Screen Glow (Refined)
    const glowGeometry = new THREE.PlaneGeometry(3.65, 2.3);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x5b21b6, // Deep purple glow
        transparent: true,
        opacity: 0.1,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = 0.035;
    glow.renderOrder = 1;
    screenGroup.add(glow);
}
