import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FiArrowUpRight, FiShield } from "react-icons/fi";
import Footer from "~/components/Footer";
import GameGuidelines from "~/components/GameGuidelines";
import GTAOnlinePolicy from "~/components/GTAOnlinePolicy";

export const meta: MetaFunction = () => [
  { title: "Guidelines | RD Game Zone Ahmedabad" },
  { name: "description", content: "Read the RD Game Zone visitor, equipment, session, and GTA Online play guidelines before your visit." },
];

export default function GuidelinesRoute() {
  return (
    <main className="guidelines-page">
      <section className="guidelines-hero">
        <div>
          <p className="ps-kicker"><FiShield aria-hidden="true" /> Play responsibly</p>
          <h1>Everything you need for a great session.</h1>
          <p>Clear rules help every player enjoy a clean, secure, and respectful gaming lounge.</p>
          <Link to="/games" className="ps-button ps-button--primary">Browse the game library <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
      </section>
      <GameGuidelines />
      <GTAOnlinePolicy />
      <Footer />
    </main>
  );
}
