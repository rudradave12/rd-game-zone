import { Link } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FaDesktop, FaPlaystation } from "react-icons/fa";
import { FiAlertTriangle, FiArrowLeft, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import GameCard from "./GameCard";
import type { Game } from "./types";
import { gameSlug, games } from "../data/games";
import { guidelines } from "./GameGuidelines";
import { gtaOnlinePolicyText } from "./GTAOnlinePolicy";

type Props = { game: Game };

const editorialDescriptions: Record<number, string> = {
  2: "Head into Los Santos with your crew and choose your own pace: launch into co-op missions, race for the finish, or explore the open world together. GTA Online is a social sandbox made for shared stories, quick challenges, and competitive sessions.",
  24: "Build a side, pick your formation, and take the pitch in EA SPORTS FC 27. Create a quick head-to-head match or settle in for a longer tournament-style session, with familiar clubs, rivalries, and football-first gameplay at the heart of every kickoff.",
  42: "Join the squad in Call of Duty: Modern Warfare III for sharp, fast-moving multiplayer action. Coordinate your loadout, communicate across the map, and turn every round into a test of reflexes and teamwork in this high-intensity shooter.",
  3: "Choose an agent, learn the angles, and make every ability count in VALORANT. Its tactical 5v5 rounds reward clear communication, careful timing, and precise aim, making it a great pick for a coordinated team session or a focused duel with friends.",
  4: "Counter-Strike 2 keeps the focus on smart utility, crisp aim, and tight team play. Take the attack or defend the site, make each round count, and coordinate your next move in one of PC gaming’s defining competitive shooters.",
  19: "Pick a ride and chase the perfect line through a fast, colorful arcade racing world. Asphalt Legends Unite brings short bursts of speed, big jumps, and head-to-head competition that make it easy to jump into a lively session with friends.",
  27: "Step onto the cricket pitch and shape the innings one delivery at a time. Read the bowler, choose your shot, and build a match around timing and tactics, whether you are setting a target or defending it with your teammates.",
  32: "Choose your fighter, master a style, and meet your opponent in Tekken 8. Its expressive characters and close-range duels make every round a new matchup, with space to learn combos, adapt, and settle a friendly rivalry.",
  33: "Enter the Mortal Kombat 1 arena for cinematic one-on-one combat. Select a fighter, find your rhythm, and challenge a friend to a dramatic set where sharp reactions and smart decisions make the difference.",
  44: "Make your entrance in WWE 2K26 and build a show-stopping match in the ring. Choose your superstar, set the pace, and take turns in a lively head-to-head session packed with wrestling spectacle and big-match moments.",
  41: "Return to Vice City in the next Grand Theft Auto adventure, a new open-world chapter from Rockstar Games. GRAND THEFT AUTO VI is marked as coming soon at RD Game Zone; its availability will be updated when the title is ready for sessions.",
};

const statusLabels = {
  available: "Available at RD Game Zone",
  upcoming: "Coming soon",
  unavailable: "Currently unavailable",
} as const;

type SessionTip = { title: string; detail: string };

function DeferredContent({
  children,
  className,
  placeholderHeight,
}: {
  children: ReactNode;
  className: string;
  placeholderHeight: string;
}) {
  const [isNearViewport, setIsNearViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "360px 0px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={isNearViewport ? undefined : { minHeight: placeholderHeight }}
      aria-busy={!isNearViewport}
    >
      {isNearViewport ? children : null}
    </div>
  );
}

const sessionTips: Record<number, SessionTip> = {
  1: { title: "Black Ops 7 · Squad setup", detail: "Pick a multiplayer mode, agree on team size, and settle your loadouts before the first round." },
  2: { title: "GTA Online · Session plan", detail: "Choose a heist, race, or free-roam goal together, then agree when to pass the controller." },
  3: { title: "VALORANT · Team briefing", detail: "Choose agents and team roles before queuing; use voice chat to coordinate each round." },
  4: { title: "Counter-Strike 2 · Round plan", detail: "Agree on sides and roles, then coordinate your utility and buys at the start of each round." },
  5: { title: "Apex Legends · Availability", detail: "Apex Legends is temporarily unavailable here. Check with the team for current alternatives." },
  6: { title: "Fortnite · Drop plan", detail: "Choose Battle Royale or Zero Build, set your squad size, and pick a landing spot together." },
  7: { title: "Cold War · Match setup", detail: "Choose the mode and map before starting, then take turns between matches." },
  8: { title: "Black Ops III · Match setup", detail: "Agree on the mode and map, then rotate players after each match to keep the session fair." },
  9: { title: "Back 4 Blood · Team plan", detail: "Choose a campaign chapter and difficulty, then decide who takes the lead between missions." },
  10: { title: "World War Z · Squad plan", detail: "Pick an episode and difficulty before launching; regroup at each chapter transition." },
  12: { title: "Black Myth: Wukong · Turn plan", detail: "Take turns at a checkpoint or after a boss encounter so each player gets a clear run." },
  13: { title: "God of War Ragnarök · Turn plan", detail: "Agree on a chapter or checkpoint for hand-offs, especially before longer story encounters." },
  14: { title: "Spider-Man 2 · Play plan", detail: "Choose a mission or character to start with, then swap at the next mission break." },
  15: { title: "Ghost of Tsushima · Play plan", detail: "Pick a tale or activity, and hand over at a checkpoint so everyone gets time in the world." },
  16: { title: "NFS Heat · Race setup", detail: "Pick a car and event, then alternate drivers between races or after each run." },
  17: { title: "Hot Pursuit · Race setup", detail: "Choose racer or cop, set the event, and switch roles for the next pursuit." },
  18: { title: "F1 25 · Grand Prix setup", detail: "Choose a circuit and race distance before lights out; rotate drivers between events." },
  19: { title: "Asphalt · Race setup", detail: "Select a car and event together, then take turns chasing the next clean finish." },
  20: { title: "The Crew 2 · Event setup", detail: "Choose a vehicle discipline and event, then switch drivers when the next event begins." },
  21: { title: "Beach Buggy Racing 2 · Race setup", detail: "Pick a track and kart, agree on the power-up rules, and swap drivers after each race." },
  22: { title: "Speedstorm · Race setup", detail: "Choose racers and a track before the start, then rotate drivers between races." },
  23: { title: "Road Redemption · Race setup", detail: "Choose a route and race together; pass the controller between events or at a safe stop." },
  24: { title: "FC 27 · Match setup", detail: "Choose your teams, match length, and sides before kickoff; switch controllers between fixtures." },
  25: { title: "FC 26 · Match setup", detail: "Choose your teams and half length before kickoff, then take turns playing each fixture." },
  26: { title: "Cricket 24 · Match setup", detail: "Choose teams and match format before the toss; swap batting and bowling turns by innings." },
  27: { title: "Cricket 26 · Match setup", detail: "Set the teams and overs before play starts, then agree who bats and bowls each innings." },
  28: { title: "WWE 2K25 · Match setup", detail: "Choose superstars and match rules before the bell, then trade turns between bouts." },
  29: { title: "Rocket League · Match setup", detail: "Choose 1v1 or team play and set the match length before kickoff." },
  30: { title: "NBA 2K25 · Match setup", detail: "Pick your teams and quarter length before tip-off, then switch sides for the next game." },
  31: { title: "TopSpin 2K25 · Match setup", detail: "Choose your players and set length, then alternate serves and switch ends as you play." },
  32: { title: "Tekken 8 · 1v1 bout", detail: "Pick your fighters and agree on the number of rounds; swap controllers after each match." },
  33: { title: "Mortal Kombat 1 · 1v1 bout", detail: "Choose fighters and a round count, then take turns between each head-to-head bout." },
  34: { title: "UFC 5 · 1v1 bout", detail: "Choose fighters and bout length before the walkout, then switch controllers after each fight." },
  35: { title: "Red Dead Redemption 2 · Play plan", detail: "Choose a story chapter or free-roam activity, and hand over at the next checkpoint." },
  36: { title: "Far Cry 6 · Mission plan", detail: "Agree on a mission and loadout before heading out; take turns at the next checkpoint." },
  38: { title: "Stray · Chapter plan", detail: "Pick a chapter and pass the controller at a checkpoint or puzzle so everyone can explore." },
  39: { title: "Riders Republic · Event setup", detail: "Choose a sport and event first, then rotate riders between events." },
  40: { title: "Minecraft Legends · Play plan", detail: "Choose a campaign objective and take turns leading the next defense or expedition." },
  41: { title: "GTA VI · Coming soon", detail: "This game is not available for sessions yet. We’ll update this page when its status changes." },
  42: { title: "Modern Warfare III · Squad setup", detail: "Choose a mode and map, agree on team roles, and rotate players between matches." },
  43: { title: "Epic Mickey · Chapter plan", detail: "Choose an area to explore and hand over at the next objective or checkpoint." },
  44: { title: "WWE 2K26 · Match setup", detail: "Choose superstars and match rules before the bell, then take turns between bouts." },
};

function getSessionTip(game: Game): SessionTip {
  const tip = sessionTips[game.id];
  if (tip) return tip;
  return {
    title: `${game.title} · Session tip`,
    detail: game.playerType.includes("MULTIPLAYER")
      ? `Choose a mode and team setup for ${game.title} together before starting.`
      : `Choose a mission and session length for ${game.title}, and agree on a checkpoint for hand-offs.`,
  };
}

function DailyPopularRail({ currentGame }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dailyGames = useMemo(() => {
    const candidates = games.filter((candidate) => candidate.id !== currentGame.id && candidate.status !== "unavailable");
    if (!candidates.length) return [];
    const day = Math.floor(Date.now() / 86_400_000);
    const offset = (day * 6) % candidates.length;
    return Array.from({ length: Math.min(6, candidates.length) }, (_, index) => candidates[(offset + index) % candidates.length]);
  }, [currentGame.id]);

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".game-card-link");
    track.scrollBy({ left: direction * (card ? card.getBoundingClientRect().width + 18 : track.clientWidth * .8), behavior: "smooth" });
  };

  if (!dailyGames.length) return null;
  return (
    <section className="game-popular" aria-labelledby="game-popular-title">
      <header className="game-detail-section-heading">
        <div><p className="game-detail__eyebrow">Fresh every day</p><h2 id="game-popular-title">Popular in the game zone</h2></div>
        <span>Today’s picks from the library</span>
      </header>
      <div className="game-popular__rail">
        <button type="button" className="game-popular__arrow game-popular__arrow--left" onClick={() => scroll(-1)} aria-label="Show previous popular games"><FiChevronLeft aria-hidden="true" /></button>
        <div className="game-popular__track" ref={trackRef} aria-label="Popular games, refreshed daily">
          {dailyGames.map((popularGame) => <GameCard key={popularGame.id} game={popularGame} />)}
        </div>
        <button type="button" className="game-popular__arrow game-popular__arrow--right" onClick={() => scroll(1)} aria-label="Show more popular games"><FiChevronRight aria-hidden="true" /></button>
      </div>
    </section>
  );
}

function GameTrailer({ game }: Props) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const syncFullscreen = () => {
      const active = document.fullscreenElement === trailerRef.current;
      setFullscreen(active);
      if (!active) {
        setStarted(false);
        setPlaying(false);
      }
    };
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const priorBodyOverflow = document.body.style.overflow;
    const priorRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const closeFallbackFullscreen = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener("keydown", closeFallbackFullscreen);
    return () => {
      document.body.style.overflow = priorBodyOverflow;
      document.documentElement.style.overflow = priorRootOverflow;
      document.removeEventListener("keydown", closeFallbackFullscreen);
    };
  }, [fullscreen]);

  useEffect(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (!fullscreen || !playing) {
      setControlsVisible(true);
      return;
    }
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [fullscreen, playing]);

  const sendPlayerCommand = (func: "playVideo" | "pauseVideo" | "mute" | "unMute") => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube-nocookie.com",
    );
  };

  const revealControls = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (fullscreen && playing) hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
  };

  const startTrailer = () => {
    const request = trailerRef.current?.requestFullscreen?.();
    setStarted(true);
    setPlaying(true);
    setFullscreen(true);
    setControlsVisible(true);
    void request?.catch(() => {
      // The fixed-position player remains fullscreen when the browser blocks
      // the native Fullscreen API (common on some mobile browsers).
    });
  };

  const closeTrailer = () => {
    sendPlayerCommand("pauseVideo");
    setPlaying(false);
    setStarted(false);
    setFullscreen(false);
    if (document.fullscreenElement === trailerRef.current) {
      void document.exitFullscreen().catch(() => undefined);
    }
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    sendPlayerCommand(nextMuted ? "mute" : "unMute");
    setMuted(nextMuted);
  };

  const togglePlayback = () => {
    if (!started) {
      startTrailer();
      return;
    }
    const nextPlaying = !playing;
    sendPlayerCommand(nextPlaying ? "playVideo" : "pauseVideo");
    setPlaying(nextPlaying);
    revealControls();
  };

  if (!game.video) return <p className="game-detail__no-trailer">A trailer is not available for this title yet.</p>;

  if (game.video.type === "youtube") {
    const origin = typeof window === "undefined" ? "https://rdgamezone.com" : window.location.origin;
    return (
      <>
        <button type="button" className="game-detail__primary game-detail__watch" onClick={startTrailer} aria-label={`Watch trailer for ${game.title} in fullscreen`}>
          <FiPlay aria-hidden="true" /> Watch trailer
        </button>
        <div
          ref={trailerRef}
          className={`game-trailer game-trailer--portal${started ? " game-trailer--fullscreen" : " game-trailer--closed"}${fullscreen && !controlsVisible ? " game-trailer--controls-hidden" : ""}`}
          onPointerMove={revealControls}
          onTouchStart={revealControls}
        >
          {started && <>
            <iframe
              ref={frameRef}
              src={`https://www.youtube-nocookie.com/embed/${game.video.id}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
              title={`${game.title} trailer`}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
            <div className="game-trailer__link-guard" aria-hidden="true" />
            <div className="game-trailer__hud" onPointerEnter={revealControls}>
              <div className="game-trailer__hud-top">
                <span>{game.title}</span>
                <button type="button" className="game-trailer__close" onClick={closeTrailer} aria-label="Close trailer and return to game details"><FiX aria-hidden="true" /></button>
              </div>
              <div className="game-trailer__hud-bottom">
                <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause trailer" : "Play trailer"}>
                  {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
                </button>
                <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute trailer" : "Mute trailer"}>
                  {muted ? <FiVolumeX aria-hidden="true" /> : <FiVolume2 aria-hidden="true" />}
                </button>
                <span className="game-trailer__hud-label">Official trailer</span>
              </div>
            </div>
          </>}
        </div>
      </>
    );
  }

  if (game.video.type === "mp4" || game.video.type === "webm") {
    return <div className="game-trailer"><video src={game.video.src} controls playsInline controlsList="nodownload noremoteplayback" /></div>;
  }

  return <div className="game-trailer"><iframe src={`https://drive.google.com/file/d/${game.video.id}/preview`} title={`${game.title} trailer`} allow="autoplay; fullscreen" allowFullScreen sandbox="allow-scripts allow-same-origin allow-presentation" /></div>;
}

function getRelevantGuidelines(game: Game) {
  const find = (title: string) => guidelines.find((guideline) => guideline.title === title)!;
  const relevant = [find("Age & entry"), find("Zero tolerance"), find("Time & session")];
  if (game.adult) relevant.push(find("Content guidelines"));
  return relevant;
}

function GamePolicy({ game }: Props) {
  const title = game.id === 2 || game.id === 41;
  const relevant = getRelevantGuidelines(game);
  return (
    <section className="game-policy" aria-labelledby="game-policy-title">
      <header className="game-policy__heading">
        <p className="game-detail__eyebrow">RD Game Zone rules</p>
        <h2 id="game-policy-title">Before you play</h2>
        <a href="/guidelines">Read all guidelines <FiArrowUpRight aria-hidden="true" /></a>
      </header>
      <div className="game-policy__grid">
        {relevant.map((rule) => {
          const Icon = rule.icon;
          return (
            <article key={rule.title}>
              <Icon aria-hidden="true" />
              <div><h3>{rule.title}</h3><p>{rule.subtitle}</p></div>
              <ul>{rule.points.slice(0, game.adult ? 3 : 2).map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          );
        })}
        {title && (
          <article className="game-policy__special">
            <FiAlertTriangle aria-hidden="true" />
            <div><h3>{game.id === 41 ? "GTA VI · coming soon" : "GTA Online content policy"}</h3><p>{game.id === 41 ? "Final session guidance will be confirmed before this title becomes available." : "Content warning · restricted locations"}</p></div>
            <p>{game.id === 41 ? "RD's GTA title content rules will apply at launch: adult-themed environments and bar-style locations are restricted. Violations may end the session without refund." : gtaOnlinePolicyText}</p>
          </article>
        )}
      </div>
    </section>
  );
}

type GalleryItem = { src: string; alt: string; label: string; thumbSrc?: string };

function GameScreenshotGallery({ game, selected, onSelect }: Props & {
  selected: string;
  onSelect: (src: string) => void;
}) {
  const screenshots: GalleryItem[] = [
    {
      src: game.image,
      thumbSrc: game.id === 24 ? "/images/screenshots/thumbs/fc27-keyart.webp" : undefined,
      alt: `${game.title} key artwork`,
      label: "Key art",
    },
    ...(game.screenshots ?? []).map((screenshot, index) => ({
      ...screenshot,
      label: `Screenshot ${index + 1}`,
    })),
  ];

  return (
    <section className="game-screenshots" aria-label={`${game.title} artwork and screenshots`}>
      <div className="game-screenshots__thumbs" role="group" aria-label={`Choose ${game.title} artwork or screenshot`}>
        {screenshots.map((screenshot) => (
          <button
            key={screenshot.src}
            className={`game-screenshots__thumb${selected === screenshot.src ? " is-selected" : ""}`}
            type="button"
            onClick={() => onSelect(screenshot.src)}
            aria-label={`Show ${screenshot.label}: ${screenshot.alt}`}
            aria-pressed={selected === screenshot.src}
          >
            <img src={screenshot.thumbSrc ?? screenshot.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default function GameDetailPage({ game }: Props) {
  const [selectedArtwork, setSelectedArtwork] = useState(game.image);
  const description = editorialDescriptions[game.id] ?? game.subtitle;
  const sessionTip = getSessionTip(game);

  useEffect(() => setSelectedArtwork(game.image), [game.id, game.image]);

  return (
    <main className="game-detail-page">
      <div className="game-detail-shell">
        <section className="game-detail-hero" aria-labelledby="game-detail-title">
          <Link to="/games" className="game-detail__back" aria-label="Back to all games" title="Back to all games"><FiArrowLeft aria-hidden="true" /></Link>
          <div className={`game-detail-hero__art${game.id === 32 ? " game-detail-hero__art--tekken" : ""}`}>
            <picture>
              {game.id === 24 && selectedArtwork === game.image && (
                <source
                  media="(max-width: 700px) and (orientation: portrait)"
                  srcSet="/images/fc-27-mobile-480.webp 480w, /images/fc-27-mobile.webp 640w"
                  sizes="100vw"
                  type="image/webp"
                />
              )}
              {game.id === 24 && selectedArtwork === game.image && (
                <source srcSet="/images/fc-27-optimized.avif" type="image/avif" />
              )}
              <img src={selectedArtwork} alt={`${game.title} artwork`} fetchpriority="high" decoding="async" />
            </picture>
          </div>
          <div className="game-detail-hero__copy">
            <p className="game-detail__eyebrow">RD GAME ZONE · {game.category}</p>
            <h1 id="game-detail-title">{game.title}</h1>
            <p className="game-detail__description">{description}</p>
            <div className="game-detail__meta">
              <span className={`game-detail__status game-detail__status--${game.status}`}><i aria-hidden="true" />{statusLabels[game.status]}</span>
              <div className="game-detail__platforms" aria-label={`Platforms available at RD Game Zone: ${game.platforms.join(", ")}`}>
                {game.platforms.map((platform) => <span className={`game-platform-mark game-platform-mark--${platform.toLowerCase()}`} key={platform}>
                  {platform === "PC" ? <FaDesktop aria-hidden="true" /> : <FaPlaystation aria-hidden="true" />}
                  <strong>{platform}</strong>
                </span>)}
              </div>
            </div>
            <div className="game-detail__actions">
              <GameTrailer game={game} />
            </div>
          </div>
        </section>

        <GameScreenshotGallery game={game} selected={selectedArtwork} onSelect={setSelectedArtwork} />

        <DeferredContent className="game-detail-deferred game-detail-deferred--info" placeholderHeight="12rem">
          <section className="game-detail-info" aria-label={`${game.title} session details`}>
            <article><span className="game-detail-info__label">Genre</span><strong>{game.category}</strong></article>
            <article><span className="game-detail-info__label">Session type</span><strong>{game.playerType}</strong></article>
            <article><span className="game-detail-info__label">Platforms here</span><strong>{game.platforms.join(" · ")}</strong></article>
            <article><span className="game-detail-info__label">{sessionTip.title}</span><strong>{sessionTip.detail}</strong></article>
          </section>
        </DeferredContent>
        <DeferredContent className="game-detail-deferred game-detail-deferred--policy" placeholderHeight="28rem">
          <GamePolicy game={game} />
          <p className="game-detail__fineprint">Ask our team to confirm this game and platform are ready before you book. Please follow the age and play rules listed on this page during your session.</p>
        </DeferredContent>
        <DeferredContent className="game-detail-deferred game-detail-deferred--popular" placeholderHeight="26rem">
          <DailyPopularRail currentGame={game} />
        </DeferredContent>
      </div>
    </main>
  );
}
