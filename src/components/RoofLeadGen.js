import ReviewCard from "./ReviewCard";
import React, { useState } from "react";

export default function RoofLeadGen() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
    stormDate: "",
    insurance: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Store lead locally here, e.g., localStorage or local DB logic
  };

  return (
    <div className="container">
      {/* SEO HEADINGS */}
      <div className="main-card mb-4">
        <h1 className="display-5 page-title">
          North Texas Roof Repair – Free Roof Inspection After Hail Storm
        </h1>
        <h2 className="h4 mb-3 text-primary text-center">
          Is Your Roof Covered By Insurance? Get a Professional Roofer to Check For FREE
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          Hail, wind, and severe storms in North Texas can cause serious roof damage.
          If you’ve recently experienced a hailstorm in Dallas, Plano, Frisco, McKinney, Denton, or anywhere in DFW, it’s crucial to have a local, trusted roofing expert inspect your roof.
          Insurance may cover a full roof replacement—don’t miss your chance to get your roof fixed at no cost to you!
        </p>
      </div>

      {/* Two-column layout (desktop: side-by-side, mobile: stacked) */}
      <div className="row justify-content-center mb-4 g-4">
        {/* Why Choose Us column */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 h-100">
            <h2 className="h4 text-primary mb-3">Why North Texas Homeowners Trust Us For Roof Repair</h2>
            <ul className="mb-3">
              <li>Over 20 years of experience with Texas hail and storm damage roof replacement</li>
              <li>Free, no-obligation roof inspections for all storm-affected homes</li>
              <li>Assistance with the insurance claim process, start to finish</li>
              <li>Licensed and insured local roofers, not storm chasers</li>
              <li>Hundreds of 5-star reviews from Dallas, Fort Worth, Plano, and more</li>
              <li>Fast emergency repair—help within hours if needed</li>
            </ul>
            <h3 className="h6 text-primary mb-2">Service Area</h3>
            <p className="mb-1">
              Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Allen, Richardson, Irving, Carrollton, Flower Mound, Grapevine, and all North Texas suburbs.
            </p>
            <h3 className="h6 text-primary mb-2">Recent Hail Storms & Roof Insurance Info</h3>
            <p className="mb-2">
              We update our site after every major North Texas storm so you can see if your neighborhood was affected and what your options are for insurance roof replacement.
              If you think your home was hit by hail, <span className="fw-bold text-primary">contact us right away for a free, honest inspection.</span>
            </p>
          </div>
        </div>

        {/* Form column */}
        <div className="col-12 col-lg-6">
          <div className="card p-4 h-100">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className="h5 text-primary mb-3">
                  Request Your Free, No-Obligation Roof Inspection
                </h3>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input required name="name" value={form.name} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input required name="address" value={form.address} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input required name="phone" value={form.phone} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Brief Description</label>
                  <input name="description" value={form.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Storm</label>
                  <input required type="date" name="stormDate" value={form.stormDate} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Insurance Company</label>
                  <input name="insurance" value={form.insurance} onChange={handleChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary submit-btn w-100">Request Inspection Now</button>
              </form>
            ) : (
              <div className="text-center py-4">
                <h3 className="text-success mb-3">Thank you!</h3>
                <p>
                  We received your request. A North Texas roof expert will reach out ASAP to schedule your free inspection.<br />
                  <strong>If this is urgent or your roof is leaking, call us immediately at (XXX) XXX-XXXX.</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-center mb-4" style={{ gap: 24 }}>
  {/* Logo */}
  <img
    src="/logo512.png"
    alt="North Texas Roof Pros"
    style={{
      height: 192,
      width: 192,
      objectFit: "contain",
      marginRight: 8,
      borderRadius: 16,
      boxShadow: "0 4px 16px rgba(50,70,100,0.08)"
    }}
  />

  {/* Review cards */}
  <ReviewCard
    quote="After the Plano hail storm, these guys handled everything with my insurance and got my roof replaced fast. Stress free!"
    name="Emily R."
    location="Plano, TX"
  />
  <ReviewCard
    quote="A hail storm hit our home in Fort Worth and we had leaks in two rooms. They handled it all—couldn't believe how easy!"
    name="Samantha H."
    location="Fort Worth, TX"
  />
</div>

      {/* SEO FOOTER */}
      <footer className="footer">
        <div className="mb-2">
          © 2025 North Texas Roof Repair. Local, licensed roofers serving Dallas-Fort Worth and all North Texas suburbs.
          Need help with hail damage or a roof insurance claim? Request your free estimate now.
        </div>
        <div className="mb-1">
          Keywords: North Texas hail damage, roof repair after storm, insurance covered roof replacement, free roof inspection Dallas, storm damage Frisco, best roofer McKinney, emergency roof leak, roofing contractor Plano, hailstorm repairs, local roof estimate, trusted roofing company DFW.
        </div>
      </footer>
    </div>
  );
}
