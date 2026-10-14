import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiFolder, FiSearch, FiX } from "react-icons/fi";
import GameCard from "./GameCard";
import type { Game } from "./types";
import { games } from "../data/games";

const VideoModal = lazy(() => import("./VideoModal"));

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
const PAGE_SIZE = 10;

type Category = (typeof CATEGORIES)[number];
type Status = (typeof STATUSES)[number];

type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  onChange: (nextPage: number) => void;
};

function Pagination({
  page,
  totalPages,
  totalItems,
  onChange,
}: PaginationProps) {
  if (totalItems === 0) return null;
  const itemsOnPage = Math.min(PAGE_SIZE, totalItems - (page - 1) * PAGE_SIZE);

  return (
    <nav className="library-pagination" aria-label="Game library pages">
      <p className="library-pagination__summary" aria-live="polite">
        <FiFolder aria-hidden="true" />
        <span>Collection <strong>{page}</strong></span>
        <small>{itemsOnPage} {itemsOnPage === 1 ? "game" : "games"}</small>
      </p>

      <div className="library-pagination__controls">
        <button
          type="button"
          className="pagination-button pagination-button--previous"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Show previous page"
        >
          <FiArrowLeft aria-hidden="true" />
          <span>Previous</span>
        </button>

        <div className="pagination-pages" aria-label={`Page ${page} of ${totalPages}`}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
            const start = (pageNumber - 1) * PAGE_SIZE + 1;
            const end = Math.min(pageNumber * PAGE_SIZE, totalItems);
            const isCurrent = pageNumber === page;
            return (
              <button
                key={pageNumber}
                type="button"
                className={`pagination-page ${isCurrent ? "pagination-page--active" : ""}`}
                onClick={() => onChange(pageNumber)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Show page ${pageNumber}, games ${start} to ${end}`}
              >
                <span className="pagination-page__label">{pageNumber}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pagination-button pagination-button--next"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Show next page"
        >
          <span>Next</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

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
      url: `https://rdgamezone.com/games#${game.id}`,
    })),
  };
}

export default function GameLibraryPage() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [category, setCategory] = useState<Category>("ALL");
  const [status, setStatus] = useState<Status>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredGames = useMemo(() => {
    const query = search.trim().toLowerCase();

    return games.filter((game) => {
      const matchesCategory = category === "ALL" || game.category.toUpperCase() === category;
      const matchesStatus = status === "ALL" || game.status.toUpperCase() === status;
      const matchesSearch = !query || game.title.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [category, search, status]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleGames = filteredGames.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = filteredGames.length ? startIndex + 1 : 0;
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filteredGames.length);
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

  useEffect(() => {
    setPage(1);
  }, [category, status, search]);

  const goToPage = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    if (safePage === currentPage) return;

    setPage(safePage);
    window.requestAnimationFrame(() => {
      document.getElementById("library-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

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
                  Explore the full RD Game Zone lineup, check availability, and watch a trailer before your visit.
                </p>
              </div>
              <div className="library-total" aria-label={`${games.length} games in the library`}>
                <strong>{games.length}</strong>
                <span>games</span>
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
                <h2 id="library-results-title">
                  {filteredGames.length === 1
                    ? "1 game"
                    : filteredGames.length > 1
                      ? `Games ${String(rangeStart).padStart(2, "0")}–${String(rangeEnd).padStart(2, "0")}`
                      : emptyState.heading}
                </h2>
                {filteredGames.length > 0 && (
                  <p className="library-results__collection-copy">
                    {visibleGames.length} {visibleGames.length === 1 ? "game" : "games"} ready to explore in this collection.
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

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={filteredGames.length}
              onChange={goToPage}
            />

            {visibleGames.length > 0 ? (
              <div
                className="game-grid"
                aria-label={`Showing games ${rangeStart} to ${rangeEnd} of ${filteredGames.length}`}
                aria-live="polite"
              >
                {visibleGames.map((game, index) => {
                  const catalogPosition = startIndex + index + 1;

                  return (
                    <article
                      key={game.id}
                      id={String(game.id)}
                      itemScope
                      itemType="https://schema.org/VideoGame"
                    >
                      <meta itemProp="name" content={game.title} />
                      <meta itemProp="description" content={game.subtitle} />
                      <meta itemProp="position" content={String(catalogPosition)} />
                      <GameCard
                        game={game}
                        onPlay={() => game.video && setActiveGame(game)}
                      />
                    </article>
                  );
                })}
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

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={filteredGames.length}
              onChange={goToPage}
            />
          </section>
        </div>
      </main>

      {activeGame?.video && (
        <Suspense fallback={null}>
          <VideoModal
            video={activeGame.video}
            game={activeGame}
            onClose={() => setActiveGame(null)}
          />
        </Suspense>
      )}
    </>
  );
}
