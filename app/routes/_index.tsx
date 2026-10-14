import type { MetaFunction } from "@remix-run/node";
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
