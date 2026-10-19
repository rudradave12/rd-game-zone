(() => {
  try {
    const theme = localStorage.getItem("rd-game-zone-theme") === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }

  // The app is client-rendered, so the browser otherwise discovers the hero
  // artwork only after the route bundle runs. Start the first slide request
  // during HTML parsing, but avoid downloading it on non-home routes.
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    const isPortrait = window.matchMedia("(max-width: 1100px) and (orientation: portrait)").matches;
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = isPortrait ? "/images/valorant-mobile-portraite.jpg" : "/images/hero/valorant.jpg";
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  }

  // The Top 10 carousel's first ranked artwork is the mobile library's LCP.
  // Request it during HTML parsing instead of waiting for the client route to mount.
  if (window.location.pathname === "/games") {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.type = "image/avif";
    preload.href = "/images/cards/gta-online.avif";
    preload.setAttribute("imagesrcset", "/images/cards/320/gta-online.avif 320w, /images/cards/gta-online.avif 640w");
    preload.setAttribute("imagesizes", "(max-width: 700px) calc(min(82vw, 340px) - 43px), (max-width: 1100px) calc(32vw - 48px), calc(30vw - 48px)");
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  }

  // Game details are client-rendered; start the selected title's hero-art
  // request while the document is still parsing rather than waiting for its
  // route component to mount.
  const gameArt = {
    "grand-theft-auto-vi": "/images/gta-vi-cover-optimized.webp",
    "call-of-duty-black-ops-7": "/images/cod-blackops-7-optimized.webp",
    "gta-online": "/images/gta-5online.jpeg",
    "valorant": "/images/valorant.jpg",
    "counter-strike-2": "/images/cs-go-2-optimized.webp",
    "apex-legends": "/images/apex-legends-optimized.webp",
    "fortnite": "/images/fortnite-optimized.webp",
    "call-of-duty-cold-war": "/images/cod-blackops-coldwar-optimized.webp",
    "call-of-duty-black-ops-iii": "/images/cod-blackops-3-optimized.webp",
    "back-4-blood": "/images/back-4-blood-optimized.webp",
    "world-war-z-aftermath": "/images/world-war-z-aftermath.jpeg",
    "black-myth-wukong": "/images/black-myth-wukong.jpeg",
    "god-war-ragnarok": "/images/god-of-war- regnarok-optimized.webp",
    "spider-man-2": "/images/spider-man-2.jpeg",
    "ghost-of-tsushima": "/images/ghost-of-tsushima-optimized.webp",
    "nfs-heat": "/images/nfs-heat.jpg",
    "nfs-hot-pursuit-remastered": "/images/nfs-hot-pursuit-remastered-optimized.webp",
    "ea-sports-fc-27": "/images/fc-27-optimized.webp",
    "fc-26": "/images/fc-26.jpeg",
    "cricket-24": "/images/cricket-24.jpg",
    "cricket-26": "/images/cricket-26.jpeg",
    "wwe-2k25": "/images/wwe-2k25-optimized.webp",
    "rocket-league": "/images/rocket-league-optimized.webp",
    "nba-2k25": "/images/nba-2k25.jpeg",
    "topspin-2k25": "/images/topspin-2k25.jpeg",
    "tekken-8": "/images/tekken-8-optimized.webp",
    "mortal-kombat-1": "/images/mortal-kombat-1-optimized.webp",
    "ufc-5": "/images/ufc-5.jpeg",
    "red-dead-redemption-2": "/images/red-dead-redemption-2.jpg",
    "far-cry-6": "/images/farcry-6-optimized.webp",
    "stray": "/images/stray-optimized.webp",
    "riders-republic": "/images/riders-republic-optimized.webp",
    "minecraft-legends": "/images/minecraft-legacy-optimized.webp",
    "call-of-duty-modern-warfare-iii": "/images/hero/modern-warfare-iii-desktop.webp",
    "disney-epic-mickey-rebrushed": "/images/epic-mickey-rebrushed.webp",
    "wwe-2k26": "/images/wwe-2k26-optimized.webp",
    "the-crew-2": "/images/the-crew-2-optimized.webp",
    "beech-buggy-racing-2": "/images/beech-bugy-2.jpeg",
    "speedstorm": "/images/speedstorm-optimized.webp",
    "road-redemption": "/images/road-redumption-optimized.webp",
    "f1-25": "/images/f1-25.webp",
    "asphalt-legends-unite": "/images/asphalt.jpeg",
  };
  const gameSlug = window.location.pathname.match(/^\/games\/([^/]+)$/)?.[1];
  const gameImage = gameSlug && gameArt[gameSlug];
  if (gameImage) {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = gameImage;
    preload.fetchPriority = "high";
    document.head.appendChild(preload);
  }
})();
