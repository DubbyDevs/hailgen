import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer" style={{
      background: "#f5f8fb",
      borderTop: "1.5px solid #c3d0e4",
      padding: "2em 0 1em 0",
      fontSize: "0.96em",
      color: "#3d4760",
      textAlign: "center",
      zIndex: 10,
      width: "100%" // Ensure footer spans full width
    }}>
      <div style={{ marginBottom: 4 }}>
        © {new Date().getFullYear()} TexasRoofing.info – All Rights Reserved.
      </div>
      <div>
        <a
          href="/terms"
          style={{
            color: "#18428a",
            textDecoration: "underline",
            fontWeight: 500
          }}
        >
          Legal, Terms & Privacy Policy
        </a>
      </div>
    </footer>
  );
}