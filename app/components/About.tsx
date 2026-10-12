const standards = [
  ["240Hz", "Esports displays"],
  ["LAN", "Multiplayer ready"],
  ["Secure", "Safe & friendly zone"],
  ["Pro", "Headsets & gear"],
];

export default function AboutSection() {
  return (
    <section id="about" className="lounge-intro" aria-labelledby="about-title">
      <div className="lounge-intro__grid">
        <div className="lounge-intro__copy">
          <p className="ps-kicker">Made for players</p>
          <h2 id="about-title">A better way to play.</h2>
          <p>RD Game Zone is designed for gamers who value <strong>performance, comfort, and precision</strong>. Whether you’re here to compete, practice, or simply enjoy your favorite games, our space delivers a balanced experience for both casual and serious players.</p>
          <p>Our gaming setup supports <strong>PlayStation 5, PlayStation 4, and high-end gaming PCs</strong>, powered by optimized hardware and high-refresh displays to deliver smooth gameplay with stunning visuals.</p>
          <p>The environment is carefully managed to remain <strong>friendly, respectful, and welcoming</strong>, allowing players to focus purely on gaming.</p>
          <p>Enjoy access to <strong>top AAA titles and competitive favorites</strong>, updated regularly to match current gaming trends.</p>
          <p>Food and refreshments are available inside the gaming zone to ensure uninterrupted gameplay sessions. Outside food policies are strictly managed to maintain hygiene, equipment safety, and a premium gaming experience.</p>
        </div>
        <aside className="lounge-intro__standard" aria-label="Lounge standards">
          <span className="lounge-intro__orb lounge-intro__orb--one" aria-hidden="true" />
          <span className="lounge-intro__orb lounge-intro__orb--two" aria-hidden="true" />
          <p className="ps-kicker">Lounge standard</p>
          <div className="lounge-intro__stats">
            {standards.map(([value, label]) => (
              <div key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
