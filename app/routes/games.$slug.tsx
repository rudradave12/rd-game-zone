import { Link, useParams } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import GameDetailPage from "~/components/GameDetailPage";
import { gameForSlug } from "~/data/games";
import gameCatalogStyles from "~/styles/game-catalog.css?url";
import gameDetailStyles from "~/styles/game-detail.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gameCatalogStyles },
  { rel: "stylesheet", href: gameDetailStyles },
];

export const meta: MetaFunction = ({ params }) => {
  const game = gameForSlug(params.slug);
  if (!game) return [{ title: "Game not found | RD Game Zone" }];
  return [
    { title: `${game.title} | RD Game Zone` },
    { name: "description", content: `${game.subtitle}. Check availability, platforms, session guidance, and watch the trailer at RD Game Zone Ahmedabad.` },
  ];
};

export default function GameDetailsRoute() {
  const { slug } = useParams();
  const game = gameForSlug(slug);

  return game ? (
    <>
      <GameDetailPage key={slug} game={game} />
      <Footer />
    </>
  ) : (
    <main className="game-detail-not-found">
      <p>GAME LIBRARY</p>
      <h1>We couldn’t find that game.</h1>
      <Link to="/games">Return to the library</Link>
    </main>
  );
}
