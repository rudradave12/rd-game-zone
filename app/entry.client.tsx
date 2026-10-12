import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

startTransition(() => {
  const app = (
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );

  // SPA mode ships the branded loading shell from HydrateFallback rather than
  // server-rendered route markup. Mounting a fresh React root there avoids a
  // hydration mismatch on the first visit, while preserving regular hydration
  // if SSR is enabled later.
  if (document.body.classList.contains("app-loading")) {
    createRoot(document).render(app);
  } else {
    hydrateRoot(document, app);
  }
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
