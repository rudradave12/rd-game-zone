import { FiAlertTriangle } from "react-icons/fi";

export const gtaOnlinePolicyText = "GTA Online gameplay maintains a strict policy regarding in-game content. Adult-themed environments and bar-style locations are restricted. Violation will result in immediate termination of the session without refund.";

export default function GTAOnlinePolicy() {
  return (
    <section className="guidelines-gta" aria-labelledby="gta-policy-title">
      <div className="guidelines-gta__art">
        <picture>
          <source media="(max-width: 700px)" srcSet="/posters/gta-5online-rog-poster-320.webp" type="image/webp" />
          <source srcSet="/posters/gta-5online-rog-poster.webp" type="image/webp" />
          <img
            src="/posters/gta-5online-rog-poster.jpeg"
            alt="GTA Online artwork"
            width="456"
            height="456"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="guidelines-gta__content">
        <div className="guidelines-gta__heading">
          <h2 id="gta-policy-title">GTA 5 Online play policy</h2>
          <p className="ps-kicker"><FiAlertTriangle aria-hidden="true" /> Content warning</p>
        </div>
        <p>{gtaOnlinePolicyText}</p>
      </div>
    </section>
  );
}
