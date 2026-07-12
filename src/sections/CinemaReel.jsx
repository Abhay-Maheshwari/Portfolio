import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { projects } from "../constants";
import "./CinemaReel.css";

gsap.registerPlugin(ScrollToPlugin);

const LOOP_COPIES = 5;
const N_SLIDES = projects.length;
const TOTAL_RENDERED = N_SLIDES * LOOP_COPIES;
const INITIAL_IDX = Math.floor(LOOP_COPIES / 2) * N_SLIDES;

const AUTO_START_IDX = INITIAL_IDX - 3;
const AUTO_END_IDX = INITIAL_IDX;
const AUTO_SCROLL_MS = 2500;
const AUTO_FADE_MS = 800;

const SLIDE_VH = 80;
const GAP_VH = 5;
const PITCH_VH = SLIDE_VH + GAP_VH; // 85
const PAD_X_VH = 7.5;
const MASK_VH = 10;
const TOP_PAD_VH = (100 - SLIDE_VH) / 2; // 10

const WHEEL_PER_EVENT_CAP = 200;
const WHEEL_PAUSE_MS = 100;
const DRAG_THRESHOLD_VH = 14;

const EASE = 0.11;
const FADE_THRESHOLD = 0.55;
const PARALLAX_FACTOR = 0.42;
const ENTRY_OFFSET_PX = 64;
const IMG_HEIGHT_RATIO = 1.2;

const getAssetPath = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return "/" + path;
};

const CinemaReel = ({ isOpen, onClose }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const scanlinesRef = useRef(null);
  const blurFilterRef = useRef(null);
  const pipColumnRef = useRef(null);

  const customCursorRef = useRef(null);
  const cursorScrollRef = useRef(null);
  const cursorDragRef = useRef(null);
  const cursorUpRef = useRef(null);
  const cursorDownRef = useRef(null);

  const slideRefs = useRef([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Core scroller coordinates & stats refs (to run at 60fps inside RAF loop)
  const scroller = useRef({
    autoScrolling: true,
    idx: AUTO_START_IDX,
    prevIdx: AUTO_START_IDX,
    y: 0,
    targetY: 0,
    wheelLastTime: 0,
    viewportH: 1080,
    pitch: 85,
    slideH: 80,
    dragThresh: 14,
    topPad: 10,
    onSection: false,
    isDown: false,
    cursorZone: null,
    cursorOnUi: false,
    cursorPos: { x: 0, y: 0 },
    cursorRender: { x: 0, y: 0, scale: 1, opacity: 0 },
    cursorInit: false,
    lastBlurP: 0,
    lastBlurTs: 0,
    timelineCompletedOnce: false,
  });

  const drag = useRef({
    active: false,
    startClientY: 0,
    startTrackY: 0,
    delta: 0,
    pointerId: 0,
  });

  const mainTweenRef = useRef(null);

  // Helper
  const modN = (i) => ((i % N_SLIDES) + N_SLIDES) % N_SLIDES;

  const recomputeSizes = () => {
    const h = window.innerHeight;
    
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--real-vh", `${h / 100}px`);
    }

    scroller.current.viewportH = h;
    scroller.current.pitch = (h * PITCH_VH) / 100;
    scroller.current.slideH = (h * SLIDE_VH) / 100;
    scroller.current.dragThresh = (h * DRAG_THRESHOLD_VH) / 100;
    scroller.current.topPad = (h * TOP_PAD_VH) / 100;

    if (!scroller.current.autoScrolling) {
      scroller.current.targetY = scroller.current.topPad - scroller.current.idx * scroller.current.pitch;
      scroller.current.y = scroller.current.targetY;
    }
  };

  const updateIndex = (newIdx) => {
    scroller.current.prevIdx = scroller.current.idx;
    scroller.current.idx = newIdx;
    scroller.current.targetY = scroller.current.topPad - newIdx * scroller.current.pitch;
    setActiveIdx(modN(newIdx));
  };

  const navigateToSlide = (slideModIdx) => {
    if (scroller.current.autoScrolling || isModalOpen) return;
    const currentMod = modN(scroller.current.idx);
    let diff = slideModIdx - currentMod;
    if (diff > N_SLIDES / 2) diff -= N_SLIDES;
    if (diff < -N_SLIDES / 2) diff += N_SLIDES;
    updateIndex(scroller.current.idx + diff);
  };

  const maybeWrap = () => {
    const s = scroller.current;
    const lowerBound = N_SLIDES;
    const upperBound = (LOOP_COPIES - 1) * N_SLIDES - 1;
    if (s.idx < lowerBound) {
      const offset = Math.ceil((lowerBound - s.idx) / N_SLIDES) * N_SLIDES;
      s.idx += offset;
      s.prevIdx += offset;
      s.y -= offset * s.pitch;
      s.targetY -= offset * s.pitch;
    } else if (s.idx > upperBound) {
      const offset = Math.ceil((s.idx - upperBound) / N_SLIDES) * N_SLIDES;
      s.idx -= offset;
      s.prevIdx -= offset;
      s.y += offset * s.pitch;
      s.targetY += offset * s.pitch;
    }
  };

  // Launch entrance scroller transition
  const runEntranceTransition = () => {
    recomputeSizes();
    const h = window.innerHeight;

    // Set initial position
    const initialVPitchVh = SLIDE_VH * 1 + GAP_VH;
    const initialY = ((TOP_PAD_VH - AUTO_START_IDX * initialVPitchVh) * h) / 100;
    scroller.current.y = initialY;
    scroller.current.targetY = initialY;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(0, ${initialY}px, 0)`;
      // Removed trackRef.current.style.filter = "url(#cinema-motion-blur)"; 
      // due to max texture size limits on mobile GPUs causing black screen.
    }

    if (scanlinesRef.current) {
      scanlinesRef.current.style.display = "block";
      scanlinesRef.current.style.opacity = "1";
    }

    // Reset slide visibility
    slideRefs.current.forEach((ref) => {
      if (ref) {
        const content = ref.querySelector("[data-slide-content]");
        if (content) {
          content.style.opacity = "0";
          content.classList.remove("active-content");
        }
        ref.style.opacity = "0";
      }
    });

    const tweenObj = { p: 0 };
    const scrollTotalSec = AUTO_SCROLL_MS / 1000;
    const fadeSec = AUTO_FADE_MS / 1000;
    const vhToPx = h / 100;

    scroller.current.autoScrolling = true;
    scroller.current.timelineCompletedOnce = false;
    scroller.current.idx = AUTO_START_IDX;
    scroller.current.prevIdx = AUTO_START_IDX;

    if (mainTweenRef.current) mainTweenRef.current.kill();

    const mainTween = gsap.timeline({
      onUpdate: () => {
        const p = tweenObj.p;
        const idxF = AUTO_START_IDX + (AUTO_END_IDX - AUTO_START_IDX) * p;
        const vpVh = PITCH_VH;

        scroller.current.y = (TOP_PAD_VH - idxF * vpVh) * vhToPx;
        scroller.current.targetY = scroller.current.y;

        const visualPitchPx = vpVh * vhToPx;

        slideRefs.current.forEach((el, i) => {
          if (!el) return;
          const wrap = el.querySelector("[data-slide-image]");
          if (wrap) {
            const visualDyPx = (i - idxF) * visualPitchPx;
            const wrapY = -visualDyPx / IMG_HEIGHT_RATIO;
            wrap.style.transform = `translate3d(0, ${wrapY.toFixed(2)}px, 0)`;
          }
        });

        // Blur calculation
        const now = performance.now();
        let norm = 1;
        if (scroller.current.lastBlurTs > 0) {
          const dt = Math.max(now - scroller.current.lastBlurTs, 1);
          const dp = Math.abs(p - scroller.current.lastBlurP);
          const idxRange = AUTO_END_IDX - AUTO_START_IDX;
          const idxSpeed = (dp * idxRange) / dt;
          const peakSpeed = (idxRange * 3) / (scrollTotalSec * 1000);
          norm = Math.min(idxSpeed / peakSpeed, 1);
        }
        scroller.current.lastBlurP = p;
        scroller.current.lastBlurTs = now;

        if (blurFilterRef.current) {
          blurFilterRef.current.setAttribute("stdDeviation", `0 ${(norm * 18).toFixed(2)}`);
        }
        if (scanlinesRef.current) {
          scanlinesRef.current.style.opacity = norm.toFixed(3);
        }
      },
      onComplete: () => {
        if (scroller.current.timelineCompletedOnce) return;
        scroller.current.timelineCompletedOnce = true;

        if (blurFilterRef.current) {
          blurFilterRef.current.setAttribute("stdDeviation", "0 0");
        }

        scroller.current.autoScrolling = false;
        if (scanlinesRef.current) scanlinesRef.current.style.display = "none";

        scroller.current.idx = AUTO_END_IDX;
        scroller.current.prevIdx = AUTO_END_IDX;
        scroller.current.targetY = scroller.current.topPad - AUTO_END_IDX * scroller.current.pitch;
        scroller.current.y = scroller.current.targetY;
        setActiveIdx(modN(AUTO_END_IDX));

        // Reveal landing slide content
        const landing = slideRefs.current[AUTO_END_IDX];
        if (landing) {
          const reveals = landing.querySelectorAll("[data-reveal]");
          if (reveals.length) {
            gsap.fromTo(
              reveals,
              { opacity: 0, y: 32, filter: "blur(10px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.0,
                ease: "power4.out",
                stagger: 0.07,
              }
            );
          }
          const content = landing.querySelector("[data-slide-content]");
          if (content) {
            content.style.opacity = "1";
            content.style.filter = "blur(0px)";
            content.classList.add("active-content");
          }
        }
      },
    });

    // Fade opacity: 0 -> 1
    mainTween.to(
      slideRefs.current.filter(Boolean),
      { opacity: 1, duration: fadeSec, ease: "power2.out" },
      0
    );

    // Scroll: p: 0 -> 1
    mainTween.to(
      tweenObj,
      { p: 1, duration: scrollTotalSec, ease: "power3.out" },
      0
    );

    mainTweenRef.current = mainTween;
  };

  // 1. Initial trigger on open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("hide-global-cursor");
      document.body.classList.add("cinema-active");
      runEntranceTransition();
    } else {
      document.body.classList.remove("hide-global-cursor");
      document.body.classList.remove("cinema-active");
      if (mainTweenRef.current) mainTweenRef.current.kill();
      scroller.current.cursorInit = false;
    }

    return () => {
      document.body.classList.remove("hide-global-cursor");
      document.body.classList.remove("cinema-active");
    };
  }, [isOpen]);

  // 2. Continuous 60fps update loop (Lerp spring scrolling & custom cursor)
  useEffect(() => {
    let raf;

    const tick = () => {
      if (!isOpen) return;

      const s = scroller.current;
      const now = performance.now();
      const isDragging = drag.current.active;
      const wheelActive = now - s.wheelLastTime < WHEEL_PAUSE_MS;

      // Spring physics vertical scroll
      if (!isDragging && !wheelActive && !s.autoScrolling) {
        const dy = s.targetY - s.y;
        if (Math.abs(dy) < 0.5) s.y = s.targetY;
        else s.y += dy * EASE;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, ${s.y}px, 0)`;
      }

      // Parallax & slide updates
      const viewCenter = s.viewportH / 2;

      for (let i = 0; i < TOTAL_RENDERED; i++) {
        const ref = slideRefs.current[i];
        if (!ref) continue;

        const effectiveTop = i * s.pitch + s.y;
        const slideCenter = effectiveTop + s.slideH / 2;
        const dy2 = slideCenter - viewCenter;
        const dn = Math.abs(dy2) / s.slideH;

        if (dn > 2) {
          const content = ref.querySelector("[data-slide-content]");
          if (content && content.style.opacity !== "0") {
            content.style.opacity = "0";
            content.classList.remove("active-content");
          }
          continue;
        }

        const wrap = ref.querySelector("[data-slide-image]");
        const content = ref.querySelector("[data-slide-content]");
        if (!content) continue;

        if (wrap && !s.autoScrolling) {
          const imgY = -dy2 / IMG_HEIGHT_RATIO;
          wrap.style.transform = `translate3d(0, ${imgY.toFixed(2)}px, 0)`;
        }

        if (s.autoScrolling) {
          if (content.style.opacity !== "0") {
            content.style.opacity = "0";
            content.classList.remove("active-content");
          }
          continue;
        }

        const isActive = i === s.idx;
        const isLeaving = i === s.prevIdx && s.prevIdx !== s.idx;

        let opacity = 0,
          cy = 0;

        if (isActive) {
          const t = Math.max(0, Math.min(1, 1 - dn / FADE_THRESHOLD));
          opacity = t * t * (3 - 2 * t);
          cy = (1 - opacity) * ENTRY_OFFSET_PX * Math.sign(dy2 || 1);
        } else if (isLeaving) {
          const fade = Math.max(0, 1 - Math.max(0, dn - 0.6) / 0.6);
          opacity = fade;
          cy = -dy2 * PARALLAX_FACTOR;
        }

        content.style.transform = `translate3d(0, ${cy.toFixed(2)}px, 0)`;
        content.style.opacity = opacity.toFixed(3);

        if (isActive && opacity > 0.5) {
          content.classList.add("active-content");
        } else {
          content.classList.remove("active-content");
        }
      }

      // Cursor updates
      const cursor = customCursorRef.current;
      if (cursor && s.cursorInit) {
        s.cursorRender.x += (s.cursorPos.x - s.cursorRender.x) * 0.22;
        s.cursorRender.y += (s.cursorPos.y - s.cursorRender.y) * 0.22;

        const targetOpacity = s.onSection ? 1 : 0;
        s.cursorRender.opacity += (targetOpacity - s.cursorRender.opacity) * 0.15;

        const targetScale = s.isDown && !s.cursorOnUi ? 1.18 : 1;
        s.cursorRender.scale += (targetScale - s.cursorRender.scale) * 0.15;

        const size = 104;
        cursor.style.transform = `translate3d(${(s.cursorRender.x - size / 2).toFixed(1)}px, ${(s.cursorRender.y - size / 2).toFixed(1)}px, 0) scale(${s.cursorRender.scale.toFixed(3)})`;
        cursor.style.opacity = s.cursorRender.opacity.toFixed(3);

        if (cursorScrollRef.current && cursorDragRef.current && cursorUpRef.current && cursorDownRef.current) {
          if (s.isDown && !s.cursorOnUi) {
            cursorScrollRef.current.style.opacity = "0";
            cursorDragRef.current.style.opacity = "1";
            cursorUpRef.current.style.opacity = "1";
            cursorDownRef.current.style.opacity = "1";
          } else if (s.cursorZone === "top") {
            cursorScrollRef.current.style.opacity = "0";
            cursorDragRef.current.style.opacity = "0";
            cursorUpRef.current.style.opacity = "1";
            cursorDownRef.current.style.opacity = "0";
          } else if (s.cursorZone === "bottom") {
            cursorScrollRef.current.style.opacity = "0";
            cursorDragRef.current.style.opacity = "0";
            cursorUpRef.current.style.opacity = "0";
            cursorDownRef.current.style.opacity = "1";
          } else {
            cursorScrollRef.current.style.opacity = "1";
            cursorDragRef.current.style.opacity = "0";
            cursorUpRef.current.style.opacity = "0";
            cursorDownRef.current.style.opacity = "0";
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, isModalOpen]);

  // 3. User Scrolling and Pointer interactions
  const handleWheel = (e) => {
    if (!isOpen || isModalOpen || scroller.current.autoScrolling) return;

    const target = e.target;
    if (target && target.closest && target.closest("[data-no-drag]")) return;

    e.preventDefault();

    const delta = Math.max(-WHEEL_PER_EVENT_CAP, Math.min(WHEEL_PER_EVENT_CAP, e.deltaY));
    scroller.current.y -= delta;
    scroller.current.wheelLastTime = performance.now();

    // Live snaps
    const idealFloat = (scroller.current.topPad - scroller.current.y) / scroller.current.pitch;
    const nearest = Math.round(idealFloat);
    if (nearest !== scroller.current.idx) {
      updateIndex(nearest);
      maybeWrap();
    }
  };

  const handlePointerDown = (e) => {
    if (!isOpen || isModalOpen || scroller.current.autoScrolling) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const target = e.target;
    if (target && target.closest && target.closest("[data-no-drag]")) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const zoneH = (scroller.current.viewportH * MASK_VH) / 100;

    if (relY < zoneH) {
      // Top Click -> scroll up
      updateIndex(scroller.current.idx - 1);
      maybeWrap();
      return;
    }
    if (relY > scroller.current.viewportH - zoneH) {
      // Bottom Click -> scroll down
      updateIndex(scroller.current.idx + 1);
      maybeWrap();
      return;
    }

    scroller.current.wheelLastTime = 0;
    drag.current.active = true;
    drag.current.startClientY = e.clientY;
    drag.current.startTrackY = scroller.current.y;
    drag.current.delta = 0;
    drag.current.pointerId = e.pointerId;
    scroller.current.isDown = true;
    setIsDragging(true);

    try {
      sectionRef.current.setPointerCapture(e.pointerId);
    } catch (_) {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isOpen) return;

    const s = scroller.current;
    s.cursorPos.x = e.clientX;
    s.cursorPos.y = e.clientY;
    s.onSection = true;

    if (!s.cursorInit) {
      s.cursorRender.x = e.clientX;
      s.cursorRender.y = e.clientY;
      s.cursorInit = true;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const zoneH = (s.viewportH * MASK_VH) / 100;

    if (relY < zoneH) s.cursorZone = "top";
    else if (relY > s.viewportH - zoneH) s.cursorZone = "bottom";
    else s.cursorZone = null;

    const target = e.target;
    s.cursorOnUi = !!(target && target.closest && target.closest("[data-no-drag]"));

    if (!drag.current.active || isModalOpen || s.autoScrolling) return;

    drag.current.delta = e.clientY - drag.current.startClientY;
    s.y = drag.current.startTrackY + drag.current.delta;

    // Track index during dragging
    const idealFloat = (s.topPad - s.y) / s.pitch;
    const nearest = Math.round(idealFloat);
    if (nearest !== s.idx) {
      updateIndex(nearest);
    }
  };

  const handlePointerUp = () => {
    if (!drag.current.active) return;
    scroller.current.isDown = false;
    setIsDragging(false);
    drag.current.active = false;

    try {
      sectionRef.current.releasePointerCapture(drag.current.pointerId);
    } catch (_) {
      // ignore
    }

    if (Math.abs(drag.current.delta) > scroller.current.dragThresh) {
      // Snap index
      const idealFloat = (scroller.current.topPad - scroller.current.y) / scroller.current.pitch;
      const nearest = Math.round(idealFloat);
      updateIndex(nearest);
      maybeWrap();
    } else {
      // Return back
      scroller.current.targetY = scroller.current.topPad - scroller.current.idx * scroller.current.pitch;
    }
  };

  const handlePointerEnter = () => {
    scroller.current.onSection = true;
    document.body.classList.add("hide-global-cursor");
  };

  const handlePointerLeave = () => {
    scroller.current.onSection = false;
    scroller.current.isDown = false;
    setIsDragging(false);
    document.body.classList.remove("hide-global-cursor");
    if (drag.current.active) {
      drag.current.active = false;
      scroller.current.targetY = scroller.current.topPad - scroller.current.idx * scroller.current.pitch;
    }
  };

  // Keyboard control
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (isModalOpen) {
        if (e.key === "Escape") closeDetail();
        return;
      }

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (scroller.current.autoScrolling) return;

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        updateIndex(scroller.current.idx - 1);
        maybeWrap();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        updateIndex(scroller.current.idx + 1);
        maybeWrap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isModalOpen]);

  // Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) recomputeSizes();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Details Modal actions
  const openDetail = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    const frame = slideRefs.current[scroller.current.idx];
    if (frame) {
      const inner = frame.querySelector("[data-slide-inner]");
      if (inner) inner.classList.add("tilted");
    }
  };

  const closeDetail = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    slideRefs.current.forEach((frame) => {
      if (frame) {
        const inner = frame.querySelector("[data-slide-inner]");
        if (inner) inner.classList.remove("tilted");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <section
      ref={sectionRef}
      className={`cinema-section ${isOpen ? "active" : ""}`}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* SVG Motion Blur Filter */}
      <svg aria-hidden="true" className="filter-svg">
        <defs>
          <filter id="cinema-motion-blur" x="-5%" y="-25%" width="110%" height="150%">
            <feGaussianBlur ref={blurFilterRef} in="SourceGraphic" stdDeviation="0 0" />
          </filter>
        </defs>
      </svg>

      {/* Slide Track */}
      <div ref={trackRef} className="cinema-track">
        {[...Array(TOTAL_RENDERED)].map((_, i) => {
          const project = projects[modN(i)];
          return (
            <div
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
              className="slide-frame"
              data-slide-idx={i}
            >
              <div className="slide-inner" data-slide-inner>
                <div className="slide-image-wrap" data-slide-image>
                  <img src={getAssetPath(project.imagePath || project.texture)} alt={project.title || project.titleLines?.join(" ")} />
                </div>

                <div className="slide-content" data-slide-content>
                  <div className="slide-top-left" data-reveal>
                    <div className="slide-year">{project.year}</div>
                    <div className="slide-category">{project.category}</div>
                  </div>

                  <div className="slide-center-left">
                    <div className="slide-eyebrow" data-reveal>
                      {project.eyebrow}
                    </div>
                    <h2 className="slide-title" data-reveal>
                      {(project.titleLines || []).map((line, idx) => (
                        <span key={idx}>{line}</span>
                      ))}
                    </h2>
                    <div className="slide-director" data-reveal>
                      ROLE: {project.role}
                    </div>
                    <button
                      className="explore-btn"
                      onClick={() => openDetail(project)}
                      data-reveal
                      data-no-drag
                    >
                      EXPLORE
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="slide-awards-col" data-reveal>
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <div key={idx} className="award-item">
                        <div className="award-label">{tech.label}</div>
                        <div className="award-quote">{tech.quote}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top/Bottom masks */}
      <div className="mask-top" aria-hidden="true" />
      <div className="mask-bottom" aria-hidden="true" />

      {/* Scanlines overlay during dragging */}
      <div
        ref={scanlinesRef}
        className="scanlines"
        style={{ opacity: isDragging ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Reel Pip Indicators */}
      <div className="reel-indicator" data-no-drag>
        <span className="indicator-label">{String(activeIdx + 1).padStart(2, "0")}</span>
        <div ref={pipColumnRef} className="pip-column">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`pip-btn ${i === activeIdx ? "active" : ""}`}
              onClick={() => navigateToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="indicator-label">{String(projects.length).padStart(2, "0")}</span>
      </div>

      {/* Details aside modal */}
      <div
        className={`details-backdrop ${isModalOpen ? "open" : ""}`}
        onClick={closeDetail}
      />
      <div className={`details-aside ${isModalOpen ? "open" : ""}`} data-no-drag onWheel={(e) => e.stopPropagation()}>
        <button className="details-close" aria-label="Close details" onClick={closeDetail}>
          ✕
        </button>
        {selectedProject && (
          <div className="details-scroll">
            <div className="details-hero">
              {selectedProject.videoPath &&
                (selectedProject.videoPath.endsWith(".mp4") || selectedProject.videoPath.endsWith(".webm")) ? (
                <video src={getAssetPath(selectedProject.videoPath)} autoPlay loop muted playsInline />
              ) : (
                <img src={getAssetPath(selectedProject.imagePath || selectedProject.texture)} alt={selectedProject.title || selectedProject.titleLines?.join(" ")} loading="lazy" />
              )}
              <div className="details-hero-fade" />
            </div>

            <div className="details-body">
              <div className="details-eyebrow">{selectedProject.eyebrow}</div>
              <h2 className="details-title">{selectedProject.title || selectedProject.titleLines?.join(" ")}</h2>
              <div className="details-meta-row">
                ROLE: {selectedProject.role} · {selectedProject.year} · {selectedProject.category}
              </div>

              <div className="details-divider" />
              <p className="details-synopsis">{selectedProject.desc || selectedProject.description}</p>
              <div className="details-divider" />

              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{selectedProject.stats.timeline}</div>
                  <div className="stat-label">TIMELINE</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{selectedProject.stats.platform}</div>
                  <div className="stat-label">PLATFORM</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{selectedProject.stats.role}</div>
                  <div className="stat-label">ROLE</div>
                </div>
                <div className="stat-item full-width">
                  <div className="stat-value" style={{ fontSize: "1.02rem", lineHeight: "1.5" }}>
                    {selectedProject.stats.github && selectedProject.stats.github !== "N/A" && selectedProject.stats.github !== "Private" ? (
                      <a href={selectedProject.stats.github.startsWith("http") ? selectedProject.stats.github : `https://${selectedProject.stats.github}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-warm)", textDecoration: "none" }}>
                        GITHUB: {selectedProject.stats.github}
                      </a>
                    ) : (
                      <span style={{ opacity: 0.6 }}>GITHUB: {selectedProject.stats.github || "N/A"}</span>
                    )}
                    <br />
                    {selectedProject.stats.live && selectedProject.stats.live !== "N/A" && selectedProject.stats.live !== "WIP" && selectedProject.stats.live !== "Internal" && selectedProject.stats.live !== "Local" ? (
                      <a href={selectedProject.stats.live.startsWith("http") ? selectedProject.stats.live : `https://${selectedProject.stats.live}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-warm)", textDecoration: "none" }}>
                        LIVE: {selectedProject.stats.live}
                      </a>
                    ) : (
                      <span style={{ opacity: 0.6 }}>LIVE: {selectedProject.stats.live || "N/A"}</span>
                    )}
                  </div>
                  <div className="stat-label">LINKS</div>
                </div>
              </div>

              <div className="details-divider" />
              <div className="awards-strip">
                {selectedProject.techStack.map((tech, idx) => (
                  <div key={idx} className="award-strip-item">
                    <div className="award-laurel">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="award-strip-body">
                      <div className="award-strip-label">{tech.label}</div>
                      <div className="award-strip-quote">{tech.quote}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dedicated Custom Cinema Cursor */}
      <div ref={customCursorRef} className="custom-cinema-cursor">
        <div className="cursor-ring" />
        <div ref={cursorScrollRef} className="cursor-scroll-state">
          SCROLL
        </div>
        <div ref={cursorDragRef} className="cursor-drag-state" style={{ opacity: 0 }}>
          <span className="grab-hand">✋</span>
        </div>
        <div ref={cursorUpRef} className="cursor-chevron-up" style={{ opacity: 0 }}>
          ▲
        </div>
        <div ref={cursorDownRef} className="cursor-chevron-down" style={{ opacity: 0 }}>
          ▼
        </div>
      </div>
    </section>
  );
};

export default CinemaReel;
