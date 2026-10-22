import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@remix-run/react";
import CinematicHero from "~/components/CinematicHero";

const AboutSection = lazy(() => import("~/components/About"));
const Pricing = lazy(() => import("~/components/Pricing"));
const Booking = lazy(() => import("~/components/Booking"));
const GameLibraryHome = lazy(() => import("~/components/GameLibraryHome"));
const Experience = lazy(() => import("~/components/Experience"));
const EsportsTicker = lazy(() => import("~/components/EsportsTicker"));
const Footer = lazy(() => import("~/components/Footer"));

type DeferredSectionProps = {
  id?: string;
  name: string;
  children: ReactNode;
};

function DeferredContent({ onReady, children }: { onReady: () => void; children: ReactNode }) {
  useEffect(() => onReady(), [onReady]);
  return children;
}

function DeferredSection({ id, name, children }: DeferredSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const [shouldMount, setShouldMount] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const markContentReady = useCallback(() => setContentReady(true), []);

  useEffect(() => {
    if (id && hash === `#${id}`) {
      setShouldMount(true);
      return;
    }

    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setShouldMount(true);
      observer.disconnect();
    }, { rootMargin: "0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, [hash, id]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`home-deferred home-deferred--${name}${contentReady ? " home-deferred--loaded" : ""}`}
      aria-busy={!contentReady}
    >
      {shouldMount ? (
        <Suspense fallback={<div className="home-deferred__placeholder" aria-hidden="true" />}>
          <DeferredContent onReady={markContentReady}>{children}</DeferredContent>
        </Suspense>
      ) : null}
    </div>
  );
}

/* Page-level meta override (root.tsx handles the main SEO) */
export const meta: MetaFunction = () => [
  { title: "RD Game Zone™ | Gaming & E-sports Venue in Ahmedabad" },
  {
    name: "description",
    content:
      "Visit RD Game Zone™, an independent gaming and e-sports venue in Shahibag, Ahmedabad. Explore session options, games, rates, and directions.",
  },
];

/* Preload only on the route that renders this cinematic hero. */
export const links: LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: "/images/hero/valorant.jpg",
    media: "(min-width: 1101px)",
  },
  {
    rel: "preload",
    as: "image",
    href: "/images/valorant-mobile-portraite.jpg",
    media: "(max-width: 1100px)",
  },
];

export default function Home() {
  return (
    <main aria-label="RD Game Zone Homepage">
      <CinematicHero />
      <DeferredSection name="ticker"><EsportsTicker /></DeferredSection>
      <DeferredSection id="about" name="about"><AboutSection /></DeferredSection>
      <DeferredSection id="game-library" name="library"><GameLibraryHome /></DeferredSection>
      <DeferredSection id="pricing" name="pricing"><Pricing /></DeferredSection>
      <DeferredSection id="booking" name="booking"><Booking /></DeferredSection>
      <DeferredSection name="experience"><Experience /></DeferredSection>
      <DeferredSection name="footer"><Footer /></DeferredSection>
    </main>
  );
}
