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
})();
