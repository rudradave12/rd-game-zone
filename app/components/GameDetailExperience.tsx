import {
  FaCrosshairs,
  FaDesktop,
  FaFistRaised,
  FaFlagCheckered,
  FaPlaystation,
  FaTrophy,
} from "react-icons/fa";
import {
  FiActivity,
  FiCalendar,
  FiCompass,
  FiMap,
  FiMapPin,
  FiMonitor,
  FiTarget,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Game } from "./types";
import {
  topTenGameHighlights,
  type GameHighlightKind,
  type TopTenGameId,
} from "../data/top-ten-game-highlights";

const genreIcons: Record<Game["category"], IconType> = {
  SHOOTING: FaCrosshairs,
  ACTION: FiActivity,
  RACING: FaFlagCheckered,
  SPORTS: FaTrophy,
  FIGHTING: FaFistRaised,
  ADVENTURE: FiCompass,
  "OPEN WORLD": FiMap,
};

const highlightIcons: Record<GameHighlightKind, IconType> = {
  mode: FiTarget,
  agent: FiUser,
  map: FiMapPin,
  event: FiCalendar,
  fighter: FaFistRaised,
  match: FaTrophy,
};

const platformIcons: Record<Game["platforms"][number], IconType> = {
  PS5: FaPlaystation,
  PS4: FaPlaystation,
  PC: FaDesktop,
};

export function GameAbout({ game, description }: { game: Game; description: string }) {
  const GenreIcon = genreIcons[game.category];
  const isMultiplayer = /MULTIPLAYER|ONLINE|CO-OP|LAN/i.test(game.playerType);
  const PlayerIcon = isMultiplayer ? FiUsers : FiUser;

  return (
    <section className="game-experience game-about" aria-labelledby={`game-about-title-${game.id}`}>
      <header className="game-experience__heading">
        <p className="game-detail__eyebrow">ABOUT THE GAME</p>
        <h2 id={`game-about-title-${game.id}`}>{game.title}</h2>
        <p className="game-about__description">{description}</p>
      </header>
      <ul className="game-about__facts" aria-label={`${game.title} details`}>
        <li className="game-about__fact">
          <span className="game-about__icon" aria-hidden="true"><GenreIcon /></span>
          <span className="game-about__label">Genre</span>
          <strong>{game.category}</strong>
        </li>
        <li className="game-about__fact">
          <span className="game-about__icon" aria-hidden="true"><PlayerIcon /></span>
          <span className="game-about__label">Play style</span>
          <strong>{game.playerType}</strong>
        </li>
        <li className="game-about__fact game-about__fact--platforms">
          <span className="game-about__icon" aria-hidden="true"><FiMonitor /></span>
          <span className="game-about__label">Game platforms</span>
          <span className="game-about__platforms">
            {game.platforms.map((platform) => {
              const PlatformIcon = platformIcons[platform];
              return (
                <span key={platform}>
                  <PlatformIcon aria-hidden="true" />
                  <strong>{platform}</strong>
                </span>
              );
            })}
          </span>
        </li>
      </ul>
    </section>
  );
}

export function TopTenSpotlight({ game }: { game: Game }) {
  const spotlight = topTenGameHighlights[game.id as TopTenGameId];
  if (!spotlight) return null;

  return (
    <section className="game-experience game-spotlight" aria-labelledby={`game-spotlight-title-${game.id}`}>
      <header className="game-experience__heading">
        <p className="game-detail__eyebrow">TOP 10 · INSIDE THE GAME</p>
        <h2 id={`game-spotlight-title-${game.id}`}>{spotlight.heading}</h2>
        <p>{spotlight.intro}</p>
      </header>
      <ul className="game-spotlight__grid">
        {spotlight.items.map((item) => {
          const Icon = highlightIcons[item.kind];
          return (
            <li className="game-spotlight__item" key={`${item.kind}-${item.title}`}>
              <span className="game-spotlight__medallion" aria-hidden="true"><Icon /></span>
              <span className="game-spotlight__kind">{item.kind}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
