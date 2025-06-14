import React from "react";

export default function RoofFAQ() {
  return (
    <div className="container">
      <div className="main-card">
        {/* Logo at the top inside main-card */}
        <div style={{ width: "100%", textAlign: "center", marginBottom: 10 }}>
          <img
            src="/texasroofinginfo.png"
            alt="Texas Roofing Info Logo"
            style={{
              maxWidth: 400,
              width: "100%",
              height: "auto",
              margin: "0 auto",
              display: "block",
              background: "#fff",
              borderRadius: 10,
              boxShadow: "none"
            }}
          />
        </div>
        <h1 className="display-5 page-title text-center">Roof Repair & Insurance FAQ – North Texas</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Get Answers to Common Roofing, Hail Damage, and Insurance Claim Questions
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          We help DFW homeowners every day with storm, hail, and wind roof damage. If you have questions about inspections, insurance claims, or the repair process, you’re in the right place! Below you’ll find our most frequently asked questions about roof repair after storms in Dallas-Fort Worth, Plano, Frisco, McKinney, and all North Texas.
        </p>
        <div className="card mb-4 p-4">
          {/* FAQ List */}
          <div className="mb-3">
            <h3 className="h6 text-primary">How do I know if my roof was damaged by hail?</h3>
            <p>
              You may notice dents on metal surfaces, loose or missing shingles, granules in gutters, or leaks inside. Even if there’s no visible damage from the ground, our local DFW roof inspector can safely check for hidden hail impact and provide photo evidence for your insurance claim—at no cost to you!
            </p>
          </div>
          <div className="mb-3">
            <h3 className="h6 text-primary">Will my homeowner’s insurance cover roof repairs after a storm?</h3>
            <p>
              Most Texas homeowner’s insurance policies cover hail, wind, and storm damage—but you only have a limited time (often 1 year or less) to file a claim after the storm hits. Don’t wait! We’ll help you through every step to get your roof covered.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="h6 text-primary">How much does a roof inspection cost?</h3>
            <p>
              All our roof inspections are 100% free for storm-affected homeowners in North Texas. There’s no obligation, and we’ll give you honest, photo-documented results.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="h6 text-primary">How long does the roof repair or replacement take?</h3>
            <p>
              Most residential roof replacements are completed in just 1–2 days after insurance approval. We work quickly and cleanly, minimizing any disruption to your daily life.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="h6 text-primary">Can you help me with my insurance claim?</h3>
            <p>
              Absolutely! We handle insurance paperwork, meet with your adjuster, and advocate for you. Our goal is to get your claim approved and your roof restored without hassle or stress.
            </p>
          </div>
          <div className="mb-3">
            <h3 className="h6 text-primary">Do you have references or reviews?</h3>
            <p>
              Yes! See our customer testimonials below and on Google. We’re proud to be trusted by homeowners throughout Dallas, Plano, Frisco, McKinney, Denton, and more.
            </p>
          </div>
        </div>
        {/* Sample Reviews */}
        <div className="card p-4 mb-3">
          <h2 className="h6 text-primary mb-3">Customer Reviews</h2>
          <ul>
            <li>
              <span className="fw-bold text-primary">“After the Plano hail storm, these guys handled everything with my insurance and got my roof replaced fast. Stress free!”</span>
              <div style={{ fontSize: "0.92em", color: "#7a7a7a" }}>– Emily R., Plano, TX</div>
            </li>
            <li>
              <span className="fw-bold text-primary">“So glad I called. The inspection was free, the team was professional, and they got my claim approved after I was denied. Highly recommend!”</span>
              <div style={{ fontSize: "0.92em", color: "#7a7a7a" }}>– Jason M., Frisco, TX</div>
            </li>
            <li>
              <span className="fw-bold text-primary">“I never realized hail did so much damage. They walked me through the whole process and made it super easy.”</span>
              <div style={{ fontSize: "0.92em", color: "#7a7a7a" }}>– Lisa S., McKinney, TX</div>
            </li>
          </ul>
        </div>
      </div>
     
    </div>
  );
}
