import { Link } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FaDesktop, FaPlaystation } from "react-icons/fa";
import { FiAlertTriangle, FiArrowLeft, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiPause, FiPlay, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import GameCard from "./GameCard";
import type { Game } from "./types";
import { gameSlug, games } from "../data/games";
import { guidelines } from "./GameGuidelines";
import { gtaOnlinePolicyText } from "./GTAOnlinePolicy";
import { GameAbout, GameSpotlight } from "./GameDetailExperience";
import { getResponsiveArtwork } from "../data/game-artwork";

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
  45: "Discover Japan in Forza Horizon 6, an open-world racing adventure built around a huge Horizon Festival, scenic mountain roads, and high-speed city runs. Its PS5 release is scheduled for January 26, 2027, and the game is marked as coming soon at RD Game Zone.",
  46: "Take a road trip through The Crew Motorfest, an open-world festival celebrating cars and driving culture. Build your collection, explore the island, and take on a changing lineup of races and playlists.",
  47: "Journey into Pandora's Western Frontier in Avatar: Frontiers of Pandora. Explore a vibrant alien world, discover your Na'vi heritage, and push back against the RDA on your own or with a friend.",
  48: "Call of Duty: Modern Warfare 4 is playable on PS5 through campaign early access. The full launch adds Multiplayer and DMZ, with the PlayStation Store listing the full release for October 23, 2026.",
  49: "Climb, leap, and fight your way through Villedor in Dying Light 2: Stay Human. Explore the city by day, face its dangers after dark, and team up for co-op missions and challenges.",
  50: "Enter the lawless frontier in Hunt: Showdown 1896, where rival hunter teams track dangerous targets through a hostile world. Stay alert, work together, and decide when to push for the bounty or make your escape.",
  51: "Join Cody and May for a playful adventure built entirely around cooperation. Every chapter brings new abilities and surprising challenges, so communication and teamwork are the key to making it through together.",
  52: "Find your line in San Vansterdam in skate., an evolving skateboarding world for exploring spots, landing tricks, and linking up with other skaters online.",
  53: "Travel through a haunting land inspired by late Ming-dynasty China in WUCHANG: Fallen Feathers. Master fast, deliberate combat and uncover the truth behind a mysterious affliction.",
  54: "Fight through the hive city of Tertium in Warhammer 40,000: Darktide. Balance ranged and melee combat, build your character, and rely on your strike team to survive the Inquisition's missions.",
  55: "Join Task Force One in Call of Duty: Vanguard and fight across four major theaters of World War II. Choose your role, take on the campaign, or coordinate with friends in multiplayer.",
};

const statusLabels = {
  available: "Available at RD Game Zone",
  upcoming: "Coming soon",
  unavailable: "Currently unavailable",
} as const;

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

function DailyPopularRail({ currentGame }: { currentGame: Game }) {
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
    const origin = typeof window === "undefined" ? "https://rd-game-zone.pages.dev" : window.location.origin;
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

  if ("id" in game.video) {
    return <div className="game-trailer"><iframe src={`https://drive.google.com/file/d/${game.video.id}/preview`} title={`${game.title} trailer`} allow="autoplay; fullscreen" allowFullScreen sandbox="allow-scripts allow-same-origin allow-presentation" /></div>;
  }

  return <p className="game-detail__no-trailer">A trailer is not available for this title yet.</p>;
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
const keyArtThumbnails: Record<number, string> = {
  3: "/images/cards/320/valorant.avif",
  24: "/images/screenshots/thumbs/fc27-keyart.webp",
  33: "/images/screenshots/thumbs/mortal-kombat-1-key-art.webp",
  45: "/images/screenshots/thumbs/forza-horizon-6-key-art.webp",
  48: "/images/cards/320/call-of-duty-modern-warfare-4.avif",
};

function GameScreenshotGallery({ game, selected, onSelect }: Props & {
  selected: string;
  onSelect: (src: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const screenshots: GalleryItem[] = [
    {
      src: game.image,
      thumbSrc: keyArtThumbnails[game.id],
      alt: `${game.title} key artwork`,
      label: "Key art",
    },
    ...(game.screenshots ?? []).map((screenshot, index) => ({
      ...screenshot,
      label: `Screenshot ${index + 1}`,
    })),
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollState = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      setHasOverflow(maxScroll > 2);
      setCanScrollLeft(track.scrollLeft > 2);
      setCanScrollRight(maxScroll - track.scrollLeft > 2);
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateScrollState) : null;
    observer?.observe(track);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer?.disconnect();
    };
  }, [screenshots.length]);

  const scrollScreenshots = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.82,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const galleryId = `game-screenshots-${game.id}`;

  return (
    <section className="game-screenshots" aria-label={`${game.title} artwork and screenshots`}>
      <div className="game-screenshots__rail">
        <button
          type="button"
          className="game-screenshots__nav game-screenshots__nav--left"
          onClick={() => scrollScreenshots(-1)}
          disabled={!canScrollLeft}
          hidden={!hasOverflow}
          aria-label={`Show previous ${game.title} screenshots`}
          aria-controls={galleryId}
        >
          <FiChevronLeft aria-hidden="true" />
        </button>
        <div
          ref={trackRef}
          id={galleryId}
          className="game-screenshots__thumbs"
          role="region"
          tabIndex={0}
          aria-label={`Choose ${game.title} artwork or screenshot`}
        >
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
        <button
          type="button"
          className="game-screenshots__nav game-screenshots__nav--right"
          onClick={() => scrollScreenshots(1)}
          disabled={!canScrollRight}
          hidden={!hasOverflow}
          aria-label={`Show more ${game.title} screenshots`}
          aria-controls={galleryId}
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default function GameDetailPage({ game }: Props) {
  const [selectedArtwork, setSelectedArtwork] = useState(game.image);
  const description = editorialDescriptions[game.id] ?? game.subtitle;
  const isForzaDefaultArtwork = game.id === 45 && selectedArtwork === game.image;
  const isDefaultArtwork = selectedArtwork === game.image;
  const responsiveArtwork = getResponsiveArtwork(game.image);

  useEffect(() => setSelectedArtwork(game.image), [game.id, game.image]);

  return (
    <main className="game-detail-page">
      <div className="game-detail-shell">
        <section className="game-detail-hero" aria-labelledby="game-detail-title">
          <Link to="/games" className="game-detail__back" aria-label="Back to all games" title="Back to all games"><FiArrowLeft aria-hidden="true" /></Link>
          <div className={`game-detail-hero__art${game.id === 32 ? " game-detail-hero__art--tekken" : ""}`}>
            <picture>
              {game.id === 3 && selectedArtwork === game.image && (
                <source
                  media="(max-width: 700px)"
                  srcSet="/images/cards/320/valorant.avif 320w, /images/cards/valorant.avif 640w"
                  sizes="100vw"
                  type="image/avif"
                />
              )}
              {game.id === 2 && selectedArtwork === game.image && (
                <source
                  srcSet="/images/gta-online-hero-480.avif 480w, /images/gta-online-hero-900.avif 900w"
                  sizes="100vw"
                  type="image/avif"
                />
              )}
              {game.id === 24 && selectedArtwork === game.image && (
                <source
                  media="(max-width: 700px) and (orientation: portrait)"
                  srcSet="/images/fc-27-mobile-480.avif 480w, /images/fc-27-mobile-640.avif 640w"
                  sizes="100vw"
                  type="image/avif"
                />
              )}
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
              <img
                src={isForzaDefaultArtwork ? "/images/forza-horizon-6-800.webp" : isDefaultArtwork ? responsiveArtwork.src : selectedArtwork}
                srcSet={isDefaultArtwork
                  ? isForzaDefaultArtwork
                    ? "/images/forza-horizon-6-480.webp 480w, /images/forza-horizon-6-800.webp 800w, /images/forza-horizon-6-1280.webp 1280w, /images/forza-horizon-6-optimized.webp 1920w"
                    : responsiveArtwork.srcSet
                  : undefined}
                sizes={isDefaultArtwork ? "(max-width: 1480px) 100vw, 1480px" : undefined}
                alt={`${game.title} artwork`}
                decoding="sync"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="game-detail-hero__copy">
            <p className="game-detail__eyebrow">RD GAME ZONE · {game.category}</p>
            <h1 id="game-detail-title">{game.title}</h1>
            <p className="game-detail__description">{game.subtitle}</p>
            <div className="game-detail__meta">
              <span className={`game-detail__status game-detail__status--${game.status}`}><i aria-hidden="true" />{statusLabels[game.status]}</span>
              <div className="game-detail__platforms" aria-label={`Game platforms: ${game.platforms.join(", ")}`}>
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

        <DeferredContent className="game-detail-deferred game-detail-deferred--about" placeholderHeight="18rem">
          <GameAbout game={game} description={description} />
        </DeferredContent>
        <GameSpotlight game={game} />
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
