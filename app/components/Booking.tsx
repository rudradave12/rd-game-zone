import { FiArrowUpRight, FiClock, FiCreditCard, FiMapPin, FiMessageCircle, FiPhone, FiShield, FiTag } from "react-icons/fi";

const bookingRules = [
  { icon: FiMapPin, title: "Store visit or call", description: "Book via store visit or phone call." },
  { icon: FiCreditCard, title: "Advance payment", description: "Advance payment confirms your slot immediately." },
  { icon: FiShield, title: "Non-refundable", description: "Payments are strictly non-refundable." },
  { icon: FiTag, title: "Exclusive slot", description: "Reserved slots are exclusive and cannot be taken by others." },
  { icon: FiClock, title: "Skip the wait", description: "Pay in advance to skip the wait." },
  { icon: FiClock, title: "Hourly billing", description: "Sessions are charged strictly on an hourly basis only." },
];

export default function Booking() {
  return (
    <section id="booking" className="booking-section" aria-labelledby="booking-title">
      <div className="booking-section__intro">
        <p className="ps-kicker">Reservations & contact</p>
        <h2 id="booking-title">Ready when you are.</h2>
        <p>Reserve in advance or walk in. Call us or visit RD Game Zone to secure your play session.</p>
        <div className="booking-section__facts" aria-label="Booking information">
          <span><FiClock aria-hidden="true" /> Open daily · 10 AM–10 PM</span>
          <span><FiMapPin aria-hidden="true" /> Ahmedabad, Gujarat</span>
        </div>
      </div>

      <div className="booking-section__actions">
        <article className="booking-card booking-card--call">
          <span className="booking-card__icon"><FiPhone aria-hidden="true" /></span>
          <p>Fastest confirmation</p>
          <h3>Call for a session</h3>
          <a href="tel:+917665533991">+91 76655 33991 <FiArrowUpRight aria-hidden="true" /></a>
          <span>Mon–Sun · 10 AM–10 PM</span>
        </article>
        <article className="booking-card">
          <span className="booking-card__icon booking-card__icon--green"><FiMessageCircle aria-hidden="true" /></span>
          <p>Message us</p>
          <h3>Book on WhatsApp</h3>
          <a href="https://wa.me/917665533991" target="_blank" rel="noopener noreferrer">Open WhatsApp <FiArrowUpRight aria-hidden="true" /></a>
          <span>Responses may be delayed. Call for instant confirmation.</span>
        </article>
      </div>

      <section className="booking-section__rules" aria-labelledby="booking-rules-title">
        <div>
          <p className="ps-kicker">Zone policy</p>
          <h3 id="booking-rules-title">Good sessions start with clear rules.</h3>
        </div>
        <div className="booking-section__rules-grid">
          {bookingRules.map(({ icon: Icon, title, description }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <div><strong>{title}</strong><span>{description}</span></div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
