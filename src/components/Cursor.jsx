import { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const innerRef = useRef(null);
    const isHovering = useRef(false);
    const isTextHover = useRef(false);
    const isClicking = useRef(false);
    const isHidden = useRef(true);
    const magnetTarget = useRef(null);
    const mousePos = useRef({ x: -100, y: -100 });
    const cursorPos = useRef({ x: -100, y: -100 });
    const rafId = useRef(null);
    const hasMovedOnce = useRef(false);

    // Lerp function for smooth interpolation
    const lerp = (start, end, factor) => start + (end - start) * factor;

    useEffect(() => {
        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner) return;

        const SMOOTH_FACTOR = 0.35; // Higher = more responsive

        const animate = () => {
            // Calculate target position (with magnetic effect if applicable)
            let targetX = mousePos.current.x;
            let targetY = mousePos.current.y;

            // Magnetic effect
            if (magnetTarget.current && isHovering.current) {
                const rect = magnetTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distX = targetX - centerX;
                const distY = targetY - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                const maxDistance = 60;
                if (distance < maxDistance) {
                    const pull = (1 - distance / maxDistance) * 0.4;
                    targetX = targetX - distX * pull;
                    targetY = targetY - distY * pull;
                }
            }

            // Smooth interpolation with snap-to-target when very close
            const dx = targetX - cursorPos.current.x;
            const dy = targetY - cursorPos.current.y;
            const distanceToTarget = Math.sqrt(dx * dx + dy * dy);

            if (distanceToTarget < 0.5) {
                // Snap to target when very close
                cursorPos.current.x = targetX;
                cursorPos.current.y = targetY;
            } else {
                // Smooth interpolation
                cursorPos.current.x = lerp(cursorPos.current.x, targetX, SMOOTH_FACTOR);
                cursorPos.current.y = lerp(cursorPos.current.y, targetY, SMOOTH_FACTOR);
            }

            // Apply position
            cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;

            // Scale states
            let scale = 1;
            if (isClicking.current) {
                scale = 0.7;
            } else if (isHovering.current) {
                scale = 2.5;
            } else if (isTextHover.current) {
                scale = 1.6;
            }

            inner.style.transform = `translate(-50%, -50%) scale(${scale})`;
            cursor.style.opacity = isHidden.current ? '0' : '1';

            // Interaction States
            if (isHovering.current) {
                inner.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                inner.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            } else if (isTextHover.current) {
                inner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                inner.style.borderColor = 'transparent';
                inner.style.mixBlendMode = 'difference';
            } else {
                inner.style.backgroundColor = '#fff';
                inner.style.borderColor = 'transparent';
                inner.style.mixBlendMode = 'difference';
            }

            // Continue animation loop
            rafId.current = requestAnimationFrame(animate);
        };

        const onMouseMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;

            // Show cursor and start animation on first mouse move
            if (!hasMovedOnce.current) {
                hasMovedOnce.current = true;
                isHidden.current = false;
                // Initialize cursor position to mouse position on first move
                cursorPos.current.x = e.clientX;
                cursorPos.current.y = e.clientY;
            }
        };

        const onMouseOver = (e) => {
            const target = e.target;
            const clickable = target.closest('a, button, [role="button"], .cursor-pointer, input[type="submit"], .magnetic');
            const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'BLOCKQUOTE', 'TD', 'TH', 'LABEL', 'STRONG', 'EM', 'B', 'I'];
            const isTextTag = textTags.includes(target.tagName) || target.closest(textTags.join(','));

            isHovering.current = !!clickable;
            isTextHover.current = !clickable && !!isTextTag;
            magnetTarget.current = clickable || null;
        };

        const onMouseDown = () => { isClicking.current = true; };
        const onMouseUp = () => { isClicking.current = false; };
        const onMouseLeave = () => { isHidden.current = true; };
        const onMouseEnter = () => { isHidden.current = false; };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { passive: true });
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);

        // Start the animation loop
        rafId.current = requestAnimationFrame(animate);

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseenter', onMouseEnter);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[10001]"
            style={{
                willChange: 'transform',
                transition: 'opacity 0.15s ease'
            }}
        >
            <div
                ref={innerRef}
                style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '1px solid transparent',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease',
                    willChange: 'transform, background-color',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'translate(-50%, -50%) scale(1)'
                }}
            />
        </div>
    );
};

export default Cursor;

