import React from "react";

export default function AboutUs() {
  return (
    <div className="container">
      <div className="main-card">
        {/* Logo centered above title */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          margin: "0em 0 0em 0"
        }}>
          <img
            src="/texasroofinginfo.png"
            alt="Texas Roofing Info Logo"
            style={{
              maxWidth: 400,
              width: "100%",
              height: "auto",
              background: "#fff",
              borderRadius: 10,
              boxShadow: "none"
            }}
          />
        </div>
        <h1 className="display-5 page-title text-center">About Us</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          We only work with: Local. Licensed. Trusted in Dallas, Fort Worth, Denton, Plano &amp; All DFW
        </h2>
        {/* --- Main content with "magazine" float ad style --- */}
        <div className="about-main-text" style={{ position: "relative" }}>
          
          
          <p>
            TexasRoofing.info was founded to help our neighbors in Dallas-Fort Worth get the stress-free, professional storm damage roof service they deserve. We’re local Texans, not out-of-town storm chasers, and our entire team is licensed, insured, and committed to quality workmanship with honest communication.
          </p>
          <p>
            With over 20 years serving DFW—including Dallas, Fort Worth, Denton, Plano, Frisco, and McKinney—we’ve built our reputation on trust, reliability, and unbeatable service during North Texas storm season.
          </p>
          <ul className="about-bullets">
  <li>Family-owned and operated</li>
  <li>Fully insured, local North Texas company</li>
  <li>Hundreds of 5-star reviews from satisfied homeowners</li>
  <li>Personalized help with insurance claims, inspections, and repairs</li>
  <li>Fast response and emergency service after hail, wind, or tornadoes</li>
</ul>

        </div>
        <section>
          <h3 className="h6 text-primary mt-4 mb-2">Our Promise to North Texas Homeowners</h3>
          <p>
            We believe getting your roof repaired or replaced after a storm should be simple, honest, and stress-free. Our team is here for you before, during, and after the project—ready to answer questions, help with paperwork, and make sure you’re 100% satisfied.
          </p>
          <h3 className="h6 text-primary mt-4 mb-2">Serving Dallas-Fort Worth, Denton, Plano &amp; Surrounding Cities</h3>
          <p>
            Whether you’re in Dallas, Fort Worth, Plano, McKinney, Denton, Allen, Frisco, or any nearby North Texas neighborhood, we’re your local storm damage roofing pros. Call today for your free inspection or just to ask a question—we’re always happy to help. TexasRoofing.info is not a roofing company but we do work with many of the best roofing companies and we will only match you with the best. Let us handle all the communication for you!
          </p>
        </section>
      </div>
      
      <style>{`
        .about-main-text {
          font-size: 1.13em;
          line-height: 1.7;
        }
        .about-ad-img {
          /* handled inline for float */
        }
        @media (max-width: 900px) {
          .about-ad-img {
            float: none !important;
            display: block;
            margin: 1.2em auto 1em auto !important;
            width: 80vw !important;
            max-width: 320px !important;
          }
        }
      `}</style>
    </div>
  );
}
