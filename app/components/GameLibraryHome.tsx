import { Link } from "@remix-run/react";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { games } from "~/data/games";

const featuredGames = games.slice(0, 6);

/* The library's showcase appears on the first page after the hero. Use
   purpose-made 16:9 assets here so its six visuals do not compete with the
   first-screen content or download multi-megabyte source artwork. */
const featuredImages: Record<number, string> = {
  41: "/images/featured/gta-vi.jpg",
  1: "/images/featured/cod-blackops-7.jpg",
  2: "/images/featured/gta-online.jpg",
  3: "/images/featured/valorant.jpg",
  4: "/images/featured/counter-strike-2.jpg",
  5: "/images/featured/apex-legends.jpg",
};

export default function GameLibraryHome() {
  return (
    <section id="game-library" className="featured-library" aria-labelledby="featured-library-title">
      <div className="ps-section-heading featured-library__heading">
        <div>
          <p className="ps-kicker">Curated for the lounge</p>
          <h2 id="featured-library-title">Your next game night starts here.</h2>
          <p>See the next big arrival alongside lounge favourites, then browse every title by genre, platform, and availability.</p>
        </div>
        <Link to="/games" className="ps-button ps-button--quiet">
          Explore all {games.length} games <FiArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <div className="featured-library__grid">
        {featuredGames.map((game, index) => (
          <Link key={game.id} to={`/games#${game.id}`} className={`featured-game featured-game--${index + 1}`}>
            <div className="featured-game__media">
              <img src={featuredImages[game.id] ?? game.image} alt={game.title} loading="lazy" decoding="async" />
              <span className={`featured-game__status featured-game__status--${game.status}`}>
                {game.status === "upcoming" ? "Coming soon" : "In lounge"}
              </span>
              <span className="featured-game__play"><FiPlay aria-hidden="true" /></span>
            </div>
            <div className="featured-game__content">
              <p>{game.category} · {game.platforms.join(" / ")}</p>
              <h3>{game.title}</h3>
              <span>{game.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
