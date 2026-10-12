import { Link } from "@remix-run/react";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { games } from "~/data/games";

const featuredGames = games.slice(0, 6);

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
              <img src={game.image} alt={game.title} loading="lazy" decoding="async" />
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
