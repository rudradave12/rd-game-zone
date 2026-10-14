import GameLibraryPage from "~/components/GameLibrarypage";
import Footer from "~/components/Footer";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Game Library | RD Game Zone Ahmedabad" },
  {
    name: "description",
    content:
      "Browse the PS5, PS4 and PC games currently available at RD Game Zone in Ahmedabad, including upcoming releases.",
  },
];

export default function GamesRoute() {
  return (
    <>
      <GameLibraryPage />
      <Footer />
    </>
  );
}
