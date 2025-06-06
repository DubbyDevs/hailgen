import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import RoofLeadGen from "./components/RoofLeadGen";
import RoofRepairProcess from "./components/RoofRepairProcess";
import DamageTracker from "./components/DamageTracker";
import RoofFAQ from "./components/RoofFaq";
import BlogPage from "./components/BlogPage";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/Contact";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/process" },
  { name: "Damage Tracker", path: "/damage-tracker" },
  { name: "FAQ", path: "/faq" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Logo behavior and nav need router context, so make a subcomponent:
function Navbar({ logoSrc, setLogoSrc }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // If on home, go to Damage Tracker
    if (location.pathname === "/") {
      navigate("/damage-tracker");
    } else {
      // Else go to home
      navigate("/");
    }
  };

  return (
    <nav className="w-100 bg-blue-900 py-1 shadow">
      <div className="container d-flex align-items-center" style={{ gap: 8 }}>
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            marginRight: 6,
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
          }}
          tabIndex={0}
          aria-label="Roofers Home"
        >
          <img
            src={logoSrc}
            alt="Find The Best Roofers"
            className="nav-logo"
            style={{
              height: 192,
              width: 192,
              objectFit: "contain",
              display: "block",
              background: "transparent",
              border: "none",
              boxShadow: "none",
              outline: "none",
            }}
            onMouseEnter={() => setLogoSrc("/findthebestroofersblue.png")}
            onMouseLeave={() => setLogoSrc("/findthebestroofersred.png")}
            draggable={false}
          />
        </button>
        {/* Nav links */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-blue-700 transition"
              style={{ textDecoration: "none" }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [logoSrc, setLogoSrc] = useState("/findthebestroofersred.png");

  return (
    <Router>
      <Navbar logoSrc={logoSrc} setLogoSrc={setLogoSrc} />
      <main className="max-w-4xl mx-auto px-2 md:px-6 py-6 md:py-12">
        <Routes>
          <Route path="/" element={<RoofLeadGen />} />
          <Route path="/process" element={<RoofRepairProcess />} />
          <Route path="/damage-tracker" element={<DamageTracker />} />
          <Route path="/faq" element={<RoofFAQ />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>
    </Router>
  );
}
