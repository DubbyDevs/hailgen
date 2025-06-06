import React from "react";

// Pass reviewer, location, and quote as props
export default function ReviewCard({ quote, name, location }) {
  return (
    <div className="card mb-3 p-3 shadow-sm border-0" style={{ maxWidth: 420 }}>
      <div className="mb-2" style={{ fontSize: "1.06em", color: "#18428a", fontWeight: 600 }}>
        “{quote}”
      </div>
      <div style={{ fontSize: "0.97em", color: "#7a7a7a" }}>
        – {name}, {location}
      </div>
    </div>
  );
}
