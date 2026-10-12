/* ================================================================
   HERO SLIDES DATA
   ─────────────────────────────────────────────────────────────
   Each slide has:

   IMAGES (shown immediately, also fallback while video loads)
   • imageDesktop        — 16:9 widescreen,  e.g. 1920×1080
   • imageMobilePortrait — 9:16 portrait,    e.g.  828×1792
   • imageMobileLandscape— 16:9 landscape,   e.g. 1792× 828

   VIDEOS (play on top of image once loaded)
   Desktop:
   • videoDesktopMp4                         — 16:9
   Mobile portrait:
   • videoPortraitMp4                        — 9:16 vertical
   Mobile landscape:
   • videoLandscapeMp4                       — 16:9

   BUTTONS
   • btn1 / btn2

   Each breakpoint references the best matching MP4 source in public/videos.
   ================================================================ */

export type HeroSlide = {
  id: number;
  title: string;
  tagline: string;
  category: string;

  /* ── Images (used as immediate bg + fallback while video loads) ── */
  imageDesktop:         string;
  imageMobilePortrait:  string;
  imageMobileLandscape: string;

  /* ── Desktop video (16:9) ── */
  videoDesktopMp4: string;

  /* ── Mobile portrait video (9:16 vertical) ── */
  videoPortraitMp4: string;

  /* ── Mobile landscape video (16:9, separate file) ── */
  videoLandscapeMp4: string;

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

    imageDesktop:         "/images/valorant.jpg",
    imageMobilePortrait:  "/images/valorant-mobile-portraite.jpg",
    imageMobileLandscape: "/images/valorant.jpg",

    videoDesktopMp4:   "/videos/Valorant-Desktop-Lanscape-New-Kj-Compressed.mp4",
    
    videoPortraitMp4:  "/videos/valorant-mobile-portrait.mp4",
    
    videoLandscapeMp4: "/videos/valorant new compressed.mp4",

    btn1: "BEST GAME",
    btn2: "FPS ACTION",
  },

  {
    id: 2,
    title: "ASPHALT LEGENDS UNITE",
    tagline: "LEGENDS CHANGE THE GAME",
    category: "RACING",

    imageDesktop:         "/images/asphalt.jpeg",
    imageMobilePortrait:  "/images/asphalt-mobile-potraite.jpg",
    imageMobileLandscape: "/images/asphalt.jpeg",

    videoDesktopMp4:   "/videos/Asphalt Legends Unite.mp4",
    
    videoPortraitMp4:  "/videos/asphalt-mobile-portrait.mp4",
    
    videoLandscapeMp4: "/videos/Asphalt Legends Unite.mp4",

    btn1: "BEST GAME",
    btn2: "ARCADE RACING",
  },

  {
    id: 3,
    title: "BLACK MYTH WUKONG",
    tagline: "RECLAIM THE LEGEND",
    category: "ACTION ADVENTURE",

    imageDesktop:         "/images/black-myth-wukong.jpeg",
    imageMobilePortrait:  "/images/black-myth-wukong-mobile-portraite.jpg",
    imageMobileLandscape: "/images/black-myth-wukong.jpeg",

    videoDesktopMp4:   "/videos/black myth wukong.mp4",
    
    videoPortraitMp4:  "/videos/wukong-mobile-portrait.mp4",
    
    videoLandscapeMp4: "/videos/black myth wukong.mp4",

    btn1: "BEST GAME",
    btn2: "ACTION ADVENTURE",
  },

  {
    id: 4,
    title: "CALL OF DUTY BLACK OPS 7",
    tagline: "A NEW ERA OF COVERT OPERATIONS",
    category: "FPS ACTION",
 
    imageDesktop:         "/images/cod-7-new-landscape.jpg",
    imageMobilePortrait:  "/images/cod-7-mobile-portraite.jpg",
    imageMobileLandscape: "/images/cod-7-new-landscape.jpg",

    videoDesktopMp4:   "/videos/cod blackops 7 new.mp4",
    
    videoPortraitMp4:  "/videos/cod-7-mobile-portrait.mp4",
    
    videoLandscapeMp4: "/videos/cod blackops 7 new.mp4",

    btn1: "BEST GAME",
    btn2: "FPS ACTION",
  },

  {
    id: 5,
    title: "GTA ONLINE",
    tagline: "BUILD YOUR CRIMINAL EMPIRE",
    category: "OPEN WORLD",

    imageDesktop:         "/images/gta-5online.jpeg",
    imageMobilePortrait:  "/images/gta-5online-mobile-portrait.jpeg",
    imageMobileLandscape: "/images/gta-5online.jpeg",

    videoDesktopMp4:   "/videos/mobile/GTA Online.mp4",
    
    videoPortraitMp4:  "/videos/gta-online-mobile-portraite.mp4",
    
    videoLandscapeMp4: "/videos/GTA Online.mp4",

    btn1: "OPEN WORLD",
    btn2: "MULTIPLAYER",
  },
];
