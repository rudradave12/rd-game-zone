// app/routes/privacy.tsx
// ⚠️ filename MUST stay lowercase: privacy.tsx
// Route renders at: /privacy

import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — RD Game Zone" },
  { name: "description", content: "Read the RD Game Zone Privacy Policy. We explain how we collect, use, and protect your personal information." },
];

const EMAIL = "support@rdgamezone.com";

const SECTIONS = [
  {
    id: "introduction",
    heading: "Introduction",
    content: (
      <>
        <p>Welcome to RD Game Zone. We operate a gaming and e-sports center located at First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, use our booking system, or interact with our services in-store.</p>
        <p>By accessing our website or using our services, you agree to the practices described in this policy. We are committed to handling your information with care, transparency, and respect. If you have any concerns, please reach out to us at <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.</p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    heading: "Information We Collect",
    content: (
      <>
        <p>We collect only the information necessary to provide you with our services:</p>
        <ul className="legal-list">
          <li><strong>Personal Identification:</strong> Your name and contact details (phone number and/or email address) when you make a booking or register with us.</li>
          <li><strong>Booking Information:</strong> Session type (PS5, PS4, PC, LAN), preferred date and time slot, duration, and number of players.</li>
          <li><strong>Device &amp; Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website, collected automatically via standard web analytics tools.</li>
          <li><strong>In-Store Records:</strong> Visit history, session logs, and any feedback you choose to share during or after your visit.</li>
        </ul>
        <p>We do <strong>not</strong> collect sensitive personal data such as Aadhaar numbers, financial account details, or government ID numbers unless explicitly required and consented to for a specific purpose.</p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    heading: "How We Use Your Information",
    content: (
      <>
        <p>The information we collect is used solely for legitimate operational purposes:</p>
        <ul className="legal-list">
          <li>Confirming and managing your gaming session bookings.</li>
          <li>Sending booking confirmations, reminders, or updates via SMS or email.</li>
          <li>Providing in-store customer support and resolving service issues.</li>
          <li>Improving our website, services, and overall customer experience.</li>
          <li>Sending occasional promotional communications about offers or events — only if you have opted in. You may opt out at any time.</li>
          <li>Complying with applicable legal obligations.</li>
        </ul>
        <p>We will never use your personal information for purposes unrelated to delivering our services without your explicit consent.</p>
      </>
    ),
  },
  {
    id: "data-sharing",
    heading: "Data Sharing & Third Parties",
    content: (
      <>
        <p><strong>RD Game Zone does not sell, rent, trade, or share your personal information with any third party for commercial or marketing purposes.</strong></p>
        <p>In limited circumstances, we may share information with trusted service providers who assist us in operating our website or managing bookings. These providers are bound by confidentiality obligations and may not use your data for any other purpose.</p>
        <p>We may disclose information if required to do so by law, court order, or in response to a valid request from a government or regulatory authority.</p>
      </>
    ),
  },
  {
    id: "cookies-analytics",
    heading: "Cookies & Analytics",
    content: (
      <>
        <p>Our website may use cookies — small text files stored on your device — to enhance your browsing experience and understand how visitors use our site.</p>
        <ul className="legal-list">
          <li><strong>Essential Cookies:</strong> Required for core site functionality such as navigation and session management.</li>
          <li><strong>Analytics Cookies:</strong> Used to collect anonymous data about site traffic and usage patterns. No personally identifiable information is stored in analytics cookies.</li>
        </ul>
        <p>You can disable cookies in your browser settings at any time. Doing so may affect certain features of our website.</p>
      </>
    ),
  },
  {
    id: "data-security",
    heading: "Security of Your Data",
    content: (
      <>
        <p>We implement reasonable technical and organizational measures to protect your data against unauthorized access, disclosure, alteration, or destruction. Our website is served over HTTPS to ensure encrypted communication between your browser and our servers. Access to stored customer data is restricted to authorized personnel only.</p>
        <p>While we take every precaution, no method of transmission over the internet or electronic storage is completely secure. Please notify us immediately if you suspect any unauthorized use of your information.</p>
      </>
    ),
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    content: (
      <>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. Booking records are generally retained for up to 12 months for operational and accounting purposes.</p>
        <p>You may request deletion of your personal data at any time by contacting us at <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul className="legal-list">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of any inaccurate or incomplete data.</li>
          <li>Request deletion of your personal data (subject to legal obligations).</li>
          <li>Withdraw consent for marketing communications at any time.</li>
          <li>Lodge a complaint with the relevant data protection authority.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.</p>
      </>
    ),
  },
  {
    id: "policy-updates",
    heading: "Changes to This Policy",
    content: (
      <p>We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. Continued use of our website or services after any changes constitutes your acceptance of the updated policy.</p>
    ),
  },
  {
    id: "contact",
    heading: "Contact Us",
    content: (
      <>
        <p>If you have any questions or concerns regarding this Privacy Policy, please get in touch:</p>
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

export default function PrivacyRoute() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="legal-page" aria-labelledby="privacy-policy-title">

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
          <h1 id="privacy-policy-title" className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Last updated: June 2025</p>
          <p className="legal-intro">RD Game Zone is committed to protecting your privacy and being transparent about how we handle your information. This policy covers our website and in-store services.</p>
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
            <a href="/privacy" className="legal-foot__link legal-foot__link--active">Privacy</a>
            <span className="legal-foot__sep">|</span>
            <a href="/terms"   className="legal-foot__link">Terms</a>
            <span className="legal-foot__sep">|</span>
            <a href="/"        className="legal-foot__link">Home</a>
          </nav>
        </div>
      </div>

    </main>
  );
}
