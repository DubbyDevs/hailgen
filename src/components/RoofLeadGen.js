import ReviewCard from "./ReviewCard";
import React, { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mwpbbbyz";

export default function RoofLeadGen() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    description: "",
    stormDate: "",
    insurance: ""
  });

  // Controlled input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // AJAX form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          address: "",
          phone: "",
          description: "",
          stormDate: "",
          insurance: ""
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("There was a network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <div className="main-card">
        {/* Logo at top */}
        <div style={{ width: "100%", textAlign: "center", marginBottom: 0 }}>
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
        {/* SEO HEADINGS */}
        <h1 className="display-5 page-title text-center">
          Welcome to <span style={{ color: "#18428a" }}>TexasRoofing.info </span>
        </h1>
        <h2 className="h5 mb-3 text-primary text-center" style={{ fontWeight: 600 }}>
          Is Your Roof Covered By Insurance? Get a Professional Roofer to Check For FREE
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          Hail, wind, and severe storms in North Texas can cause serious roof damage.
          If you’ve recently experienced a hailstorm in Dallas, Plano, Frisco, McKinney, Denton, or anywhere in DFW, it’s crucial to have a local, trusted roofing expert inspect your roof.
          Insurance may cover a full roof replacement—don’t miss your chance to get your roof fixed at no cost to you!
        </p>

        {/* Two-column layout */}
        <div className="row justify-content-center mb-4 g-4">
          {/* Why Choose Us column */}
          <div className="col-12 col-lg-6">
            <div className="card p-4 h-100">
              <h2 className="h5 text-primary mb-3" style={{ fontWeight: 700 }}>
                Why North Texas Homeowners Trust Us For Roof Repair
              </h2>
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
                <form onSubmit={handleFormSubmit}>
                  <h3 className="h5 text-primary mb-3">
                    Request Your Free, No-Obligation Roof Inspection
                  </h3>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="street-address"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Brief Description</label>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date of Storm</label>
                    <input
                      required
                      type="date"
                      name="stormDate"
                      value={form.stormDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Insurance Company</label>
                    <input
                      name="insurance"
                      value={form.insurance}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn w-100"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Request Inspection Now"}
                  </button>
                  {error && (
                    <div className="alert alert-danger mt-3">{error}</div>
                  )}
                </form>
              ) : (
                <div className="text-center py-4">
                  <img
                    src="/texasroofingthankyou2.png"
                    alt="Thank you"
                    style={{
                      maxWidth: 320,
                      width: "100%",
                      marginBottom: "1em",
                      borderRadius: 16,
                      boxShadow: "0 4px 24px rgba(80,120,170,0.16)"
                    }}
                  />
                  <h3 className="text-success mb-3">Thank you!</h3>
                  <p>
                    We received your request. A North Texas roof expert will reach out ASAP to schedule your free inspection.<br />
                    <strong></strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-center mb-4" style={{ gap: 24 }}>
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
      </div>
    </div>
  );
}
