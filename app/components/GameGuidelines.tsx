import type { IconType } from "react-icons";
import { FiAlertTriangle, FiClock, FiEye, FiLock, FiShield, FiUserCheck, FiWind, FiZap } from "react-icons/fi";

type Guideline = {
  icon: IconType;
  title: string;
  subtitle: string;
  points: string[];
};

const guidelines: Guideline[] = [
  { icon: FiUserCheck, title: "Age & entry", subtitle: "Strictly 11+ only", points: ["No children under 11 allowed.", "Maintain maturity at all times."] },
  { icon: FiShield, title: "Zero tolerance", subtitle: "Respect the zone", points: ["No profanity allowed.", "No alcohol or smoking.", "No outside food or drinks."] },
  { icon: FiWind, title: "Environment", subtitle: "Clean & safe", points: ["Strictly smoke-free zone.", "Clean environment maintained.", "Gameplay responsibility lies with the gamer."] },
  { icon: FiZap, title: "Equipment care", subtitle: "Handle with care", points: ["Handle controllers gently.", "Full MRP charged for damages.", "Report technical issues immediately."] },
  { icon: FiLock, title: "Security & waiting", subtitle: "No waiting area", points: ["No waiting area inside or outside due to security.", "Entry limited to active gamers only.", "Please arrive strictly at your booked time."] },
  { icon: FiEye, title: "Content guidelines", subtitle: "Open world titles", points: ["Adult-themed content may appear during gameplay.", "Inappropriate behaviour is strictly prohibited.", "Immediate session termination for violations."] },
  { icon: FiClock, title: "Time & session", subtitle: "Play time rules", points: ["Sessions run strictly as per booked time.", "Late arrival may result in reduced playtime.", "Extensions subject to availability."] },
  { icon: FiAlertTriangle, title: "Security notice", subtitle: "Mandatory rule", points: ["Entry only for active gamers.", "No crowding or unnecessary gathering.", "Management decision is final."] },
];

export default function GameGuidelines() {
  return (
    <section className="guidelines-rules" aria-labelledby="guidelines-rules-title">
      <header className="guidelines-rules__heading">
        <p className="ps-kicker">Official rules</p>
        <h2 id="guidelines-rules-title">A great game night is better for everyone.</h2>
        <p>All visitors must read and comply with the following rules before entering the zone.</p>
      </header>
      <div className="guidelines-rules__alert" role="alert">
        <FiAlertTriangle aria-hidden="true" />
        <p><strong>Security notice:</strong> There is <strong>no waiting area</strong> inside or outside the Game Zone for security and safety reasons. Please arrive strictly at your booked time only.</p>
      </div>
      <div className="guidelines-rules__grid">
        {guidelines.map(({ icon: Icon, title, subtitle, points }) => (
          <article key={title}>
            <Icon aria-hidden="true" />
            <div>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
            <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
