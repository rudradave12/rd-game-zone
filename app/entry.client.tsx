import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { createRoot } from "react-dom/client";

startTransition(() => {
  const app = (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );

  // SPA mode intentionally emits HydrateFallback instead of the route markup,
  // so mount a fresh root rather than hydrating incompatible placeholder HTML.
  // The document remains visually covered by the compact loader until the
  // route stylesheets finish attaching, avoiding an unstyled first-frame jump.
  createRoot(document).render(app);
});

// Keep deployed clients current. The worker uses a network-first strategy for
// versioned assets and deliberately never caches HTML routes, so a previous
// deployment cannot keep serving an outdated homepage.
if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    () => {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
    },
    { once: true },
  );
}
