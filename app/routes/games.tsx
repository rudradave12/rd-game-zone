import { Outlet } from "@remix-run/react";

/** Shared URL segment for the library index and individual game pages. */
export default function GamesRoute() {
  return <Outlet />;
}
