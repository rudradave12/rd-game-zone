import { useEffect, useRef } from "react";
import { FaDesktop, FaPlaystation } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import type { Game, VideoSource } from "./types";

type Props = {
  video: VideoSource;
  /** Optional: when supplied the modal shows a game info panel under the player.
   *  Uses only fields that already exist on Game — no new data model. */
  game?: Game;
  onClose: () => void;
};

const statusLabels = {
  available: "Available now",
  upcoming: "Coming soon",
  unavailable: "Currently unavailable",
} as const;

export default function VideoModal({ video, game, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    /* ── Netflix-style scroll lock ──
       position:fixed removes the scrollbar, so we store the offset and
       restore it on close to avoid the page jumping to the top. */
    const scrollY = window.scrollY;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollY}px`;

    /* Move focus into the dialog so keyboard and screen-reader users
       land inside it rather than behind it. */
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      /* Focus trap — Tab cycles within the dialog only. */
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video, iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const renderVideo = () => {
    if (video.type === "youtube") {
      return (
        <div className="video-frame-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&controls=0&modestbranding=1&rel=0&disablekb=1`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            title={game ? `${game.title} trailer` : "Game trailer"}
          />
          <div className="iframe-blocker" />
        </div>
      );
    }

    if (video.type === "mp4" || video.type === "webm") {
      return (
        <video
          src={video.src}
          autoPlay
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
        />
      );
    }

    if (video.type === "gdrive") {
      return (
        <div className="video-frame-wrapper">
          <iframe
            src={`https://drive.google.com/file/d/${video.id}/preview`}
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            title={game ? `${game.title} trailer` : "Game trailer"}
          />
          <div className="iframe-blocker" />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={game ? `${game.title} trailer` : "Game trailer"}
    >
      <div className="video-overlay" onClick={onClose} />

      <div className="video-panel" ref={panelRef}>
        <button
          ref={closeRef}
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close trailer"
        >
          <FiX aria-hidden="true" />
        </button>

        <div className="video-container">{renderVideo()}</div>

        {/* Info strip — built entirely from existing Game fields */}
        {game && (
          <div className="video-info">
            <div className="video-info__head">
              <div className="video-info__title-block">
                <h2 className="video-info__title">{game.title}</h2>
                <p className="video-info__subtitle">{game.subtitle}</p>
              </div>

              <span className={`video-info__status video-info__status--${game.status}`}>
                <span aria-hidden="true" />
                {statusLabels[game.status]}
              </span>
            </div>

            <dl className="video-info__meta">
              <div>
                <dt>Genre</dt>
                <dd>{game.category}</dd>
              </div>
              <div>
                <dt>Players</dt>
                <dd>{game.playerType}</dd>
              </div>
              <div>
                <dt>Platforms</dt>
                <dd className="video-info__platforms">
                  {game.platforms.includes("PS5") && (
                    <span><FaPlaystation aria-hidden="true" /> PS5</span>
                  )}
                  {game.platforms.includes("PS4") && (
                    <span><FaPlaystation aria-hidden="true" /> PS4</span>
                  )}
                  {game.platforms.includes("PC") && (
                    <span><FaDesktop aria-hidden="true" /> PC</span>
                  )}
                </dd>
              </div>
              <div>
                <dt>Rating</dt>
                <dd>{game.adult ? "18+ Mature" : "All ages"}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
