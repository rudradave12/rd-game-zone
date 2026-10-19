import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { games } from "~/data/games";

type SectionId = "about" | "pricing" | "booking";
type Theme = "light" | "dark";

const themeStorageKey = "rd-game-zone-theme";

const navigation = [
  { label: "Home", type: "link", to: "/" },
  { label: "About", type: "section", id: "about" as SectionId },
  { label: "Rates", type: "section", id: "pricing" as SectionId },
  { label: "Visit", type: "section", id: "booking" as SectionId },
  { label: "Guidelines", type: "link", to: "/guidelines" },
] as const;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHome);
  const [navHidden, setNavHidden] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const applyTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      nextTheme === "dark" ? "#06101f" : "#f5f8ff",
    );
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    try {
      applyTheme(window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light");
    } catch {
      applyTheme("light");
    }
  }, [applyTheme]);

  useEffect(() => {
    let previousY = window.scrollY;
    const update = () => {
      const currentY = Math.max(0, window.scrollY);
      setScrolled(!isHome || currentY > 18);

      if (menuOpen || currentY < 96) {
        setNavHidden(false);
      } else if (currentY - previousY > 5) {
        setNavHidden(true);
      } else if (previousY - currentY > 5) {
        setNavHidden(false);
      }
      previousY = currentY;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome, menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.classList.add("nav-menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("nav-menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const goToSection = useCallback((id: SectionId) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }
    const section = document.getElementById(id);
    if (!section) return;
    const offset = window.innerWidth <= 760 ? 66 : 78;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [isHome, navigate]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // A visitor can still use the toggle when local storage is unavailable.
    }
  };

  const renderItem = (item: (typeof navigation)[number], mobile = false) => {
    const className = mobile ? "ps-menu__item" : "ps-nav__link";
    if (item.type === "section") {
      return <button key={item.label} type="button" className={className} onClick={() => goToSection(item.id)}>{item.label}</button>;
    }
    return (
      <Link key={item.label} to={item.to} className={`${className}${location.pathname === item.to ? " is-active" : ""}`} onClick={() => setMenuOpen(false)}>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header className={`ps-nav${scrolled ? " ps-nav--solid" : ""}${navHidden && !menuOpen ? " ps-nav--hidden" : ""}`} inert={navHidden && !menuOpen}>
        <Link
          to="/"
          className="ps-nav__brand"
          aria-label="RD Game Zone home"
          onClick={(event) => {
            setMenuOpen(false);
            if (location.pathname === "/") {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="ps-nav__mark" aria-hidden="true"><img src="/icons/logo.svg" alt="" width="27" height="28" /></span>
          <span className="ps-nav__brand-copy"><strong>RD Game Zone</strong><small>Ahmedabad · E-sports hub</small></span>
        </Link>
        <nav className="ps-nav__links" aria-label="Main navigation">{navigation.map((item) => renderItem(item))}</nav>
        <div className="ps-nav__actions">
          <Link to="/games" className="ps-button ps-button--primary ps-nav__cta">Browse games</Link>
          <button
            type="button"
            className="ps-nav__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <button type="button" className="ps-nav__menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </header>
      <div className={`ps-menu${menuOpen ? " ps-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div id="mobile-navigation" className="ps-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <p className="ps-menu__eyebrow">Explore RD Game Zone</p>
          <nav className="ps-menu__links" aria-label="Mobile navigation">{navigation.map((item) => renderItem(item, true))}</nav>
          <Link to="/games" className="ps-button ps-button--primary ps-menu__cta" onClick={() => setMenuOpen(false)}>View all {games.length} games</Link>
        </div>
        <button type="button" className="ps-menu__backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
