import { useEffect, useRef, useState } from "react";
import { HERO_SLIDES } from "../data/heroslides";

type DeviceMode = "desktop" | "portrait" | "landscape";

function getDeviceMode(): DeviceMode {
  if (typeof window === "undefined") return "desktop";

  const { innerHeight: height, innerWidth: width } = window;
  if (width <= 1100 && height < width) return "landscape";
  return width <= 1100 ? "portrait" : "desktop";
}

/*
 * The hero is deliberately image-led. The previous implementation eagerly
 * promoted a large MP4 and warmed the next one on every first visit, which
 * made the landing screen download tens of megabytes before a visitor chose a
 * game. Full trailers remain available from every game card.
 */
export default function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(getDeviceMode);
  const [renderedSlides, setRenderedSlides] = useState<Set<number>>(() => new Set([0]));
  const touchStartX = useRef(0);

  useEffect(() => {
    const updateDeviceMode = () => setDeviceMode(getDeviceMode());
    updateDeviceMode();
    window.addEventListener("resize", updateDeviceMode, { passive: true });
    window.addEventListener("orientationchange", updateDeviceMode, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDeviceMode);
      window.removeEventListener("orientationchange", updateDeviceMode);
    };
  }, []);

  const showSlide = (index: number) => {
    setRenderedSlides((slides) => {
      if (slides.has(index)) return slides;
      return new Set(slides).add(index);
    });
    setCurrent(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (deviceMode !== "portrait") return;
    touchStartX.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (deviceMode !== "portrait") return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) < 56) return;

    showSlide(
      delta > 0
        ? (current + 1) % HERO_SLIDES.length
        : (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  return (
    <section
      className="cin-hero"
      aria-label="Featured games"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === current;
        const shouldRenderArtwork = renderedSlides.has(index);

        return (
          <div
            key={slide.id}
            id={`hero-slide-${slide.id}`}
            className={`cin-slide ${isActive ? "active" : ""}`}
            aria-hidden={!isActive}
          >
            {shouldRenderArtwork && (
              <picture className="cin-layer cin-layer--static" aria-hidden="true">
                <source
                  media="(max-width: 1100px) and (orientation: landscape)"
                  srcSet={slide.imageMobileLandscape}
                />
                <source media="(max-width: 1100px)" srcSet={slide.imageMobilePortrait} />
                <img
                  className="cin-img"
                  src={slide.imageDesktop}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            )}

            <div className="cin-overlay" aria-hidden="true" />

            <div className="cin-content">
              <p className="cin-category">{slide.category}</p>
              <h1 className="cin-title">{slide.title}</h1>
              <p className="cin-tag">{slide.tagline}</p>
              <div className="cin-buttons" aria-label={`${slide.title} categories`}>
                <span className="cin-chip cin-chip--primary">{slide.btn1}</span>
                <span className="cin-chip">{slide.btn2}</span>
              </div>
              <a className="cin-explore" href="#game-library" tabIndex={isActive ? 0 : -1}>
                Explore games <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        );
      })}

      <div className="cin-progress" role="tablist" aria-label="Featured game slides">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`bar ${index === current ? "active" : ""}`}
            onClick={() => showSlide(index)}
            onFocus={() => setRenderedSlides((slides) => slides.has(index) ? slides : new Set(slides).add(index))}
            role="tab"
            aria-controls={`hero-slide-${slide.id}`}
            aria-selected={index === current}
            aria-label={`Show ${slide.title}`}
          />
        ))}
      </div>

      <div className="cin-netflix-bar" aria-hidden="true">
        <div className="cin-netflix-fill" />
      </div>
    </section>
  );
}
