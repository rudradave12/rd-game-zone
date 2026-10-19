import GameLibraryPage from "~/components/GameLibrarypage";
import Footer from "~/components/Footer";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import gameCatalogStyles from "~/styles/game-catalog.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: gameCatalogStyles },
];

export const meta: MetaFunction = () => [
  { title: "Game Library | RD Game Zone Ahmedabad" },
  {
    name: "description",
    content:
      "Browse PS5, PS4 and PC games at RD Game Zone Ahmedabad, explore daily picks, and open a dedicated page for each game's details and trailer.",
  },
];

export default function GamesIndexRoute() {
  return (
    <>
      <GameLibraryPage />
      <Footer />
    </>
  );
}
