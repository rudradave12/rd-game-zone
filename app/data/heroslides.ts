/* ================================================================
   HERO SLIDES DATA
   ─────────────────────────────────────────────────────────────
   Each slide has:

   IMAGES (shown immediately as the responsive hero artwork)
   • imageDesktop        — 16:9 widescreen,  e.g. 1920×1080
   • imageMobilePortrait — 9:16 portrait,    e.g.  828×1792
   • imageMobileLandscape— 16:9 landscape,   e.g. 1792× 828

   BUTTONS
   • btn1 / btn2

   Each breakpoint references an appropriately sized still image. Keeping the
   landing hero image-led avoids downloading large autoplay videos before a
   visitor has chosen to watch a trailer.
   ================================================================ */

export type HeroSlide = {
  id: number;
  title: string;
  tagline: string;
  category: string;

  /* ── Responsive artwork ── */
  imageDesktop:         string;
  imageMobilePortrait:  string;
  imageMobileLandscape: string;

  /* ── Buttons ── */
  btn1: string;
  btn2: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "VALORANT",
    tagline: "5V5 CHARACTER-BASED TACTICAL FIREFIGHT",
    category: "TACTICAL FPS",

    imageDesktop:         "/images/hero/valorant.jpg",
    imageMobilePortrait:  "/images/valorant-mobile-portraite.jpg",
    imageMobileLandscape: "/images/hero/valorant.jpg",

    btn1: "BEST GAME",
    btn2: "FPS ACTION",
  },

  {
    id: 2,
    title: "ASPHALT LEGENDS UNITE",
    tagline: "LEGENDS CHANGE THE GAME",
    category: "RACING",

    imageDesktop:         "/images/hero/asphalt.jpg",
    imageMobilePortrait:  "/images/hero/asphalt-portrait.jpg",
    imageMobileLandscape: "/images/hero/asphalt.jpg",

    btn1: "BEST GAME",
    btn2: "ARCADE RACING",
  },

  {
    id: 3,
    title: "CALL OF DUTY: MODERN WARFARE III",
    tagline: "THE FIGHT IS CLOSER THAN EVER",
    category: "FPS ACTION",

    imageDesktop:         "/images/hero/modern-warfare-iii-desktop.webp",
    imageMobilePortrait:  "/images/hero/modern-warfare-iii-mobile.webp",
    imageMobileLandscape: "/images/hero/modern-warfare-iii-desktop.webp",

    btn1: "BEST GAME",
    btn2: "MULTIPLAYER",
  },

  {
    id: 4,
    title: "CALL OF DUTY BLACK OPS 7",
    tagline: "A NEW ERA OF COVERT OPERATIONS",
    category: "FPS ACTION",
 
    imageDesktop:         "/images/hero/cod-blackops-7.jpg",
    imageMobilePortrait:  "/images/hero/cod-blackops-7-portrait.jpg",
    imageMobileLandscape: "/images/hero/cod-blackops-7.jpg",

    btn1: "BEST GAME",
    btn2: "FPS ACTION",
  },

  {
    id: 5,
    title: "GRAND THEFT AUTO VI",
    tagline: "A NEW ERA AWAITS IN LEONIDA",
    category: "OPEN WORLD",

    imageDesktop:         "/images/gta-vi-cover.webp",
    imageMobilePortrait:  "/images/hero/gta-vi-mobile.webp",
    imageMobileLandscape: "/images/gta-vi-cover.webp",

    btn1: "COMING SOON",
    btn2: "OPEN WORLD",
  },
];
