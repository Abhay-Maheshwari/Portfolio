import { useEffect, useRef } from 'react';

const Cursor = () => {
    const cursorRef = useRef(null);
    const innerRef = useRef(null);
    const isHovering = useRef(false);
    const isTextHover = useRef(false);
    const isClicking = useRef(false);
    const isHidden = useRef(false);
    const magnetTarget = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner) return;

        const updateCursor = () => {
            let x = mousePos.current.x;
            let y = mousePos.current.y;

            // Magnetic effect
            if (magnetTarget.current && isHovering.current) {
                const rect = magnetTarget.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distX = x - centerX;
                const distY = y - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                const maxDistance = 60;
                if (distance < maxDistance) {
                    const pull = (1 - distance / maxDistance) * 0.4;
                    x = x - distX * pull;
                    y = y - distY * pull;
                }
            }

            cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            let scale = 1;
            if (isClicking.current) {
                scale = 0.7;
            } else if (isHovering.current) {
                scale = 2.5;
            } else if (isTextHover.current) {
                scale = 1.6; // Scale up for text
            }

            inner.style.transform = `translate(-50%, -50%) scale(${scale})`;

            cursor.style.opacity = isHidden.current ? '0' : '1';

            // Interaction States
            if (isHovering.current) {
                // Clickable State (Ring)
                inner.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                inner.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            } else if (isTextHover.current) {
                // Text State (Transparent Overlay)
                inner.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 50% opacity white
                inner.style.borderColor = 'transparent';
                inner.style.mixBlendMode = 'difference';
            } else {
                // Default State (Solid Dot)
                inner.style.backgroundColor = '#fff';
                inner.style.borderColor = 'transparent';
                inner.style.mixBlendMode = 'difference';
            }
        };

        const onMouseMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            updateCursor();
        };

        const onMouseOver = (e) => {
            const target = e.target;

            // PRIORITY 1: Clickable elements (Links, Buttons)
            const clickable = target.closest('a, button, [role="button"], .cursor-pointer, input[type="submit"], .magnetic');

            // PRIORITY 2: Text elements
            // We check the tag name directly since CSS cursor:none hides the default cursor type
            const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'BLOCKQUOTE', 'TD', 'TH', 'LABEL', 'STRONG', 'EM', 'B', 'I'];
            const isTextTag = textTags.includes(target.tagName) || target.closest(textTags.join(','));

            isHovering.current = !!clickable;

            // Only consider it text hover if it's NOT clickable
            isTextHover.current = !clickable && !!isTextTag;

            magnetTarget.current = clickable || null;
            updateCursor();
        };

        const onMouseDown = () => { isClicking.current = true; updateCursor(); };
        const onMouseUp = () => { isClicking.current = false; updateCursor(); };
        const onMouseLeave = () => { isHidden.current = true; updateCursor(); };
        const onMouseEnter = () => { isHidden.current = false; updateCursor(); };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mousedown', onMouseDown, { passive: true });
        window.addEventListener('mouseup', onMouseUp, { passive: true });
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);

        // Initial update
        updateCursor();

        return () => {
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
