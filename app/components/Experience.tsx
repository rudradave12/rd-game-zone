import { Link } from "@remix-run/react";
import { FiChevronRight, FiMonitor, FiWifi } from "react-icons/fi";

export default function Experience() {
  return (
    <section className="experience-section" aria-labelledby="experience-title">
      <div className="experience-section__copy">
        <p className="ps-kicker">Player experience</p>
        <h2 id="experience-title">Built for a smooth session.</h2>
        <p>We are committed to providing a top-tier environment. Our facility prioritizes player comfort, high-performance gear, and a respectful community atmosphere. Enjoy gaming the way it was meant to be played.</p>
        <Link to="/guidelines" className="ps-text-link">Read the lounge guidelines <FiChevronRight aria-hidden="true" /></Link>
      </div>
      <div className="experience-section__cards">
        <article><FiMonitor aria-hidden="true" /><strong>High-end PCs</strong><span>Performance-first gear for every match.</span></article>
        <article><FiWifi aria-hidden="true" /><strong>Gigabit LAN</strong><span>Stay in sync for multiplayer game nights.</span></article>
      </div>
    </section>
  );
}
