import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MAP_IMAGE_URL = "https://i.imgur.com/CJ1CJf8.png";

const storms = [
  {
    date: "2025-05-26",
    city: "Frisco",
    areas: ["Frisco Square", "Starwood", "Panther Creek"],
    description: "Severe hail up to 2” reported, heavy roof damage in north Frisco neighborhoods. Most insurance policies allow claims up to 1 year from the date of this event.",
    hailSize: "2 inches",
    covered: true,
  },
  {
    date: "2025-04-18",
    city: "McKinney",
    areas: ["Stonebridge Ranch", "Historic Downtown", "Craig Ranch"],
    description: "Quarter to golf-ball size hail, multiple reports of shingle and gutter damage. Insurance claim window closing soon for this event.",
    hailSize: "Quarter to Golf Ball",
    covered: true,
  },
  {
    date: "2025-03-08",
    city: "Plano",
    areas: ["West Plano", "Legacy Drive", "Park Blvd Corridor"],
    description: "Hailstorm with winds caused shingle loss, leaks, and visible impact marks. Some policies expire soon—act now if you live in this area!",
    hailSize: "Golf Ball",
    covered: true,
  },
  {
    date: "2025-02-20",
    city: "Fort Worth",
    areas: ["Westover Hills", "Tanglewood", "Downtown"],
    description: "Half-dollar size hail hit several neighborhoods. Roof damage reported across west Fort Worth.",
    hailSize: "Half Dollar",
    covered: true,
  },
  {
    date: "2025-03-08",
    city: "Allen",
    areas: ["Twin Creeks", "Watters Crossing"],
    description: "Nickel-sized hail in Allen. Some insurance may not cover claims for this event any longer.",
    hailSize: "Nickel",
    covered: false,
  },
];

export default function DamageTracker() {
  // Live hail marker data state
  const [liveHail, setLiveHail] = useState([]);

  useEffect(() => {
    // Fetch hail reports for Texas from SPC
    fetch("https://www.spc.noaa.gov/climo/reports/today.csv")
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split("\n");
        const hailRows = rows.filter(row => row.startsWith("HAIL"));
        const parsed = hailRows.map(row => {
          const cols = row.split(",");
          return {
            type: cols[0],
            date: cols[1],
            time: cols[2],
            lat: parseFloat(cols[3]),
            lon: parseFloat(cols[4]),
            location: cols[5],
            county: cols[6],
            state: cols[7],
            size: cols[8],
          };
        });
        setLiveHail(parsed.filter(storm => storm.state === "TX"));
      });
  }, []);

  // Map center for DFW
  const mapCenter = [32.7767, -96.7970];

  return (
    <div className="container">
      <div className="main-card">
        <h1 className="display-5 page-title">North Texas Hail & Storm Damage Tracker</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Interactive Map & Recent Storms – Find Out If Your Roof Qualifies for Insurance Repair
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          Use our up-to-date North Texas Storm Damage Tracker to see if your neighborhood was recently hit by hail or severe weather. We highlight the most impacted cities and areas—including Dallas, Plano, Frisco, Fort Worth, McKinney, Denton, and more—plus real insurance deadlines. <span className="fw-bold text-primary">Don’t wait: most Texas policies only allow you a year (or less) to file a storm claim!</span>
        </p>

        {/* LIVE INTERACTIVE MAP SECTION */}
        <div className="card mb-4 p-3">
          <h3 className="h6 text-primary mb-2">Live Hail Map – See Today’s Actual Reports</h3>
          <MapContainer center={mapCenter} zoom={7} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {liveHail.map((storm, idx) => (
              <CircleMarker
                key={idx}
                center={[storm.lat, storm.lon]}
                radius={parseFloat(storm.size) * 8}
                color="blue"
                fillOpacity={0.5}
              >
                <Popup>
                  <div>
                    <strong>{storm.location}, {storm.county} TX</strong><br />
                    Hail Size: {storm.size} in<br />
                    Time: {storm.time}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className="mt-2" style={{ fontSize: "0.97em" }}>
            <span className="fw-bold text-primary">Blue circles show today’s real hail reports across North Texas (updated daily).</span>
          </div>
        </div>

        {/* Your Map Image Section (static) */}
        <div className="card mb-4 p-3 text-center">
          <img
            src={MAP_IMAGE_URL}
            alt="North Texas hail storm map"
            className="img-fluid rounded mb-3"
            style={{ maxWidth: "100%" }}
          />
          <p>
            Map shows recent hail storms across Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Allen and more. If your area is listed below and your storm was in the last year, you may still qualify for a full roof replacement covered by insurance.
          </p>
        </div>

        {/* Recent Storms Section (your custom highlights) */}
        <div className="card mb-4 p-4">
          <h3 className="h5 text-primary mb-3 text-center">Recent Major Hail & Storm Events</h3>
          {storms.map((storm, idx) => (
            <div key={idx} className="border-start border-4 border-primary ps-3 mb-4">
              <div className="fw-bold text-primary mb-1">{storm.city} – {storm.date}</div>
              <div>Impacted areas: <strong>{storm.areas.join(", ")}</strong></div>
              <div>Hail size: <strong>{storm.hailSize}</strong></div>
              <div>{storm.description}</div>
              <div className={storm.covered ? "text-success fw-bold" : "text-warning fw-bold"}>
                {storm.covered
                  ? "Act now: Most policies limit claims to 1 year or less after the storm date!"
                  : "Warning: Insurance claim window may have closed for this storm."}
              </div>
              <a href="/contact" className="btn btn-link text-primary fw-bold px-0">Book My Free Roof Inspection</a>
            </div>
          ))}
        </div>

        {/* Engagement & Call to Action */}
        <div className="card p-4 mb-3">
          <h3 className="h6 text-primary mb-2">Not Sure If You Qualify?</h3>
          <p>
            If your neighborhood was hit by hail or a severe storm in the last year, contact our DFW roofing experts for a free, no-obligation inspection. We’ll verify your coverage window and make the insurance claim easy—no hassle, no stress.
          </p>
          <a href="/contact" className="btn btn-primary submit-btn">Book Your Free Inspection</a>
        </div>
      </div>
      <footer className="footer">
        <div>
          © 2025 North Texas Roof Repair. Hail damage tracker for Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, and all North Texas. Recent storm map and insurance claim deadlines for local homeowners. Act fast to get your roof covered!
        </div>
        <div>
          Keywords: North Texas hail storm tracker, DFW recent storms, insurance claim deadlines Texas, hail repair eligibility, Plano storm damage, Denton hail map, Dallas roof replacement, insurance covered roof, free inspection, storm season roof repair.
        </div>
      </footer>
    </div>
  );
}
