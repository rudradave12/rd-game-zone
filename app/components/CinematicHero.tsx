import { useEffect, useRef, useState, useCallback } from "react";
import { HERO_SLIDES } from "../data/heroslides";

/* ─────────────────────────────────────────────────────────────────
   DEVICE MODE
───────────────────────────────────────────────────────────────── */
type DeviceMode = "desktop" | "portrait" | "landscape";

function getDeviceMode(): DeviceMode {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w > 1024) return "desktop";
  if (h < w)    return "landscape";
  return "portrait";
}

/* ─────────────────────────────────────────────────────────────────
   safePlay
   ─────────────────────────────────────────────────────────────────
   WHY THIS EXISTS:
   Calling v.currentTime = 0; v.play() immediately on a video that
   hasn't buffered yet causes the "half-frame / glitch" problem —
   the browser tries to seek AND play before any data is available.

   FIX: if the video isn't buffered (readyState < HAVE_FUTURE_DATA),
   we wait for the "canplay" event, THEN seek + play.
   This guarantees a clean first frame every time.

   Returns a cancel function so we can abort if the slide changes
   before the video is ready.
───────────────────────────────────────────────────────────────── */
function safePlay(video: HTMLVideoElement | null): () => void {
  if (!video) return () => {};

  let cancelled = false;
  let removeListener = () => {};

  const doPlay = () => {
    if (cancelled) return;
    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay blocked by browser — image fallback stays visible, that's fine
    });
  };

  // readyState 3 = HAVE_FUTURE_DATA  (can play without buffering)
  // readyState 4 = HAVE_ENOUGH_DATA  (fully buffered)
  if (video.readyState >= 3) {
    doPlay();
  } else {
    // Video not ready yet — wait for canplay
    const handler = () => {
      removeListener();
      doPlay();
    };
    video.addEventListener("canplay", handler, { once: true });
    removeListener = () => video.removeEventListener("canplay", handler);

    // If preload="none" the browser won't fetch until we tell it to
    if (video.preload === "none") {
      video.preload = "auto";
      video.load();
    }
  }

  return () => {
    cancelled = true;
    removeListener();
  };
}

/* ─────────────────────────────────────────────────────────────────
   pauseAll  — stops every video element immediately
───────────────────────────────────────────────────────────────── */
function pauseAll(
  d: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  p: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  l: React.MutableRefObject<(HTMLVideoElement | null)[]>,
) {
  [...d.current, ...p.current, ...l.current].forEach(v => {
    if (v && !v.paused) v.pause();
  });
}

/* ─────────────────────────────────────────────────────────────────
   preloadVideo  — kicks off buffering for the NEXT slide so it's
   ready before the ended event fires (no wait/glitch on switch)
───────────────────────────────────────────────────────────────── */
function preloadVideo(
  index: number,
  mode: DeviceMode,
  d: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  p: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  l: React.MutableRefObject<(HTMLVideoElement | null)[]>,
) {
  const refs = mode === "desktop" ? d : mode === "portrait" ? p : l;
  const v = refs.current[index];
  if (v && v.preload === "none" && v.readyState === 0) {
    v.preload = "auto";
    v.load();
  }
}

/* ─────────────────────────────────────────────────────────────────
   getActiveVideo — returns the video ref for the current slide
   and device mode
───────────────────────────────────────────────────────────────── */
function getActiveVideo(
  slideIndex: number,
  mode: DeviceMode,
  d: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  p: React.MutableRefObject<(HTMLVideoElement | null)[]>,
  l: React.MutableRefObject<(HTMLVideoElement | null)[]>,
): HTMLVideoElement | null {
  const refs = mode === "desktop" ? d : mode === "portrait" ? p : l;
  return refs.current[slideIndex] ?? null;
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function CinematicHero() {
  const [current,    setCurrent]    = useState(0);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  const desktopVideoRefs   = useRef<(HTMLVideoElement | null)[]>([]);
  const portraitVideoRefs  = useRef<(HTMLVideoElement | null)[]>([]);
  const landscapeVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const sectionRef     = useRef<HTMLElement>(null);
  const isVisibleRef   = useRef(true);   // hero on screen?
  const isTabActiveRef = useRef(true);   // browser tab focused?
  const cancelPlayRef  = useRef<() => void>(() => {}); // cancel pending safePlay
  const touchStartX    = useRef<number>(0);            // swipe origin (portrait only)

  /* ── Play the active slide (respects visibility + tab state) ── */
  const playActive = useCallback((slideIndex: number, mode: DeviceMode) => {
    // Always cancel any queued play first
    cancelPlayRef.current();

    // Pause ALL videos across all device modes
    pauseAll(desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs);

    // Only play if the hero is on screen AND the tab is active
    if (!isVisibleRef.current || !isTabActiveRef.current) return;

    const refs =
      mode === "desktop"  ? desktopVideoRefs  :
      mode === "portrait" ? portraitVideoRefs :
                            landscapeVideoRefs;

    cancelPlayRef.current = safePlay(refs.current[slideIndex]);
  }, []);

  /* ── Device mode ── */
  useEffect(() => {
    const update = () => setDeviceMode(getDeviceMode());
    update();
    window.addEventListener("resize",            update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    return () => {
      window.removeEventListener("resize",            update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  /* ── IntersectionObserver: pause when hero scrolls out of view ──
     This is the primary battery-saving mechanism.
     Threshold 0.1 = pause as soon as < 10% of hero is visible.
  ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Hero scrolled back into view — resume
          playActive(current, deviceMode);
        } else {
          // Hero scrolled away — kill all playback
          cancelPlayRef.current();
          pauseAll(desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs);
        }
      },
      { threshold: 0.10 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, deviceMode]);

  /* ── Page Visibility API: pause when tab is hidden ──
     Saves battery on phone/laptop when user switches apps or tabs.
  ── */
  useEffect(() => {
    const onVisibility = () => {
      isTabActiveRef.current = document.visibilityState === "visible";
      if (isTabActiveRef.current && isVisibleRef.current) {
        playActive(current, deviceMode);
      } else {
        cancelPlayRef.current();
        pauseAll(desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [current, deviceMode, playActive]);

  /* ── REMOVED: setInterval auto-advance ──────────────────────────
     Replaced by the "ended" event listener below.
     Videos now advance only after they finish playing completely.
  ─────────────────────────────────────────────────────────────── */

  /* ── ended event → advance to next slide ────────────────────────
     Attached to the active device-mode video for the current slide.
     Cleaned up and re-attached whenever slide or deviceMode changes.

     WHY ONLY ONE DEVICE VIDEO:
     Only the video matching the current deviceMode is ever playing.
     Listening on all three would triple-fire the handler.
  ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = getActiveVideo(
      current, deviceMode,
      desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs,
    );
    if (!video) return;

    const onEnded = () => {
      const next = (current + 1) % HERO_SLIDES.length;
      setCurrent(next);
    };

    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [current, deviceMode]);

  /* ── loadedmetadata → sync CSS progress-bar duration ────────────
     Reads the actual video duration and writes it as a CSS custom
     property on the <section> element.

     The progress-bar and Netflix-bar CSS animations read
     var(--slide-duration, 8s) so they match the real video length
     exactly — no hard-coded timing anywhere.

     Falls back to 8 s if duration is unavailable (e.g. live stream
     or preload blocked by browser).
  ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = getActiveVideo(
      current, deviceMode,
      desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs,
    );
    if (!video || !sectionRef.current) return;

    const applyDuration = () => {
      const dur = isFinite(video.duration) && video.duration > 0
        ? video.duration
        : 8; // safe fallback
      sectionRef.current!.style.setProperty("--slide-duration", `${dur}s`);
    };

    // Duration already known (video cached or preloaded)
    if (video.readyState >= 1) {
      applyDuration();
    } else {
      // Wait for browser to read the media headers
      video.addEventListener("loadedmetadata", applyDuration, { once: true });
      return () => video.removeEventListener("loadedmetadata", applyDuration);
    }
  }, [current, deviceMode]);

  /* ── Play + preload next whenever slide or deviceMode changes ── */
  useEffect(() => {
    // Play current
    playActive(current, deviceMode);

    // Pre-buffer the NEXT slide's video so it's ready before ended fires.
    // This is what prevents the "loading/black flash" when switching slides.
    const next = (current + 1) % HERO_SLIDES.length;
    preloadVideo(next, deviceMode, desktopVideoRefs, portraitVideoRefs, landscapeVideoRefs);

    return () => {
      // Cancel any pending safePlay when slide/mode changes
      cancelPlayRef.current();
    };
  }, [current, deviceMode, playActive]);

  /* ── Manual navigation ── */
  const goTo = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  /* ── Swipe handlers — portrait mobile only ─────────────────────
     Records finger X on touchstart; on touchend calculates delta.
     > 50 px left  → next slide
     > 50 px right → previous slide
     Guard: only fires in portrait mode so desktop / landscape are
     completely unaffected.
  ─────────────────────────────────────────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (deviceMode !== "portrait") return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (deviceMode !== "portrait") return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 50) return; // ignore small / accidental taps
    if (delta > 0) {
      // Swiped left → next slide
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    } else {
      // Swiped right → previous slide
      setCurrent(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
  };

  return (
    <section
      className="cin-hero"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {HERO_SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.id}
            className={`cin-slide ${isActive ? "active" : ""}`}
            aria-hidden={!isActive}
          >

            {/* ═══════════════ DESKTOP LAYER ═══════════════
                <img> renders instantly as fallback background.
                <video> sits on top; covers img once playing.
                No black flash ever.
                loop REMOVED — ended event drives slide advance.
            ════════════════════════════════════════════════ */}
            <div className="cin-layer cin-layer--desktop">
              <img
                className="cin-img cin-img--desktop"
                src={slide.imageDesktop}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <video
                ref={el => { desktopVideoRefs.current[i] = el; }}
                className="cin-video cin-video--desktop"
                muted
                playsInline
                preload={i === 0 ? "auto" : "none"}
                disablePictureInPicture
                x-webkit-airplay="deny"
              >
                {/* The deployed desktop hero source is an MP4. */}
                <source src={slide.videoDesktopMp4} type="video/mp4" />
              </video>
            </div>

            {/* ═══════════════ PORTRAIT LAYER ══════════════
                loop REMOVED — ended event drives slide advance.
            ════════════════════════════════════════════════ */}
            <div className="cin-layer cin-layer--portrait">
              <img
                className="cin-img cin-img--portrait"
                src={slide.imageMobilePortrait}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <video
                ref={el => { portraitVideoRefs.current[i] = el; }}
                className="cin-video cin-video--portrait"
                muted
                playsInline
                preload={i === 0 ? "auto" : "none"}
                disablePictureInPicture
                x-webkit-airplay="deny"
              >
                <source src={slide.videoPortraitMp4} type="video/mp4" />
              </video>
            </div>

            {/* ═══════════════ LANDSCAPE LAYER ════════════
                loop REMOVED — ended event drives slide advance.
            ════════════════════════════════════════════════ */}
            <div className="cin-layer cin-layer--landscape">
              <img
                className="cin-img cin-img--landscape"
                src={slide.imageMobileLandscape}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <video
                ref={el => { landscapeVideoRefs.current[i] = el; }}
                className="cin-video cin-video--landscape"
                muted
                playsInline
                preload={i === 0 ? "auto" : "none"}
                disablePictureInPicture
                x-webkit-airplay="deny"
              >
                <source src={slide.videoLandscapeMp4} type="video/mp4" />
              </video>
            </div>

            {/* ── Overlay ── */}
            <div className="cin-overlay" aria-hidden="true" />

            {/* ── Content ── */}
            <div className="cin-content">
              <p className="cin-category">{slide.category}</p>
              <h1 className="cin-title">{slide.title}</h1>
              <p className="cin-tag">{slide.tagline}</p>
              <div className="cin-buttons">
                <span className="cin-chip cin-chip--primary">{slide.btn1}</span>
                <span className="cin-chip">{slide.btn2}</span>
              </div>
              <a className="cin-explore" href="#game-library" tabIndex={isActive ? 0 : -1}>Explore games <span aria-hidden="true">→</span></a>
            </div>

          </div>
        );
      })}

      {/* ── Progress bars (desktop + landscape) ── */}
      <div className="cin-progress" role="tablist" aria-label="Slide navigation">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={i}
            type="button"
            className={`bar ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`${slide.title} — slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Netflix bottom line (portrait mobile only) ── */}
      <div className="cin-netflix-bar" aria-hidden="true">
        <div key={current} className="cin-netflix-fill" />
      </div>

    </section>
  );
}
