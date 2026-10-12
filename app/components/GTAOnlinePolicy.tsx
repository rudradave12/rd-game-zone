import { FiAlertTriangle } from "react-icons/fi";

export default function GTAOnlinePolicy() {
  return (
    <section className="guidelines-gta" aria-labelledby="gta-policy-title">
      <div className="guidelines-gta__art">
        <img src="/posters/gta-5online-rog-poster.jpeg" alt="GTA Online artwork" loading="lazy" decoding="async" />
      </div>
      <div className="guidelines-gta__content">
        <p className="ps-kicker"><FiAlertTriangle aria-hidden="true" /> Content warning</p>
        <h2 id="gta-policy-title">GTA 5 Online play policy</h2>
        <p>GTA Online gameplay maintains a strict policy regarding in-game content. Adult-themed environments and bar-style locations are restricted. Violation will result in immediate termination of the session without refund.</p>
      </div>
    </section>
  );
}
