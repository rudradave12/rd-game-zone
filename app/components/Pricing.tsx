const plans = [
  {
    title: "32″ TV · PS4",
    rows: [["1 person", "₹100 / hour"], ["2 people", "₹200 / hour"], ["3 people", "₹300 / hour"], ["4 people", "₹400 / hour"]],
  },
  {
    title: "50″ TV",
    rows: [["1 person (PS4)", "₹120 / hour"], ["2 people (PS4)", "₹200 / hour"], ["1 person (PS5)", "₹130 / hour"], ["2 people (PS5)", "₹220 / hour"]],
  },
  {
    title: "65″ TV · PS5",
    featured: true,
    rows: [["1 person", "₹200 / hour"], ["2 people", "₹250 / hour"], ["3 people", "₹300 / hour"], ["4 people", "₹400 / hour"]],
  },
  {
    title: "Computer",
    rows: [["Regular PC", "₹100 / hour"], ["Pro PC", "₹130 / hour"]],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="rate-section" aria-labelledby="rates-title">
      <div className="ps-section-heading">
        <div>
          <p className="ps-kicker">Simple hourly rates</p>
          <h2 id="rates-title">Pick a screen. Bring your crew.</h2>
        </div>
        <p>All sessions are charged strictly on an hourly basis. Half-hour extension pricing is available only at the store and is not displayed online.</p>
      </div>

      <div className="rate-section__notice">
        <strong>Important</strong>
        <span>If a customer extends playtime beyond one hour, the same hourly rate continues to apply for the extended duration.</span>
      </div>

      <div className="rate-section__grid">
        {plans.map((plan) => (
          <article key={plan.title} className={`rate-card${plan.featured ? " rate-card--featured" : ""}`}>
            {plan.featured && <span className="rate-card__tag">Most popular</span>}
            <h3>{plan.title}</h3>
            <ul>
              {plan.rows.map(([label, rate]) => <li key={label}><span>{label}</span><strong>{rate}</strong></li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="rate-section__footnote">Rates apply to all games. For long sessions and LAN gaming, please contact the counter.</p>
    </section>
  );
}
