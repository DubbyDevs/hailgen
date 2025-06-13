import React, { useState } from "react";

export default function AboutUs() {
  const [logoExpanded, setLogoExpanded] = useState(false);

  return (
    <div className="container">
      <div className="main-card">
        <h1 className="display-5 page-title text-center">
          About North Texas Roof Repair
        </h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Local. Licensed. Trusted in Dallas, Fort Worth, Denton, Plano &amp; All DFW
        </h2>

        {/* FLEX LAYOUT */}
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
            {/* Logo: click to expand */}
            <img
              src="/texasroofinginfo.png"
              alt="Texas Roofing Info Logo"
              className={`about-logo-img ${logoExpanded ? "expanded" : ""}`}
              onClick={() => setLogoExpanded((v) => !v)}
              style={{
                background: "#fff",
                cursor: "pointer",
                zIndex: 21,
                boxShadow: "0 2px 14px rgba(10,20,60,0.09)",
                transition: "box-shadow 0.2s",
              }}
              title="Click to enlarge"
            />
            {/* Modal overlay for logo */}
            {logoExpanded && (
              <div
                className="logo-modal"
                onClick={() => setLogoExpanded(false)}
                style={{
                  position: "fixed",
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: "rgba(0,0,0,0.8)",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                aria-label="Click to close expanded logo"
              >
                <img
                  src="/texasroofinginfo.png"
                  alt="Texas Roofing Info Logo"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "95vh",
                    borderRadius: "20px",
                    background: "#fff",
                    boxShadow: "0 2px 36px #111a2a50"
                  }}
                />
              </div>
            )}
            {/* CTA Image */}
            <img
              src="/TexasRoofingInfoAd4.jpg"
              alt="Got Hail? TexasRoofing.info ad"
              className="about-cta-img"
              style={{
                background: "#fff",
                borderRadius: 10,
                width: "100%",
                maxWidth: 220,
                boxShadow: "0 2px 10px #183a8a18"
              }}
            />
          </div>
        </div>

        <section>
          <h3 className="h6 text-primary mt-4 mb-2">Our Promise to North Texas Homeowners</h3>
          <p>
            We believe getting your roof repaired or replaced after a storm should be simple, honest, and stress-free. Our team is here for you before, during, and after the project—ready to answer questions, help with paperwork, and make sure you’re 100% satisfied.
          </p>
          <h3 className="h6 text-primary mt-4 mb-2">
            Serving Dallas-Fort Worth, Denton, Plano &amp; Surrounding Cities
          </h3>
          <p>
            Whether you’re in Dallas, Fort Worth, Plano, McKinney, Denton, Allen, Frisco, or any nearby North Texas neighborhood, we’re your local storm damage roofing pros. Call today for your free inspection or just to ask a question—we’re always happy to help.
          </p>
        </section>
      </div>
      <footer className="footer">
        <div>
          TexasRoofing.info is NOT affiliated with TexasRoofing.com - Family-owned, insured DFW roofing company serving Dallas, Fort Worth, Denton, Plano, McKinney, Frisco, and all North Texas.
        </div>
        <div>
          Keywords: about Texas roofing company, local storm damage repair DFW, insured roofer Dallas, Fort Worth, Denton, Plano, McKinney, best North Texas roofing team, family owned, licensed roofing contractor.
        </div>
      </footer>
      <style>{`
        .about-flex-row {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          gap: 44px;
          margin-bottom: 2.2em;
        }
        .about-text {
          flex: 2;
          min-width: 220px;
        }
        .about-images-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          min-width: 170px;
        }
        .about-logo-img, .about-cta-img {
          max-width: 220px;
          width: 100%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 2px 14px rgba(10,20,60,0.09);
          margin-bottom: 5px;
        }
        .about-logo-img.expanded {
          /* Hide normal image when expanded (covered by modal) */
          opacity: 0.1;
        }
        @media (max-width: 1000px) {
          .about-flex-row {
            gap: 20px;
          }
        }
        @media (max-width: 850px) {
          .about-flex-row {
            flex-direction: column;
            gap: 22px;
          }
          .about-images-col {
            flex-direction: row;
            justify-content: center;
            gap: 16px;
          }
          .about-logo-img, .about-cta-img {
            max-width: 44vw;
            min-width: 0;
          }
        }
        @media (max-width: 700px) {
          .about-flex-row,
          .about-images-col {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .about-logo-img, .about-cta-img {
            max-width: 95vw;
            margin-bottom: 4px;
          }
        }
        /* Modal on top of everything */
        .logo-modal {
          animation: fadeIn .28s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
