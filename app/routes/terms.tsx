// app/routes/terms.tsx
// ⚠️ filename MUST stay lowercase: terms.tsx
// Route renders at: /terms

import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Terms & Conditions — RD Game Zone™" },
  { name: "description", content: "Terms for using the RD Game Zone™ website and Ahmedabad gaming venue, including sessions, original brand content, and third-party game trademarks." },
];

const EMAIL = "rdgamezoneofficial@gmail.com";
const CONTACT_PHONE = "+91 76655 33991";
const CONTACT_TEL = "+917665533991";
const CONTACT_WHATSAPP = "https://wa.me/917665533991";
const CONTACT_LINK = <a href={CONTACT_WHATSAPP} className="legal-link" target="_blank" rel="noopener noreferrer">WhatsApp or call {CONTACT_PHONE}</a>;

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    content: (
      <>
        <p>By accessing or using the RD Game Zone website (the "Site") or visiting our gaming center located at First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004 (the "Premises"), you agree to be bound by these Terms &amp; Conditions.</p>
        <p>If you do not agree with any part of these terms, you must not use our website or services. We reserve the right to update these terms at any time. Continued use of our services following any changes constitutes acceptance of the revised terms.</p>
        <p>These terms apply to all visitors, users, and customers of RD Game Zone.</p>
      </>
    ),
  },
  {
    id: "about-rd-game-zone",
    heading: "About RD Game Zone",
    content: (
      <>
        <p>RD Game Zone™ is the public-facing brand for an independent gaming and e-sports venue in Shahibag, Ahmedabad. This website shares information about the venue, gaming sessions, rates, game library, guidelines, and ways to contact or visit us.</p>
        <p>This is not an online game store, marketplace, publisher, or game-download service. The game library identifies titles that may be available to play at the venue; availability can change, so please contact us before visiting if a particular title matters to your plans. RD Game Zone does not sell or transfer ownership of video games through this website.</p>
      </>
    ),
  },
  {
    id: "website-usage",
    heading: "Website Usage",
    content: (
      <>
        <p>You may access and use this website to learn about RD Game Zone and its venue services. Use the site lawfully and in a way that does not interfere with other visitors or our systems. You must not:</p>
        <ul className="legal-list">
          <li>Use the site in any way that violates any applicable local, national, or international law or regulation.</li>
          <li>Transmit any unsolicited or unauthorized advertising, promotional material, or any other form of spam.</li>
          <li>Attempt to gain unauthorized access to any part of our website, servers, or related systems or networks.</li>
          <li>Engage in conduct that restricts or inhibits anyone's use or enjoyment of the website, or which may harm RD Game Zone or other users.</li>
          <li>Reproduce or commercially exploit RD Game Zone-owned website material or branding except as permitted by law or the Brand &amp; Original Content section below.</li>
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
        <p>Bookings are arranged by phone, WhatsApp, or in person; the website does not accept booking details or payments. The following terms apply to those sessions:</p>
        <ul className="legal-list">
          <li><strong>Booking Confirmation:</strong> A booking is confirmed only after RD Game Zone confirms it by phone, WhatsApp, SMS, email, or in person.</li>
          <li><strong>Walk-In Sessions:</strong> Available subject to station availability. We cannot guarantee availability without a prior booking during peak hours.</li>
          <li><strong>Cancellations:</strong> Please give at least 2 hours’ notice to avoid a late-cancellation charge. Advance payments remain non-refundable for customer cancellations; late cancellations may also result in the session being released.</li>
          <li><strong>No-Shows:</strong> Customers who do not arrive within 15 minutes of their booked session start time without prior notice may have their session reassigned. Advance payments are non-refundable.</li>
          <li><strong>Refunds:</strong> Advance payments are non-refundable for customer-initiated cancellations and no-shows. If RD Game Zone cancels a confirmed session because of technical failure or another operational issue, we will offer a full refund or reschedule.</li>
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
    heading: "RD Game Zone Brand & Original Content",
    content: (
      <>
        <p>RD Game Zone™ is the public-facing brand used by the venue operator; these terms do not state or imply a particular legal entity form or that the mark is registered. RD Game Zone claims rights only in its original branding and website content that it owns. © {new Date().getFullYear()} RD Game Zone. All rights reserved in RD Game Zone-owned original material, subject to rights and exceptions provided by law.</p>
        <p>Game titles, publisher and platform names, characters, logos, screenshots, box art, other game artwork, and trailers may be owned or controlled by third parties, including publishers, developers, and platform holders. They are shown to identify or describe the relevant games and possible venue offerings. RD Game Zone does not claim to own them, and this notice does not grant permission or a licence to reuse them. Their use remains subject to the applicable rights, licences, and law. User-supplied or externally sourced media does not become RD Game Zone property merely because it appears on this website.</p>
        <p>Except where permitted by law or an applicable licence, you may not reproduce, republish, distribute, adapt, remove attribution from, or commercially exploit RD Game Zone-owned original content or branding without prior written permission. You may link to public pages if the link does not misrepresent an affiliation or endorsement. For permissions or rights concerns about RD-owned material, email <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a> or use {CONTACT_LINK}.</p>
        <p>To report a concern about third-party material, email us with the affected page URL, a description of the material, and information showing your authority to act. We will review the report and, where appropriate, restrict access to or remove the material while resolving the concern.</p>
        <p>Nothing in this notice limits any rights or remedies available under applicable law.</p>
      </>
    ),
  },
  {
    id: "trademarks",
    heading: "Third-Party Trademarks",
    content: (
      <>
        <p>Game titles, characters, platform and publisher names, logos, screenshots, artwork, and trailers shown on this website belong to their respective rights holders. They are presented to identify or describe games and venue offerings; their appearance here does not transfer any rights to RD Game Zone. A rights notice or disclaimer is not a substitute for a licence or other required permission.</p>
        <p>RD Game Zone is independently operated and is not sponsored, endorsed, or officially affiliated with Sony Interactive Entertainment, Microsoft, or any game publisher unless expressly stated. Third-party names and marks are used only to identify their respective products and services.</p>
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
            <span className="legal-contact-label">Brand / venue</span>
            <span className="legal-contact-value">RD Game Zone™</span>
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
          <div className="legal-contact-row">
            <span className="legal-contact-label">Phone / WhatsApp</span>
            <a href={`tel:${CONTACT_TEL}`} className="legal-contact-value legal-link">{CONTACT_PHONE}</a>
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
          <p className="legal-meta">Last updated: October 22, 2026</p>
          <p className="legal-intro">These terms govern use of the RD Game Zone™ website and gaming sessions at our Ahmedabad venue. Please read them before using the site or arranging a session.</p>
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
          <span>© {new Date().getFullYear()} RD Game Zone™. All rights reserved in RD Game Zone-owned original material; third-party game materials remain with their rights holders.</span>
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
