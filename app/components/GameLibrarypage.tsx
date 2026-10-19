import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, WheelEvent } from "react";
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiSearch, FiX } from "react-icons/fi";
import GameCard from "./GameCard";
import { gameSlug, games } from "../data/games";

const CATEGORIES = [
  "ALL",
  "SHOOTING",
  "ACTION",
  "RACING",
  "SPORTS",
  "FIGHTING",
  "ADVENTURE",
  "OPEN WORLD",
] as const;

const STATUSES = ["ALL", "AVAILABLE", "UPCOMING", "UNAVAILABLE"] as const;
const TOP_TEN_IDS = [2, 24, 42, 3, 4, 19, 27, 44, 32, 33];
const GAME_LANES = [
  ["Shooters", "SHOOTING"],
  ["Action", "ACTION"],
  ["Racing", "RACING"],
  ["Sports", "SPORTS"],
  ["Fighting", "FIGHTING"],
  ["Adventure", "ADVENTURE"],
  ["Open world", "OPEN WORLD"],
] as const;

type Category = (typeof CATEGORIES)[number];
type Status = (typeof STATUSES)[number];

function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Game Library — RD Game Zone Ahmedabad",
    description:
      "Browse the PS5, PS4 and PC games available at RD Game Zone, Ahmedabad.",
    url: "https://rdgamezone.com/games",
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: game.title,
      url: `https://rdgamezone.com/games/${gameSlug(game.title)}`,
    })),
  };
}

export default function GameLibraryPage() {
  const [category, setCategory] = useState<Category>("ALL");
  const [status, setStatus] = useState<Status>("ALL");
  const [search, setSearch] = useState("");
  const rankedTrackRef = useRef<HTMLDivElement>(null);
  const rankedDragRef = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesCategory = category === "ALL" || game.category.toUpperCase() === category;
      const matchesStatus = status === "ALL" || game.status.toUpperCase() === status;
      const matchesSearch = !query || game.title.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [category, search, status]);

  const hasFilters = category !== "ALL" || status !== "ALL" || Boolean(search);
  const emptyState = useMemo(() => {
    const query = search.trim();

    if (status === "UNAVAILABLE" && category === "ALL" && !query) {
      return {
        eyebrow: "Game zone status",
        heading: "All clear",
        title: "Everything is ready to play.",
        body: "No titles are marked unavailable right now. Explore the live library and choose your next session.",
        action: "View all games",
        kind: "ready" as const,
      };
    }

    if (query) {
      return {
        eyebrow: "Search results",
        heading: "No match yet",
        title: `Nothing matched “${query}”.`,
        body: "Try a shorter game title, or clear the filters to browse the full RD Game Zone lineup.",
        action: "Clear search and filters",
        kind: "search" as const,
      };
    }

    return {
      eyebrow: "Collection update",
      heading: "Nothing here yet",
      title: "This collection is waiting for its next title.",
      body: "Adjust a filter or return to the full game library to see every currently listed game.",
      action: "Show all games",
      kind: "search" as const,
    };
  }, [category, search, status]);

  const clearFilters = () => {
    setCategory("ALL");
    setStatus("ALL");
    setSearch("");
  };

  const selectAvailability = (nextStatus: Status) => {
    /* “Coming soon” is a dedicated collection. Resetting other filters keeps
       GTA VI discoverable instead of silently intersecting it with a stale
       genre or search selection. */
    if (nextStatus === "UPCOMING") {
      setCategory("ALL");
      setSearch("");
    }
    setStatus(nextStatus);
  };

  const startRankedDrag = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    rankedDragRef.current = {
      dragging: true,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
  };

  const moveRankedDrag = (event: MouseEvent<HTMLDivElement>) => {
    const drag = rankedDragRef.current;
    if (!drag.dragging) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) drag.moved = true;
    if (drag.moved) event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishRankedDrag = () => {
    rankedDragRef.current.dragging = false;
  };

  const scrollRankedByKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const card = event.currentTarget.querySelector<HTMLElement>(".game-card-link--ranked");
    const distance = card ? card.getBoundingClientRect().width + 16 : event.currentTarget.clientWidth * 0.8;
    event.currentTarget.scrollLeft += event.key === "ArrowRight" ? distance : -distance;
  };

  const scrollRanked = (direction: -1 | 1) => {
    const track = rankedTrackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".game-card-link--ranked");
    const distance = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const scrollRankedWithWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  };

  const suppressDraggedClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!rankedDragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    rankedDragRef.current.moved = false;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
      />

      <main className="game-library-page" aria-label="Game library">
        <div className="library-shell">
          <header className="library-header">
            <p className="library-eyebrow">RD GAME ZONE · AHMEDABAD</p>
            <div className="library-heading-row">
              <div>
                <h1 className="library-title">Game library</h1>
                <p className="library-intro">
                  Find your next game. Open any artwork for its trailer, platform, and session details.
                </p>
              </div>
            </div>
          </header>

          <section className="library-filters" aria-label="Filter the game library">
            <div className="library-filter-group">
              <span className="library-filter-label">Genre</span>
              <div className="filter-chip-row" role="group" aria-label="Filter by genre">
                {CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`filter-chip ${category === item ? "filter-chip--active" : ""}`}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                  >
                    {item === "ALL" ? "All games" : item}
                  </button>
                ))}
              </div>
            </div>

            <div className="library-filter-bottom">
              <div className="library-filter-group library-filter-group--availability">
                <span className="library-filter-label">Availability</span>
                <div className="availability-tabs" role="group" aria-label="Filter by availability">
                  {STATUSES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`availability-tab ${status === item ? "availability-tab--active" : ""}`}
                      onClick={() => selectAvailability(item)}
                      aria-pressed={status === item}
                    >
                      {item === "ALL"
                        ? "All"
                        : item === "UPCOMING"
                          ? "Coming soon"
                          : item.charAt(0) + item.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <label className="library-search">
                <FiSearch aria-hidden="true" />
                <span className="sr-only">Search games</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search a game"
                  autoComplete="off"
                  spellCheck={false}
                />
                {search && (
                  <button
                    type="button"
                    className="library-search__clear"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <FiX aria-hidden="true" />
                  </button>
                )}
              </label>
            </div>
          </section>

          <section className="library-results" id="library-results" aria-labelledby="library-results-title">
            <div className="library-results__heading">
              <div>
                <p className="library-results__eyebrow">RD Game Zone · Game library</p>
                <h2 id="library-results-title">{hasFilters ? "Matching games" : "Choose your next game"}</h2>
                {filteredGames.length > 0 && (
                  <p className="library-results__collection-copy">
                    {hasFilters ? "Open a title for its details and embedded trailer." : "Browse featured picks or explore the full collection by genre."}
                  </p>
                )}
                {filteredGames.length === 0 && (
                  <p className="library-results__collection-copy">
                    {emptyState.eyebrow}
                  </p>
                )}
              </div>

              {hasFilters && (
                <button type="button" className="reset-filters" onClick={clearFilters}>
                  <FiX aria-hidden="true" />
                  Clear filters
                </button>
              )}
            </div>

            {!hasFilters ? (
              <div className="library-lanes">
                <section className="library-lane" aria-labelledby="library-top-ten-title">
                  <div className="library-lane__heading">
                    <div><h3 id="library-top-ten-title">Top 10 at RD Game Zone</h3></div>
                  </div>
                  <div className="library-lane__carousel">
                    <button type="button" className="library-carousel-arrow library-carousel-arrow--left" onClick={() => scrollRanked(-1)} aria-label="Show previous top games"><FiChevronLeft aria-hidden="true" /></button>
                    <div
                      ref={rankedTrackRef}
                      className="library-lane__track library-lane__track--top-ten"
                      role="region"
                      aria-label="Top 10 games. Drag to browse, or use the left and right arrow keys."
                      tabIndex={0}
                      onMouseDown={startRankedDrag}
                      onMouseMove={moveRankedDrag}
                      onMouseUp={finishRankedDrag}
                      onMouseLeave={finishRankedDrag}
                      onClickCapture={suppressDraggedClick}
                      onKeyDown={scrollRankedByKey}
                      onWheel={scrollRankedWithWheel}
                    >
                      {TOP_TEN_IDS.map((id, index) => {
                        const game = games.find((candidate) => candidate.id === id);
                        return game ? <GameCard key={game.id} game={game} rank={index + 1} /> : null;
                      })}
                    </div>
                    <button type="button" className="library-carousel-arrow library-carousel-arrow--right" onClick={() => scrollRanked(1)} aria-label="Show more top games"><FiChevronRight aria-hidden="true" /></button>
                  </div>
                </section>

                {GAME_LANES.map(([title, laneCategory]) => {
                  const laneGames = games.filter((game) => game.category === laneCategory);
                  if (!laneGames.length) return null;
                  return (
                    <section className="library-lane" key={laneCategory} aria-labelledby={`lane-${gameSlug(title)}`}>
                      <div className="library-lane__heading">
                        <div><p className="library-results__eyebrow">Browse by genre</p><h3 id={`lane-${gameSlug(title)}`}>{title}</h3></div>
                      </div>
                      <div className="library-lane__track">
                        {laneGames.map((game) => <GameCard key={game.id} game={game} />)}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="game-grid" aria-label={`${filteredGames.length} matching games`} aria-live="polite">
                {filteredGames.map((game, index) => (
                  <article key={game.id} itemScope itemType="https://schema.org/VideoGame">
                    <meta itemProp="name" content={game.title} />
                    <meta itemProp="description" content={game.subtitle} />
                    <meta itemProp="position" content={String(index + 1)} />
                    <GameCard game={game} />
                  </article>
                ))}
              </div>
            ) : (
              <div className={`library-empty library-empty--${emptyState.kind}`} role="status" aria-live="polite">
                <span className="library-empty__icon" aria-hidden="true">
                  {emptyState.kind === "ready" ? <FiCheckCircle /> : <FiSearch />}
                </span>
                <div className="library-empty__copy">
                  <p className="library-empty__eyebrow">{emptyState.eyebrow}</p>
                  <h3>{emptyState.title}</h3>
                  <p>{emptyState.body}</p>
                </div>
                <button type="button" className="library-empty__action" onClick={clearFilters}>
                  {emptyState.action}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

    </>
  );
}
