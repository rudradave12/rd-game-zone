import { FaDesktop, FaPlay, FaPlaystation } from "react-icons/fa";
import type { Game } from "./types";

type Props = {
  game: Game;
  onPlay: () => void;
};

const statusLabels = {
  available: "Available",
  upcoming: "Coming soon",
  unavailable: "Unavailable",
} as const;

export default function GameCard({ game, onPlay }: Props) {
  // Coming-soon titles can still have an official reveal trailer even though
  // they are not yet playable at RD Game Zone.
  const canWatchTrailer = Boolean(game.video);
  const trailerLabel = canWatchTrailer ? "Watch trailer" : "Trailer unavailable";

  return (
    <div className={`game-card status-${game.status}`}>
      <div className="game-card__media">
        <img src={game.image} alt={game.title} loading="lazy" decoding="async" />
        <div className="game-card__media-overlay" aria-hidden="true" />

        <div className="game-card__media-topline">
          <span className={`game-card__status game-card__status--${game.status}`}>
            <span aria-hidden="true" />
            {statusLabels[game.status]}
          </span>
        </div>

        {game.adult && <span className="game-card__age">18+</span>}

        {canWatchTrailer && (
          <button
            type="button"
            className="game-card__media-play"
            onClick={onPlay}
            aria-label={`Watch ${game.title} trailer`}
          >
            <FaPlay aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="game-card__body">
        <div className="game-card__copy">
          <h3 className="game-card__title">{game.title}</h3>
          <p className="game-card__subtitle">{game.subtitle}</p>
        </div>

        <div className="game-card__chips" aria-label="Game details">
          <span>{game.category}</span>
          <span>{game.playerType}</span>
        </div>

        <div className="game-card__footer">
          <div className="game-card__platforms" aria-label={`Platforms: ${game.platforms.join(", ")}`}>
            {game.platforms.includes("PS5") && (
              <span title="PlayStation 5"><FaPlaystation aria-hidden="true" /> PS5</span>
            )}
            {game.platforms.includes("PS4") && (
              <span title="PlayStation 4"><FaPlaystation aria-hidden="true" /> PS4</span>
            )}
            {game.platforms.includes("PC") && (
              <span title="PC"><FaDesktop aria-hidden="true" /> PC</span>
            )}
          </div>

          <button
            type="button"
            className="game-card__trailer"
            onClick={onPlay}
            disabled={!canWatchTrailer}
            aria-label={`${trailerLabel} for ${game.title}`}
          >
            <FaPlay aria-hidden="true" />
            <span>{canWatchTrailer ? "Trailer" : "Unavailable"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
