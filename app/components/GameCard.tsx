import { Link } from "@remix-run/react";
import { FiPlay } from "react-icons/fi";
import { gameSlug } from "../data/games";
import type { Game } from "./types";

type Props = {
  game: Game;
  rank?: number;
};

export default function GameCard({ game, rank }: Props) {
  const slug = gameSlug(game.title);
  const cardImage = `/images/cards/${slug}.webp`;
  const cardImageSet = `/images/cards/320/${slug}.webp 320w, ${cardImage} 640w`;
  const cardAvifSet = `/images/cards/320/${slug}.avif 320w, /images/cards/520/${slug}.avif 520w, /images/cards/${slug}.avif 640w`;
  const cardImageSizes = rank
    ? "(max-width: 760px) 70vw, (max-width: 1200px) 24vw, 25vw"
    : "(max-width: 760px) 44vw, (max-width: 1200px) 24vw, 20vw";

  return (
    <Link
      to={`/games/${slug}`}
      className={`game-card-link${rank ? " game-card-link--ranked" : ""}`}
      data-game-slug={slug}
    >
      <div className="game-card">
        {rank && <span className="game-card__rank" aria-hidden="true">{rank}</span>}
        <div className="game-card__media">
          <picture>
            <source
              type="image/avif"
              srcSet={cardAvifSet}
              sizes={cardImageSizes}
            />
            <img
              src={cardImage}
              srcSet={cardImageSet}
              sizes={cardImageSizes}
              alt=""
              loading={rank === 1 ? "eager" : "lazy"}
              decoding={rank === 1 ? "sync" : "async"}
              fetchPriority={rank === 1 ? "high" : "auto"}
              draggable={false}
            />
          </picture>
          <span className="game-card__media-overlay" aria-hidden="true" />
          <span className="game-card__label">
            <strong>{game.title}</strong>
            <span>{game.subtitle}</span>
          </span>
          <span className="game-card__preview" aria-hidden="true"><FiPlay /></span>
        </div>
      </div>
      {rank && <span className="sr-only">Rank {rank}</span>}
    </Link>
  );
}
