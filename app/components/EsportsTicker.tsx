import { FiActivity, FiMonitor, FiWifi, FiZap } from "react-icons/fi";

const highlights = [
  { icon: FiZap, label: "PS5 · PS4 · PC" },
  { icon: FiMonitor, label: "240Hz esports displays" },
  { icon: FiWifi, label: "LAN multiplayer ready" },
  { icon: FiActivity, label: "Competitive & casual sessions" },
];

export default function EsportsTicker() {
  return (
    <section className="ps-play-strip" aria-label="RD Game Zone highlights">
      <div className="ps-play-strip__inner">
        <span className="ps-play-strip__label"><i aria-hidden="true" /> Live at RD</span>
        <div className="ps-play-strip__items">
          {highlights.map(({ icon: Icon, label }) => <span key={label}><Icon aria-hidden="true" /> {label}</span>)}
        </div>
      </div>
    </section>
  );
}
