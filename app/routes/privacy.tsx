// app/routes/privacy.tsx
// ⚠️ filename MUST stay lowercase: privacy.tsx
// Route renders at: /privacy

import { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — RD Game Zone™" },
  { name: "description", content: "Learn what information RD Game Zone handles when you browse the site, arrange a gaming session, or contact us." },
];

const EMAIL = "rdgamezoneofficial@gmail.com";
const CONTACT_PHONE = "+91 76655 33991";
const CONTACT_TEL = "+917665533991";
const CONTACT_WHATSAPP = "https://wa.me/917665533991";
const CONTACT_LINK = <a href={CONTACT_WHATSAPP} className="legal-link" target="_blank" rel="noopener noreferrer">WhatsApp or call {CONTACT_PHONE}</a>;

const SECTIONS = [
  {
    id: "introduction",
    heading: "Introduction",
    content: (
      <>
        <p>RD Game Zone™ is the public-facing brand for an independent gaming and e-sports venue located at First floor, A-113, opp. Shwami Narayan temple, Shahibag, Ahmedabad, Gujarat 380004. This Privacy Policy explains how we handle information when you browse this website, contact us, arrange a session by phone or WhatsApp, or visit the venue. The website does not collect booking forms or payments and is not an online store.</p>
        <p>If you have questions about this policy or information you have shared with us, please email <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a> or contact us by {CONTACT_LINK}.</p>
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
          <li><strong>Contact Information:</strong> Your name, phone number, email address, or other details you choose to share when you call, message us, or visit the venue.</li>
          <li><strong>Session Requests:</strong> The platform or session type, requested date and time, duration, and number of players you provide when arranging a visit or booking.</li>
          <li><strong>At-Venue Records:</strong> Session or transaction records needed to provide the service, and feedback you choose to share.</li>
        </ul>
        <p>Please do not send government ID numbers, passwords, or payment-card details through our contact channels.</p>
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
          <li>Responding to enquiries and arranging or managing gaming sessions.</li>
          <li>Contacting you about a session or support request through the channel you used to reach us.</li>
          <li>Providing on-site customer support and resolving service issues.</li>
          <li>Improving the website using aggregate page-view and performance measurements.</li>
          <li>Sending promotional messages only where you have asked to receive them; you can ask us to stop.</li>
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
        <p><strong>RD Game Zone does not sell or rent your personal information.</strong> Our website is hosted through Cloudflare and uses Cloudflare Web Analytics to measure page views and performance. Cloudflare says Web Analytics does not collect or use visitors’ personal data; see its <a href="https://developers.cloudflare.com/web-analytics/about/" className="legal-link" target="_blank" rel="noopener noreferrer">Web Analytics overview</a>.</p>
        <p>If you choose to message us on WhatsApp, WhatsApp handles that conversation under its own <a href="https://www.whatsapp.com/legal/privacy-policies" className="legal-link" target="_blank" rel="noopener noreferrer">privacy policy</a>. Game pages may load a trailer from YouTube or Google Drive when you choose to watch it; those services receive the request and handle information under their own policies, including Google’s <a href="https://policies.google.com/privacy" className="legal-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
        <p>We may disclose information if required to do so by law, court order, or in response to a valid request from a government or regulatory authority.</p>
      </>
    ),
  },
  {
    id: "cookies-analytics",
    heading: "Browser Storage & Analytics",
    content: (
      <>
        <p>The site stores your light or dark theme preference in your browser’s local storage. This preference is not a cookie and you can remove it by clearing this site’s browser data.</p>
        <p>Cloudflare Web Analytics measures page views and page-load performance using the browser Performance API. Cloudflare says it does not use visitors’ personal data and its Web Analytics beacon does not rely on analytics cookies. Read more in Cloudflare’s <a href="https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" className="legal-link" target="_blank" rel="noopener noreferrer">data collection documentation</a>.</p>
        <p>If you choose to play an embedded third-party trailer, the video provider may use its own storage or collect information under its privacy policy. You can manage cookies and site storage in your browser settings; clearing the theme preference returns the site to its default theme.</p>
      </>
    ),
  },
  {
    id: "data-security",
    heading: "Security of Your Data",
    content: (
      <>
        <p>We take reasonable steps to protect information we handle. Our website is served over HTTPS to encrypt communication between your browser and the site. No internet transmission or electronic storage method can be guaranteed completely secure.</p>
        <p>If you suspect unauthorized use of information you shared with us, please contact us by <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a> or {CONTACT_LINK}.</p>
      </>
    ),
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    content: (
      <>
        <p>We keep contact, session, and transaction records only for as long as needed to manage the service, resolve issues, maintain required business records, or meet legal obligations. Retention time depends on the record.</p>
        <p>You can ask us to delete information you have shared, subject to records we must retain by law, by emailing <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a> or contacting us by {CONTACT_LINK}.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    content: (
      <>
        <p>You may contact us to request access to or correction or deletion of information you have shared with us. Requests are handled subject to applicable legal and record-keeping requirements.</p>
        <p>You can also:</p>
        <ul className="legal-list">
          <li>Withdraw consent for marketing communications at any time.</li>
        </ul>
        <p>To exercise any of these rights, please email <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a> or contact us by {CONTACT_LINK}.</p>
      </>
    ),
  },
  {
    id: "policy-updates",
    heading: "Changes to This Policy",
    content: (
        <p>We may update this policy as our services or practices change. The date at the top shows when it was last revised. Please review the current version if you have questions about how information is handled.</p>
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
          <p className="legal-meta">Last updated: October 22, 2026</p>
          <p className="legal-intro">RD Game Zone™ is committed to handling your information responsibly and transparently. This policy covers our website and gaming-venue services.</p>
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
          <span>© {new Date().getFullYear()} RD Game Zone™. All rights in third-party materials remain with their respective owners.</span>
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
