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
  FiCompass,
  FiMap,
  FiMonitor,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import type { Game } from "./types";
import {
  topTenGameHighlights,
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

const platformIcons: Record<Game["platforms"][number], IconType> = {
  PS5: FaPlaystation,
  PS4: FaPlaystation,
  PC: FaDesktop,
};

const gameplayFocus: Record<Game["category"], string> = {
  SHOOTING: "Awareness, positioning, and aim shape each encounter.",
  ACTION: "Movement, timing, and combat guide the pace of play.",
  RACING: "Find a clean line, manage speed, and chase the finish.",
  SPORTS: "Read the play, control the tempo, and create an opening.",
  FIGHTING: "Learn the matchup, react to your opponent, and find your rhythm.",
  ADVENTURE: "Explore the world, follow the story, and discover what comes next.",
  "OPEN WORLD": "Explore at your own pace and choose how to move through the world.",
};

export function GameAbout({ game, description }: { game: Game; description: string }) {
  const GenreIcon = genreIcons[game.category];
  const isMultiplayer = /MULTIPLAYER|ONLINE|CO-OP|LAN/i.test(game.playerType);
  const PlayerIcon = isMultiplayer ? FiUsers : FiUser;
  const needsGameplayContext = description === game.subtitle;

  return (
    <section className="game-experience game-about" aria-labelledby={`game-about-title-${game.id}`}>
      <header className="game-experience__heading">
        <p className="game-detail__eyebrow">ABOUT THE GAME</p>
        <h2 id={`game-about-title-${game.id}`}>{game.title}</h2>
        <p className="game-about__description">{description}</p>
        {needsGameplayContext && (
          <p className="game-about__context"><span>Gameplay focus</span>{gameplayFocus[game.category]}</p>
        )}
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

const categorySpotlight = {
  SHOOTING: {
    focus: "Aim & awareness",
    detail: "Scan your surroundings and use cover while pushing through each encounter.",
    tip: "Watch your positioning",
    tipDetail: "Pay attention to cover and sightlines as you move through each encounter.",
  },
  ACTION: {
    focus: "Movement & timing",
    detail: "Build a feel for your movement and time attacks to meet each challenge.",
    tip: "Learn the controls",
    tipDetail: "A little time with the controls helps each encounter feel more responsive.",
  },
  RACING: {
    focus: "Speed & control",
    detail: "Keep momentum through corners and adjust your line to stay in control.",
    tip: "Find your racing line",
    tipDetail: "Balance speed and control as you take on each event.",
  },
  SPORTS: {
    focus: "Read the play",
    detail: "Create space, vary your tactics, and look for openings as play develops.",
    tip: "Set your match-up",
    tipDetail: "Choose your side and settle on a format before the first whistle.",
  },
  FIGHTING: {
    focus: "Learn the matchup",
    detail: "Watch your opponent's habits, defend carefully, and punish an opening.",
    tip: "Pick your matchup",
    tipDetail: "Choose a fighter and learn how their style fits your approach.",
  },
  ADVENTURE: {
    focus: "Explore & discover",
    detail: "Look beyond the main path for places and story details to uncover.",
    tip: "Take in the journey",
    tipDetail: "Explore at your own pace and follow the path that interests you.",
  },
  "OPEN WORLD": {
    focus: "Explore freely",
    detail: "Choose a destination or follow whichever activity catches your attention.",
    tip: "Choose your own route",
    tipDetail: "Set a goal or simply explore the world at your own pace.",
  },
} satisfies Record<Game["category"], { focus: string; detail: string; tip: string; tipDetail: string }>;

function playStyleDetail(playerType: string) {
  if (/LOCAL.*ONLINE.*CO-OP|ONLINE.*LOCAL.*CO-OP/i.test(playerType)) {
    return "Play together locally or online, according to the available game modes.";
  }
  if (/SINGLE PLAYER.*CO-OP|CO-OP.*SINGLE PLAYER/i.test(playerType)) {
    return "Play solo or team up with a friend in co-op.";
  }
  if (/ONLINE CO-OP/i.test(playerType)) {
    return "Team up online and work through the game together.";
  }
  if (/CO-OP/i.test(playerType)) {
    return "Share the experience and coordinate with a co-op partner.";
  }
  if (/MULTIPLAYER/i.test(playerType)) {
    return "Play with other people in the multiplayer format listed for this title.";
  }
  if (/SINGLE PLAYER/i.test(playerType)) {
    return "A solo-focused experience you can play at your own pace.";
  }
  return "Check the listed play style above when choosing your session.";
}

export function GameSpotlight({ game }: { game: Game }) {
  const spotlight = topTenGameHighlights[game.id as TopTenGameId];
  const category = categorySpotlight[game.category];
  const items = spotlight?.items ?? [
    { kind: "gameplay", title: category.focus, detail: category.detail },
    { kind: "play style", title: game.playerType, detail: playStyleDetail(game.playerType) },
    { kind: "session tip", title: category.tip, detail: category.tipDetail },
  ];

  return (
    <section className="game-experience game-spotlight" aria-labelledby={`game-spotlight-title-${game.id}`}>
      <header className="game-experience__heading">
        <p className="game-detail__eyebrow">INSIDE THE GAME</p>
        <h2 id={`game-spotlight-title-${game.id}`}>{spotlight?.heading ?? "What to expect"}</h2>
        <p>{spotlight?.intro ?? `A quick guide to the ${game.title} experience and its play style.`}</p>
      </header>
      <ul className="game-spotlight__grid">
        {items.map((item, index) => {
          return (
            <li className="game-spotlight__item" key={`${item.kind}-${item.title}`}>
              <span className="game-spotlight__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="game-spotlight__copy">
                <span className="game-spotlight__kind">{item.kind}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
