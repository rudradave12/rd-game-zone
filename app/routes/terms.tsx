// app/routes/terms.tsx
// ⚠️ filename MUST stay lowercase: terms.tsx
// Route renders at: /terms

import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Terms & Conditions — RD Game Zone" },
  { name: "description", content: "Read the RD Game Zone Terms & Conditions covering website usage, gaming center rules, booking policy, and intellectual property protection." },
];

const EMAIL = "support@rdgamezone.com";

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    content: (
      <>
        <p>By accessing or using the RD Game Zone website (the "Site") or visiting our gaming lounge located at First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004 (the "Premises"), you agree to be bound by these Terms &amp; Conditions.</p>
        <p>If you do not agree with any part of these terms, you must not use our website or services. We reserve the right to update these terms at any time. Continued use of our services following any changes constitutes acceptance of the revised terms.</p>
        <p>These terms apply to all visitors, users, and customers of RD Game Zone.</p>
      </>
    ),
  },
  {
    id: "website-usage",
    heading: "Website Usage",
    content: (
      <>
        <p>You agree to use this website only for lawful purposes and in a manner consistent with all applicable laws and regulations. You must not:</p>
        <ul className="legal-list">
          <li>Use the site in any way that violates any applicable local, national, or international law or regulation.</li>
          <li>Transmit any unsolicited or unauthorized advertising, promotional material, or any other form of spam.</li>
          <li>Attempt to gain unauthorized access to any part of our website, servers, or related systems or networks.</li>
          <li>Engage in conduct that restricts or inhibits anyone's use or enjoyment of the website, or which may harm RD Game Zone or other users.</li>
          <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without our express written permission.</li>
        </ul>
        <p>RD Game Zone reserves the right to suspend or terminate access to the website for any user who violates these terms.</p>
      </>
    ),
  },
  {
    id: "gaming-rules",
    heading: "Gaming Center Service Rules",
    content: (
      <>
        <p>To ensure a safe, enjoyable, and fair experience for all customers, the following rules apply to all visits at RD Game Zone:</p>
        <ul className="legal-list">
          <li><strong>Age Policy:</strong> Customers under the age of 13 must be accompanied by a parent or guardian. We reserve the right to request age verification at any time.</li>
          <li><strong>Equipment Care:</strong> All gaming equipment, peripherals, and furniture must be treated with care. Damage caused by negligence or misconduct is the financial responsibility of that customer.</li>
          <li><strong>Food &amp; Beverages:</strong> Only food and beverages purchased on the premises may be consumed in the gaming area unless approved by management.</li>
          <li><strong>Personal Belongings:</strong> RD Game Zone is not responsible for loss, theft, or damage of personal belongings brought onto the premises.</li>
          <li><strong>Cleanliness:</strong> Customers are expected to keep their station clean and tidy throughout their session.</li>
          <li><strong>Session Times:</strong> Sessions begin and end at the scheduled time. Late arrivals will not receive an extension unless agreed upon by staff.</li>
          <li><strong>Noise &amp; Conduct:</strong> Excessive noise, shouting, or behavior that disturbs other customers is not permitted.</li>
          <li><strong>Management Discretion:</strong> Staff may terminate any session early without refund if a customer violates these rules or behaves disruptively.</li>
        </ul>
      </>
    ),
  },
  {
    id: "booking-cancellation",
    heading: "Booking & Cancellation Policy",
    content: (
      <>
        <p>The following policies govern all bookings made through our website, in-store, or via phone:</p>
        <ul className="legal-list">
          <li><strong>Booking Confirmation:</strong> A booking is confirmed only upon receipt of confirmation from RD Game Zone via SMS, email, or verbal confirmation in-store.</li>
          <li><strong>Walk-In Sessions:</strong> Available subject to station availability. We cannot guarantee availability without a prior booking during peak hours.</li>
          <li><strong>Cancellations:</strong> Cancellations made at least 2 hours before the scheduled session will not incur any penalty. Late cancellations may result in forfeiture of any advance payment.</li>
          <li><strong>No-Shows:</strong> Customers who do not arrive within 15 minutes of their booked session start time without prior notice may have their session reassigned without refund.</li>
          <li><strong>Refunds:</strong> Refunds, where applicable, are processed at management's discretion and may take up to 7 business days.</li>
          <li><strong>Rescheduling:</strong> Requests to reschedule must be made at least 1 hour in advance and are subject to availability.</li>
        </ul>
        <p>RD Game Zone reserves the right to cancel any booked session in the event of technical failure, unforeseen circumstances, or force majeure. A full refund or reschedule will be offered in such cases.</p>
      </>
    ),
  },
  {
    id: "responsible-gaming",
    heading: "Responsible Gaming Conduct",
    content: (
      <>
        <p>All customers are expected to engage in responsible and respectful behavior at all times:</p>
        <ul className="legal-list">
          <li><strong>Respect:</strong> Harassment, discrimination, or offensive behavior toward other customers or staff will result in immediate removal from the premises and a permanent ban.</li>
          <li><strong>Fair Play:</strong> Cheating, use of unauthorized software, or manipulation of game data is strictly prohibited and may result in session termination without refund.</li>
          <li><strong>Content Appropriateness:</strong> Displaying content that is explicitly violent, sexually explicit, or otherwise inappropriate in a shared public setting is prohibited.</li>
          <li><strong>Screen Time:</strong> We encourage regular breaks. RD Game Zone is not liable for physical discomfort resulting from prolonged gaming sessions.</li>
          <li><strong>No Gambling:</strong> Any form of gambling, wagering, or real-money staking related to gameplay is strictly prohibited on the premises.</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by applicable law, RD Game Zone shall not be liable for:</p>
        <ul className="legal-list">
          <li>Any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website.</li>
          <li>Loss of data, save files, in-game progress, or digital content due to hardware failure, software error, or any technical issue beyond our control.</li>
          <li>Any injury, loss, or damage arising from your use of gaming equipment unless caused by our direct negligence.</li>
          <li>Interruption or unavailability of services due to maintenance, internet outages, or events outside our control.</li>
          <li>Actions or conduct of other customers on the premises.</li>
        </ul>
        <p>Our total liability for any claim shall not exceed the amount paid by you for the specific session or service in question. Nothing in these terms limits our liability for fraud, death, or personal injury caused by our negligence.</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    content: (
      <>
        <p>All original content on the RD Game Zone website — including the brand name, logo, website design, layout, graphics, text, and visual assets — is the exclusive intellectual property of RD Game Zone and is protected under applicable copyright and trademark law.</p>
        <p>You agree that you will not:</p>
        <ul className="legal-list">
          <li>Copy, reproduce, distribute, or create derivative works based on our website content without prior written permission.</li>
          <li>Use the RD Game Zone name, logo, or brand identity in any commercial or promotional context without authorization.</li>
          <li>Scrape, crawl, or systematically extract data from our website for commercial purposes.</li>
        </ul>
        <p>Requests for permission to use our content may be directed to <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.</p>
      </>
    ),
  },
  {
    id: "trademarks",
    heading: "Third-Party Trademarks",
    content: (
      <>
        <p>All game titles, characters, logos, brand names, and trademarks referenced on our website or displayed on our premises are the property of their respective owners. This includes trademarks owned by Sony Interactive Entertainment (PlayStation®, PS5®, PS4®), Microsoft Corporation, and individual game publishers and developers.</p>
        <p>The use of these names on our website is purely for informational and descriptive purposes and does not imply any affiliation, endorsement, or sponsorship by the respective trademark holders. RD Game Zone is an independent business not affiliated with or endorsed by any game publisher unless explicitly stated.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    content: (
      <>
        <p>These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms or our services shall be subject to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat.</p>
        <p>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: (
      <>
        <p>For questions or concerns related to these Terms &amp; Conditions, please contact us:</p>
        <div className="legal-contact-block">
          <div className="legal-contact-row">
            <span className="legal-contact-label">Business</span>
            <span className="legal-contact-value">RD Game Zone</span>
          </div>
          <div className="legal-contact-row">
            <span className="legal-contact-label">Address</span>
            <span className="legal-contact-value">
              First floor, A-113, opp. Shwami Narayan temple,<br />
              Shahibag, Ahmedabad, Gujarat 380004, India
            </span>
          </div>
          <div className="legal-contact-row">
            <span className="legal-contact-label">Email</span>
            <a href={`mailto:${EMAIL}`} className="legal-contact-value legal-link">{EMAIL}</a>
          </div>
        </div>
      </>
    ),
  },
];

export default function TermsRoute() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="legal-page" aria-labelledby="terms-title">

      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero__inner">
          <a href="/" className="legal-back">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
              <polyline points="10 4 6 8 10 12" />
            </svg>
            Back to Home
          </a>
          <span className="legal-eyebrow">Legal</span>
          <h1 id="terms-title" className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-meta">Last updated: Feb 2026</p>
          <p className="legal-intro">These terms govern your use of the RD Game Zone website and in-store gaming services. Please read them carefully before using our services.</p>
        </div>
      </div>

      {/* Body */}
      <div className="legal-body">
        <div className="legal-body__inner">

          {/* Table of Contents */}
          <nav className="legal-toc" aria-label="Table of contents">
            <span className="legal-toc__label">Contents</span>
            <ol className="legal-toc__list">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="legal-toc__link">
                    <span className="legal-toc__num">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="legal-sections">
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} className="legal-section">
                <div className="legal-section__num">{String(i + 1).padStart(2, "0")}</div>
                <div className="legal-section__body">
                  <h2 className="legal-section__heading">{s.heading}</h2>
                  <div className="legal-section__content">{s.content}</div>
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>

      {/* Footer bar */}
      <div className="legal-foot">
        <div className="legal-foot__inner">
          <span>© {new Date().getFullYear()} RD Game Zone. All rights reserved.</span>
          <nav className="legal-foot__nav">
            <a href="/privacy" className="legal-foot__link">Privacy</a>
            <span className="legal-foot__sep">|</span>
            <a href="/terms"   className="legal-foot__link legal-foot__link--active">Terms</a>
            <span className="legal-foot__sep">|</span>
            <a href="/"        className="legal-foot__link">Home</a>
          </nav>
        </div>
      </div>

    </main>
  );
}
