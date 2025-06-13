import React, { useState } from "react";

export default function AboutUs() {
  const [ctaExpanded, setCtaExpanded] = useState(false);

  return (
  <div className="container">
    <div className="main-card">
      {/* Logo at very top, centered */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "0em 0 0.5em 0"
      }}>
        <img
          src="/texasroofinginfo.png"
          alt="Texas Roofing Info Logo"
          style={{
            maxWidth: 180,
            width: "100%",
            height: "auto",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "none"
          }}
        />
      </div>
      <h1 className="display-5 page-title text-center">About North Texas Roof Repair</h1>
      <h2 className="h4 mb-4 text-primary text-center">
        Local. Licensed. Trusted in Dallas, Fort Worth, Denton, Plano &amp; All DFW
      </h2>

      <div className="about-flex-row">
        <div className="about-text">
          <p>
            North Texas Roof Repair was founded to help our neighbors in Dallas-Fort Worth get the stress-free, professional storm damage roof service they deserve. We’re local Texans, not out-of-town storm chasers, and our entire team is licensed, insured, and committed to quality workmanship with honest communication.
          </p>
          <p>
            With over 20 years serving DFW—including Dallas, Fort Worth, Denton, Plano, Frisco, and McKinney—we’ve built our reputation on trust, reliability, and unbeatable service during North Texas storm season.
          </p>
          <ul>
            <li>Family-owned and operated</li>
            <li>Fully insured, local North Texas company</li>
            <li>Hundreds of 5-star reviews from satisfied homeowners</li>
            <li>Personalized help with insurance claims, inspections, and repairs</li>
            <li>Fast response and emergency service after hail, wind, or tornadoes</li>
          </ul>
        </div>
        <div className="about-images-col">
          {/* Only the second image/ad here */}
          <img
            src="/TexasRoofingInfoAd4.jpg"
            alt="Got Hail? TexasRoofing.info ad"
            className="about-cta-img"
            style={{
              background: "#fff",
              borderRadius: 10,
              width: "100%",
              maxWidth: 220
            }}
          />
        </div>
      </div>
      <section>
        <h3 className="h6 text-primary mt-4 mb-2">Our Promise to North Texas Homeowners</h3>
        <p>
          We believe getting your roof repaired or replaced after a storm should be simple, honest, and stress-free. Our team is here for you before, during, and after the project—ready to answer questions, help with paperwork, and make sure you’re 100% satisfied.
        </p>
        <h3 className="h6 text-primary mt-4 mb-2">Serving Dallas-Fort Worth, Denton, Plano &amp; Surrounding Cities</h3>
        <p>
          Whether you’re in Dallas, Fort Worth, Plano, McKinney, Denton, Allen, Frisco, or any nearby North Texas neighborhood, we’re your local storm damage roofing pros. Call today for your free inspection or just to ask a question—we’re always happy to help.
        </p>
      </section>
    </div>
    <footer className="footer">
      <div>
        © 2025 North Texas Roof Repair. Family-owned, insured DFW roofing company serving Dallas, Fort Worth, Denton, Plano, McKinney, Frisco, and all North Texas.
      </div>
      <div>
        Keywords: about Texas roofing company, local storm damage repair DFW, insured roofer Dallas, Fort Worth, Denton, Plano, McKinney, best North Texas roofing team, family owned, licensed roofing contractor.
      </div>
    </footer>
    {/* You can keep your style tag for mobile styles here */}
  </div>
);

}
