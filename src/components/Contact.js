import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Controlled input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Custom AJAX submit to Formspree, show thank you & image
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const FORMSPREE_URL = "https://formspree.io/f/mwpbbbyz";
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("There was a problem submitting the form. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="main-card">
        {/* Logo centered above title */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0em 0 0em 0"
          }}
        >
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
        <h1 className="display-5 page-title text-center">Contact for TexasRoofing.info</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Questions? Need Help? Contact Your Local Roofing Pros
        </h2>
        <div className="card mx-auto" style={{ maxWidth: 480 }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-3">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
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
                />
              </div>
              <div className="mb-3">
                <label className="form-label">How can we help you?</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="form-control"
                  rows={4}
                />
              </div>
              <button type="submit" className="btn btn-primary submit-btn w-100">
                Send Message
              </button>
              {error && <div style={{ color: "#d44", marginTop: 12 }}>{error}</div>}
            </form>
          ) : (
            <div className="text-center py-4">
              <img
                src="/texasroofingthankyou2.png"
                alt="Thank you for contacting North Texas Roof Repair"
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
                We’ve received your message. Our team will respond as soon as possible—usually same day during normal hours.
              </p>
            </div>
          )}
          <div className="text-secondary text-center mt-4" style={{ fontSize: "0.93em" }}>
            <div>
              North Texas Roof Repair
              <br />
              Dallas-Fort Worth &amp; All North Texas
              <br />
              Licensed &amp; Insured
            </div>
            <div className="mt-2">Schedule your free inspection today!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
