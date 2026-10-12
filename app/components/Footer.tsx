import { FiArrowUpRight, FiClock, FiCoffee, FiMail, FiMapPin, FiMonitor, FiPhone, FiWifi, FiZap } from "react-icons/fi";

const store = {
  address: "First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004",
  phone: "+91 7665533991",
  email: "support@rdgamezone.com",
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
          <p className="ps-kicker">Find the lounge</p>
          <h2>Play together in Shahibag.</h2>
          <p>{store.address}</p>
        </div>
        <div className="ps-footer__visit-actions">
          <a className="ps-button ps-button--primary" href={store.directions} target="_blank" rel="noopener noreferrer">
            Get directions <FiArrowUpRight aria-hidden="true" />
          </a>
          <a className="ps-button ps-button--quiet" href={`tel:${store.phone.replace(/\s/g, "")}`}>
            Call the lounge
          </a>
        </div>
      </div>

      <div className="ps-footer__grid">
        <div className="ps-footer__brand">
          <div className="ps-footer__logo"><img src="/icons/logo.svg" alt="" width="32" height="33" /></div>
          <h2>RD Game Zone</h2>
          <p>Ahmedabad’s gaming lounge for competitive sessions, relaxed co-op, and the latest console and PC titles.</p>
          <span className="ps-footer__hours"><FiClock aria-hidden="true" /> Open daily · 10 AM–10 PM</span>
        </div>

        <nav className="ps-footer__column" aria-label="Explore">
          <h3>Explore</h3>
          <a href="/#about">About the lounge</a>
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
          <a href={store.directions} target="_blank" rel="noopener noreferrer"><FiMapPin aria-hidden="true" /> <span>{store.address}</span></a>
          <a href={`tel:${store.phone.replace(/\s/g, "")}`}><FiPhone aria-hidden="true" /> {store.phone}</a>
          <a href={`mailto:${store.email}`}><FiMail aria-hidden="true" /> {store.email}</a>
        </div>
      </div>

      <div className="ps-footer__bottom">
        <span>© {new Date().getFullYear()} RD Game Zone. Game titles and trademarks belong to their respective owners.</span>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
