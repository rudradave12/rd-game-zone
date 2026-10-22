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
import gameCatalogStyles from "~/styles/game-catalog.css?url";
import gameDetailStyles from "~/styles/game-detail.css?url";
import gameLibraryShellStyles from "~/styles/game-library-shell.css?url";
import { gameArtworkBySlug, sourceArtworkWidths } from "~/data/game-artwork";

const serializedGameArtworkBySlug = JSON.stringify(gameArtworkBySlug);
const serializedSourceArtworkWidths = JSON.stringify(sourceArtworkWidths);

/* ================= STYLES ================= */
/* The aggregate preserves CSS order while avoiding multiple blocking fetches. */
import appStyles from "~/styles/app.css?url";

/* Keep theme selection and the critical artwork hint inline in the document.
   This script runs before the stylesheet links, so it must not add a separate
   network round-trip that delays both CSS discovery and the LCP image. */
const preHydrationScript = `(() => {
  try {
    const theme = localStorage.getItem("rd-game-zone-theme") === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }

  const addImageHint = (href, imageSrcset, imageSizes, imageType) => {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = href;
    if (imageSrcset) preload.imageSrcset = imageSrcset;
    if (imageSizes) preload.imageSizes = imageSizes;
    if (imageType) preload.type = imageType;
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  };
  const addStyleHint = (href) => {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "style";
    preload.href = href;
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  };
  const addModuleHint = (href) => {
    if (!href || href.startsWith("__RD_")) return;
    const preload = document.createElement("link");
    preload.rel = "modulepreload";
    preload.href = href;
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  };

  const path = window.location.pathname;
  addStyleHint(path === "/games" ? "${gameLibraryShellStyles}" : "${appStyles}");
  if (path === "/games") addModuleHint("__RD_GAMES_INDEX_MODULE__");
  else if (/^\\/games\\/[^/]+$/.test(path)) addModuleHint("__RD_GAMES_SLUG_MODULE__");

  if (path === "/" || path === "/index.html") {
    const isPortrait = window.matchMedia("(max-width: 1100px) and (orientation: portrait)").matches;
    addImageHint(isPortrait ? "/images/valorant-mobile-portraite.jpg" : "/images/hero/valorant.jpg");
  }

  if (path === "/games") {
    addStyleHint("${gameCatalogStyles}");
    addImageHint(
      "/images/cards/gta-online.avif",
      "/images/cards/320/gta-online.avif 320w, /images/cards/520/gta-online.avif 520w, /images/cards/gta-online.avif 640w",
      "(max-width: 760px) 70vw, (max-width: 1200px) 24vw, 25vw",
      "image/avif"
    );
  }

  const gameArt = ${serializedGameArtworkBySlug};
  const artworkWidths = ${serializedSourceArtworkWidths};
  const responsiveHint = (image) => {
    const sourceWidth = artworkWidths[image];
    if (!sourceWidth) return { src: image, srcset: undefined };
    const stem = image.replace(/\\.[a-z0-9]+$/i, "");
    const candidates = [480, 800, 1280]
      .filter((width) => sourceWidth > width)
      .map((width) => stem + "-" + width + ".webp " + width + "w");
    candidates.push(image + " " + sourceWidth + "w");
    return {
      src: sourceWidth > 800 ? stem + "-800.webp" : image,
      srcset: candidates.join(", "),
    };
  };
  const gameSlug = path.match(/^\\/games\\/([^/]+)$/)?.[1];
  if (gameSlug) {
    addStyleHint("${gameCatalogStyles}");
    addStyleHint("${gameDetailStyles}");
  }
  const isPortrait = window.matchMedia("(max-width: 700px) and (orientation: portrait)").matches;
  const isFcPortrait = gameSlug === "ea-sports-fc-27" && isPortrait;
  const isValorantSmall = gameSlug === "valorant" && window.matchMedia("(max-width: 700px)").matches;
  const isGtaOnline = gameSlug === "gta-online";
  const isFc = gameSlug === "ea-sports-fc-27";
  const baseGameImage = gameSlug && gameArt[gameSlug];
  const gameImage = isFcPortrait
    ? "/images/fc-27-mobile-480.avif"
    : isValorantSmall
      ? "/images/cards/valorant.avif"
      : isGtaOnline
        ? "/images/gta-online-hero-900.avif"
        : isFc
          ? "/images/fc-27-optimized.avif"
          : baseGameImage;
  const baseResponsiveHint = baseGameImage ? responsiveHint(baseGameImage) : null;
  const gameImageSrcset = gameSlug === "forza-horizon-6"
    ? "/images/forza-horizon-6-480.webp 480w, /images/forza-horizon-6-800.webp 800w, /images/forza-horizon-6-1280.webp 1280w, /images/forza-horizon-6-optimized.webp 1920w"
    : isFcPortrait
      ? "/images/fc-27-mobile-480.avif 480w, /images/fc-27-mobile-640.avif 640w"
      : isValorantSmall
        ? "/images/cards/320/valorant.avif 320w, /images/cards/valorant.avif 640w"
        : isGtaOnline
          ? "/images/gta-online-hero-480.avif 480w, /images/gta-online-hero-900.avif 900w"
          : gameImage === baseGameImage
            ? baseResponsiveHint?.srcset
            : undefined;
  const gameImageSizes = isFcPortrait || isValorantSmall || isGtaOnline
    ? "100vw"
    : gameImage === baseGameImage
      ? "(max-width: 1480px) 100vw, 1480px"
      : undefined;
  const gameImageType = isFc || isValorantSmall || isGtaOnline ? "image/avif" : undefined;
  if (gameImage) {
    addImageHint(
      gameImage === baseGameImage ? baseResponsiveHint?.src : gameImage,
      gameImageSrcset,
      gameImageSizes,
      gameImageType
    );
  }

})();`;

/* ================================================================
   SEO: MetaFunction — Advanced
   ✅ Core meta, Open Graph, Twitter/X, PWA, Geo, Canonical
   ✅ Static compatible (no loader needed)
   ✅ Cloudflare Pages compatible
   ================================================================ */
export const meta: MetaFunction = () => [
  /* ── Core ── */
  { title: "RD Game Zone™ | Gaming & E-sports Venue in Ahmedabad" },
  {
    name: "description",
    content:
      "RD Game Zone™ is an independent gaming and e-sports venue in Shahibag, Ahmedabad. Explore session options, rates, the game library, and visit details.",
  },
  {
    name: "keywords",
    content:
      "RD Game Zone, gaming venue Ahmedabad, PS5 gaming Ahmedabad, PC gaming Ahmedabad, e-sports Ahmedabad, LAN gaming, Shahibag gaming zone",
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
  { property: "og:url",          content: "https://rd-game-zone.pages.dev/" },
  { property: "og:title",        content: "RD Game Zone™ | Gaming & E-sports Venue in Ahmedabad" },
  { property: "og:description",  content: "An independent gaming and e-sports venue in Shahibag, Ahmedabad. Explore sessions, rates, games, and visit details." },
  { property: "og:image",        content: "https://rd-game-zone.pages.dev/images/cod-7-new-landscape.jpg" },
  { property: "og:image:width",  content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt",    content: "RD Game Zone gaming venue in Ahmedabad" },
  { property: "og:locale",       content: "en_IN" },
  { property: "og:site_name",    content: "RD Game Zone" },

  /* ── Twitter / X Card ── */
  { name: "twitter:card",        content: "summary_large_image" },
  { name: "twitter:title",       content: "RD Game Zone™ | Gaming & E-sports Venue in Ahmedabad" },
  { name: "twitter:description", content: "An independent gaming and e-sports venue in Shahibag, Ahmedabad." },
  { name: "twitter:image",       content: "https://rd-game-zone.pages.dev/images/cod-7-new-landscape.jpg" },
  { name: "twitter:image:alt",   content: "RD Game Zone gaming venue in Ahmedabad" },

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
  /* ── Icons ── */
  { rel: "icon", href: "/icons/logo.svg", type: "image/svg+xml" },
  { rel: "manifest", href: "/manifest.webmanifest" },
  { rel: "ard", href: "/.well-known/ard.json", type: "application/ld+json" },
  { rel: "ai-catalog", href: "/.well-known/ai-catalog.json", type: "application/json" },

  /* ── Canonical (static, home page) ── */
  { rel: "canonical", href: "https://rd-game-zone.pages.dev/" },
];

/* ================================================================
   STRUCTURED DATA — Local Business (Schema.org JSON-LD)
   ✅ Advanced: GeoCoordinates, OpeningHours, OfferCatalog,
      hasMap, amenityFeature
   ================================================================ */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EntertainmentBusiness"],
  "@id": "https://rd-game-zone.pages.dev/#business",
  "name": "RD Game Zone",
  "description":
    "Independent gaming and e-sports venue in Shahibag, Ahmedabad, with console, PC, and LAN gaming sessions.",
  "url": "https://rd-game-zone.pages.dev",
  "telephone": "+917665533991",
  "priceRange": "₹100 - ₹400 per hour",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, UPI",
  "image": [
    "https://rd-game-zone.pages.dev/images/cod-7-new-landscape.jpg"
  ],
  "logo": "https://rd-game-zone.pages.dev/icons/logo.svg",
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
    { "@type": "ListItem", "position": 1, "name": "Home",         "item": "https://rd-game-zone.pages.dev/"        },
    { "@type": "ListItem", "position": 2, "name": "Game Library", "item": "https://rd-game-zone.pages.dev/games"   },
    { "@type": "ListItem", "position": 3, "name": "Pricing",      "item": "https://rd-game-zone.pages.dev/#pricing" },
    { "@type": "ListItem", "position": 4, "name": "Booking",      "item": "https://rd-game-zone.pages.dev/#booking" }
  ]
};

/* ── Website structured data (enables Sitelinks Searchbox) ── */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rd-game-zone.pages.dev/#website",
  "url": "https://rd-game-zone.pages.dev",
  "name": "RD Game Zone",
  "description": "Independent gaming and e-sports venue in Shahibag, Ahmedabad.",
  "inLanguage": "en-IN",
  "publisher": {
    "@id": "https://rd-game-zone.pages.dev/#business"
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

/* ================================================================
   APP ROOT
   ✅ Static / Cloudflare Pages compatible (no SSR exports needed)
   ✅ JSON-LD injected inline in <head>
   ================================================================ */
export default function App() {
  const location = useLocation();
  const pageStyles = location.pathname === "/games" ? gameLibraryShellStyles : appStyles;

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <script dangerouslySetInnerHTML={{ __html: preHydrationScript }} />
        <link rel="stylesheet" href={pageStyles} />
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
/* SPA mode generates the Cloudflare Pages index from this component. */
export function HydrateFallback() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <script dangerouslySetInnerHTML={{ __html: preHydrationScript }} />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
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
