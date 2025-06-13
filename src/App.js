import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import RoofLeadGen from "./components/RoofLeadGen";
import RoofRepairProcess from "./components/RoofRepairProcess";
import DamageTracker from "./components/DamageTracker";
import RoofFAQ from "./components/RoofFaq";
import BlogPage from "./components/BlogPage";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/Contact";

// DO NOT confuse with any .coms, we are texasroofing.info only!
const navLinks = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/process" },
  { name: "Damage Tracker", path: "/damage-tracker" },
  { name: "FAQ", path: "/faq" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar({ logoSrc, setLogoSrc }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      navigate("/damage-tracker");
    } else {
      navigate("/");
    }
  };
  const isActive = (path) => location.pathname === path;

  return (
    
    <nav className="navbar-root">
      <div className="navbar-container">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          className="logo-btn"
          aria-label="Roofers Home"
          tabIndex={0}
        >
          <img
            src={logoSrc}
            alt="Find The Best Roofers"
            className="nav-logo"
            onMouseEnter={() => setLogoSrc("/findthebestroofersblue.png")}
            onMouseLeave={() => setLogoSrc("/findthebestroofersred.png")}
            draggable={false}
          />
        </button>
        {/* Hamburger */}
        <button
          className="hamburger"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        {/* Links */}
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link${isActive(link.path) ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Styles */}
      <style>{`
        .navbar-root {
          width: 100%;
          background: #18428a;
          box-shadow: 0 2px 16px #0c234016;
          z-index: 12;
        }
        .navbar-container {
          max-width: 1152px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4em 2vw 0.4em 2vw;
        }
        .logo-btn {
          padding: 0;
          border: none;
          background: transparent;
          margin-right: 6px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .nav-logo {
          height: 80px;
          width: 80px;
          object-fit: contain;
          background: transparent;
          border: none;
          box-shadow: none;
          outline: none;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .nav-link {
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.1rem;
          padding: 0.25em 1em;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .nav-link:hover, .nav-link.active {
          background: #2b56a5;
          color: #ffd700;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: transparent;
          border: none;
          margin-left: 8px;
          cursor: pointer;
        }
        .hamburger span {
          width: 28px;
          height: 3px;
          background: #fff;
          border-radius: 3px;
          display: block;
        }
        @media (max-width: 790px) {
          .navbar-container { flex-wrap: wrap; }
          .nav-links {
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            background: #18428a;
            flex-direction: column;
            align-items: flex-start;
            padding: 1em 2em;
            gap: 0.2em;
            display: none;
          }
          .nav-links.open {
            display: flex;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}

// --- Animated routes with fade (fixed for React 18+) ---
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route
        path="*"
        element={
          <div className="fade-in">
            <Routes location={location}>
              <Route path="/" element={<RoofLeadGen />} />
              <Route path="/process" element={<RoofRepairProcess />} />
              <Route path="/damage-tracker" element={<DamageTracker />} />
              <Route path="/faq" element={<RoofFAQ />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  const [logoSrc, setLogoSrc] = useState("/findthebestroofersred.png");

  return (
    <Router>
      <Navbar logoSrc={logoSrc} setLogoSrc={setLogoSrc} />
      <main className="max-w-4xl mx-auto px-2 md:px-6 py-6 md:py-12">
        <AnimatedRoutes />
      </main>
      {/* Fade CSS for route transitions */}
      <style>{`
        .fade-page {
          min-height: 60vh;
        }
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 360ms cubic-bezier(.48,.2,.43,1.01);
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 340ms cubic-bezier(.65,.1,.53,1.01);
        }
      `}</style>
    </Router>
  );
}
