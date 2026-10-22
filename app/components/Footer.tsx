import { FiArrowUpRight, FiClock, FiCoffee, FiMail, FiMapPin, FiMonitor, FiPhone, FiWifi, FiZap } from "react-icons/fi";

const venue = {
  address: "First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004",
  phone: "+91 7665533991",
  email: "rdgamezoneofficial@gmail.com",
  whatsapp: "https://wa.me/917665533991",
  directions: "https://maps.app.goo.gl/MZgKwhA8TPxEJfdD7",
};

const services = [
  { icon: FiZap, label: "PS5 & PS4 gaming" },
  { icon: FiMonitor, label: "High-end PC stations" },
  { icon: FiWifi, label: "LAN multiplayer" },
  { icon: FiCoffee, label: "Snacks & beverages" },
];

export default function Footer() {
  return (
    <footer className="ps-footer">
      <div className="ps-footer__visit">
        <div>
          <p className="ps-kicker">Find the game zone</p>
          <h2>Play together in Shahibag.</h2>
          <p>{venue.address}</p>
        </div>
        <div className="ps-footer__visit-actions">
          <a className="ps-button ps-button--primary" href={venue.directions} target="_blank" rel="noopener noreferrer">
            Get directions <FiArrowUpRight aria-hidden="true" />
          </a>
          <a className="ps-button ps-button--quiet" href={`tel:${venue.phone.replace(/\s/g, "")}`}>
            Call RD Game Zone
          </a>
        </div>
      </div>

      <div className="ps-footer__grid">
        <div className="ps-footer__brand">
          <div className="ps-footer__logo"><img src="/icons/logo.svg" alt="" width="32" height="33" /></div>
          <h2>RD Game Zone™</h2>
          <p>An independent gaming and e-sports venue in Ahmedabad for competitive sessions, relaxed co-op, and console and PC play.</p>
          <span className="ps-footer__hours"><FiClock aria-hidden="true" /> Open daily · 10 AM–10 PM</span>
        </div>

        <nav className="ps-footer__column" aria-label="Explore">
          <h3>Explore</h3>
          <a href="/#about">About the game zone</a>
          <a href="/games">Game library</a>
          <a href="/#pricing">Rates</a>
          <a href="/#booking">Book a session</a>
          <a href="/guidelines">Guidelines</a>
        </nav>

        <div className="ps-footer__column">
          <h3>Play your way</h3>
          <ul>
            {services.map(({ icon: Icon, label }) => <li key={label}><Icon aria-hidden="true" /> {label}</li>)}
          </ul>
        </div>

        <div className="ps-footer__column ps-footer__column--contact">
          <h3>Contact</h3>
          <a href={venue.directions} target="_blank" rel="noopener noreferrer"><FiMapPin aria-hidden="true" /> <span>{venue.address}</span></a>
          <a href={`tel:${venue.phone.replace(/\s/g, "")}`}><FiPhone aria-hidden="true" /> {venue.phone}</a>
          <a href={`mailto:${venue.email}`}><FiMail aria-hidden="true" /> {venue.email}</a>
          <a href={venue.whatsapp} target="_blank" rel="noopener noreferrer"><FiPhone aria-hidden="true" /> WhatsApp RD Game Zone</a>
        </div>
      </div>

      <div className="ps-footer__bottom">
        <span>© {new Date().getFullYear()} RD Game Zone™. All rights reserved in RD Game Zone’s original branding and website content. Game titles, logos, artwork, and other third-party materials remain with their respective rights holders.</span>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
