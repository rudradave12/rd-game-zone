import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import Navbar from "~/components/Navbar";

/* ================= STYLES ================= */
/* Design system MUST load first — every stylesheet below consumes its tokens. */
import designSystem from "~/styles/design-system.css?url";
import globalStyles from "~/styles/global.css?url";
import siteStyles from "~/styles/site.css?url";
import responsiveLayouts from "~/styles/responsive-layouts.css?url";

/* ================================================================
   SEO: MetaFunction — Advanced
   ✅ Core meta, Open Graph, Twitter/X, PWA, Geo, Canonical
   ✅ Static compatible (no loader needed)
   ✅ Cloudflare Pages compatible
   ================================================================ */
export const meta: MetaFunction = () => [
  /* ── Core ── */
  { title: "RD Game Zone | #1 Gaming Cafe in Ahmedabad – PS5, PC & LAN Gaming" },
  {
    name: "description",
    content:
      "RD Game Zone — Ahmedabad's premier gaming cafe. Play PS5, PS4, High-End PCs, 240Hz Esports displays, LAN multiplayer & top AAA titles. Book your slot now!",
  },
  {
    name: "keywords",
    content:
      "gaming cafe ahmedabad, ps5 gaming ahmedabad, pc gaming cafe, esports ahmedabad, lan gaming, rd game zone, gaming zone ahmedabad, best gaming cafe india, shahibag gaming zone, gaming cafe near me ahmedabad",
  },
  { name: "author",  content: "RD Game Zone" },
  { name: "robots",  content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
  { name: "revisit-after", content: "7 days" },
  { name: "language", content: "English" },
  { name: "rating",   content: "general" },

  /* ── Viewport (notch / Dynamic Island) ── */
  { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },

  /* ── Open Graph ── */
  { property: "og:type",         content: "website" },
  { property: "og:url",          content: "https://rdgamezone.com/" },
  { property: "og:title",        content: "RD Game Zone | #1 Gaming Cafe in Ahmedabad" },
  { property: "og:description",  content: "PS5, PC Gaming, 240Hz Esports displays, LAN multiplayer. Ahmedabad's best gaming experience." },
  { property: "og:image",        content: "https://rdgamezone.com/images/cod-7-new-landscape.jpg" },
  { property: "og:image:width",  content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt",    content: "RD Game Zone — Gaming Cafe Ahmedabad" },
  { property: "og:locale",       content: "en_IN" },
  { property: "og:site_name",    content: "RD Game Zone" },

  /* ── Twitter / X Card ── */
  { name: "twitter:card",        content: "summary_large_image" },
  { name: "twitter:title",       content: "RD Game Zone | #1 Gaming Cafe Ahmedabad" },
  { name: "twitter:description", content: "PS5, PC, 240Hz Esports, LAN Gaming in Ahmedabad." },
  { name: "twitter:image",       content: "https://rdgamezone.com/images/cod-7-new-landscape.jpg" },
  { name: "twitter:image:alt",   content: "RD Game Zone Gaming Cafe" },

  /* ── Mobile / PWA ── */
  { name: "theme-color",                           content: "#f5f8ff" },
  { name: "mobile-web-app-capable",                content: "yes" },
  { name: "apple-mobile-web-app-capable",          content: "yes" },
  { name: "apple-mobile-web-app-title",            content: "RD Game Zone" },
  { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
  { name: "format-detection",                      content: "telephone=yes" },
  { name: "msapplication-TileColor",               content: "#f5f8ff" },

  /* ── Geo targeting (local SEO) ── */
  { name: "geo.region",    content: "IN-GJ" },
  { name: "geo.placename", content: "Ahmedabad, Gujarat, India" },
  { name: "geo.position",  content: "23.0452531;72.5892595" },
  { name: "ICBM",          content: "23.0452531, 72.5892595" },

  /* ── Content Security — basic inline declarative ── */
  /* ✅ NOTE: Full CSP + security headers should be done in
     Cloudflare Pages _headers file (see security note below).
     We only add the referrer policy here. */
  { name: "referrer", content: "strict-origin-when-cross-origin" },
];

/* ================================================================
   LINKS — Preload, Fonts, Stylesheets, Icons
   ================================================================ */
export const links: LinksFunction = () => [
  /* ── Font preconnect ── */
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },

  /* ── Google Font — Single Unified Font: Inter ── */
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap",
  },

  /* ── Core styles ── */
  { rel: "stylesheet", href: designSystem },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: siteStyles },
  { rel: "stylesheet", href: responsiveLayouts },

  /* ── Home page ── */

  /* ── Game Library ── */

  /* ── Extra ── */

  /* ── Icons ── */
  { rel: "icon", href: "/icons/logo.svg", type: "image/svg+xml" },
  { rel: "manifest", href: "/manifest.webmanifest" },

  /* ── Canonical (static, home page) ── */
  { rel: "canonical", href: "https://rdgamezone.com/" },
];

/* ================================================================
   STRUCTURED DATA — Local Business (Schema.org JSON-LD)
   ✅ Advanced: GeoCoordinates, OpeningHours, OfferCatalog,
      AggregateRating, hasMap, amenityFeature
   ================================================================ */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness"],
  "@id": "https://rdgamezone.com/#business",
  "name": "RD Game Zone",
  "legalName": "RD Game Zone",
  "description":
    "Premier gaming cafe in Ahmedabad offering PS5, PS4, High-End Gaming PCs, 240Hz esports displays, LAN multiplayer and top AAA game titles.",
  "url": "https://rdgamezone.com",
  "telephone": "+917665533991",
  "priceRange": "₹100 - ₹400 per hour",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI",
  "image": [
    "https://rdgamezone.com/images/cod-7-new-landscape.jpg"
  ],
  "logo": "https://rdgamezone.com/icons/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "First floor, A-113, opp. Shwami Narayan temple",
    "addressLocality": "Shahibag",
    "addressRegion": "Gujarat",
    "postalCode": "380004",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.0452531",
    "longitude": "72.5892595"
  },
  "hasMap": "https://maps.app.goo.gl/MZgKwhA8TPxEJfdD7",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday","Tuesday","Wednesday","Thursday",
        "Friday","Saturday","Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "PS5 Gaming", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "PS4 Gaming", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "High-End Gaming PC", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "240Hz Esports Display", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "LAN Multiplayer", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Gaming Sessions",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "32\" TV + PS4 — 1 Person",
        "price": "100",
        "priceCurrency": "INR",
        "unitText": "HOUR",
        "eligibleQuantity": { "@type": "QuantitativeValue", "value": 1 }
      },
      {
        "@type": "Offer",
        "name": "50\" TV Gaming",
        "price": "120",
        "priceCurrency": "INR",
        "unitText": "HOUR"
      },
      {
        "@type": "Offer",
        "name": "65\" TV + PS5 — 1 Person",
        "price": "200",
        "priceCurrency": "INR",
        "unitText": "HOUR"
      },
      {
        "@type": "Offer",
        "name": "Gaming PC — Regular",
        "price": "100",
        "priceCurrency": "INR",
        "unitText": "HOUR"
      },
      {
        "@type": "Offer",
        "name": "Gaming PC — Pro",
        "price": "130",
        "priceCurrency": "INR",
        "unitText": "HOUR"
      }
    ]
  },
  "sameAs": []
};

/* ── Breadcrumb structured data ── */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://rdgamezone.com/"        },
    { "@type": "ListItem", "position": 2, "name": "Game Library", "item": "https://rdgamezone.com/games"   },
    { "@type": "ListItem", "position": 3, "name": "Pricing",      "item": "https://rdgamezone.com/#pricing" },
    { "@type": "ListItem", "position": 4, "name": "Booking",      "item": "https://rdgamezone.com/#booking" }
  ]
};

/* ── Website structured data (enables Sitelinks Searchbox) ── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rdgamezone.com/#website",
  "url": "https://rdgamezone.com",
  "name": "RD Game Zone",
  "description": "Ahmedabad's #1 Gaming Cafe — PS5, PC, LAN & Esports",
  "inLanguage": "en-IN",
  "publisher": {
    "@id": "https://rdgamezone.com/#business"
  }
};

/* ================================================================
   HASH SCROLL — works with static SPA routing
   ================================================================ */
function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    // Small delay so Remix finishes rendering
    setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 120);
  }, [location]);

  return null;
}

const initialThemeScript = `(() => {
  try {
    const theme = localStorage.getItem("rd-game-zone-theme") === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;

/* ================================================================
   APP ROOT
   ✅ Static / Cloudflare Pages compatible (no SSR exports needed)
   ✅ JSON-LD injected inline in <head>
   ================================================================ */
export default function App() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />

        {/* ── Cloudflare / browser hints ── */}
        {/* DNS prefetch for third parties */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com"       />

        <Meta />
        <Links />

        {/* ── Local Business JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* ── Breadcrumb JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* ── Website JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body>
        <HashScrollHandler />
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/* ================================================================
   ERROR BOUNDARY — branded 404 / error screen
   ----------------------------------------------------------------
   This is NOT a new route. Remix renders this in place of <Outlet />
   whenever a route throws or a URL doesn't match, so bad URLs stop
   silently rendering the homepage. Cloudflare config is unaffected.
   ================================================================ */
/* SPA mode generates the Cloudflare Pages index from this component. Keeping
   it branded prevents a blank/system loading document while route modules load. */
export function HydrateFallback() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body className="app-loading">
        <main className="app-loading__main" aria-label="Loading RD Game Zone">
          <div className="app-loading__mark" aria-hidden="true"><img src="/icons/logo.svg" alt="" width="40" height="41" /></div>
          <p>RD Game Zone</p>
          <span>Loading your next session</span>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const heading = status === 404 ? "Page not found" : "Something went wrong";
  const message =
    status === 404
      ? "That page doesn't exist — it may have moved, or the link was mistyped."
      : "An unexpected error occurred. Try again, or head back to the home page.";

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{`${status} · ${heading} | RD Game Zone`}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="rd-error">
          <div className="rd-error__panel">
            <p className="rd-error__code">{status}</p>
            <h1 className="rd-error__title">{heading}</h1>
            <p className="rd-error__text">{message}</p>
            <div className="rd-error__actions">
              <a href="/" className="rd-btn rd-btn--primary">Back to home</a>
              <a href="/games" className="rd-btn rd-btn--secondary">Browse games</a>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
