import type { LinksFunction, MetaFunction } from "@remix-run/node";
import CinematicHero from "~/components/CinematicHero";
import AboutSection from "~/components/About";
import Pricing from "~/components/Pricing";
import Booking from "~/components/Booking";
import GameLibraryHome from "~/components/GameLibraryHome";
import Experience from "~/components/Experience";
import EsportsTicker from "~/components/EsportsTicker";
import Footer from "~/components/Footer";

/* Page-level meta override (root.tsx handles the main SEO) */
export const meta: MetaFunction = () => [
  { title: "RD Game Zone | The Ultimate Gaming Experience" },
  {
    name: "description",
    content:
      "Play PS5, PC, 240Hz esports and LAN multiplayer at RD Game Zone in Ahmedabad. Browse the game library, rates and visit details.",
  },
];

/* Preload only on the route that renders this cinematic hero. */
export const links: LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: "/images/hero/valorant.jpg",
    media: "(min-width: 1101px)",
  },
  {
    rel: "preload",
    as: "image",
    href: "/images/valorant-mobile-portraite.jpg",
    media: "(max-width: 1100px)",
  },
];

export default function Home() {
  return (
    <main aria-label="RD Game Zone Homepage">
      <CinematicHero />
      <EsportsTicker />
      <AboutSection />
      <GameLibraryHome />
      <Pricing />
      <Booking />
      <Experience />
      <Footer />
    </main>
  );
}
