import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// This will be replaced by your full public/data/hail_events.json
// Sample for development:
const SAMPLE_HAIL_EVENTS = [
  {
    county: "DALLAS",
    state: "TX",
    events: [
      { date: "2024-05-30", size: 1.25, location: "Dallas", lat: 32.7767, lon: -96.7970 },
      { date: "2023-11-20", size: 1.5, location: "Irving", lat: 32.814, lon: -96.9489 }
    ]
  },
  {
    county: "TARRANT",
    state: "TX",
    events: [
      { date: "2024-03-10", size: 1.0, location: "Fort Worth", lat: 32.7555, lon: -97.3308 }
    ]
  }
];

// Utility
function getDaysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = (now - then) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
}

const CLAIM_WINDOW_DAYS = 365;

export default function DamageTracker() {
  // Real data (counties + all hail events) from your backend/public/data folder
  const [countyData, setCountyData] = useState(null); // GeoJSON
  const [hailEvents, setHailEvents] = useState(SAMPLE_HAIL_EVENTS); // Array of {county, events[]}
  const [hoveredCounty, setHoveredCounty] = useState(null);
  const hoverTimeout = useRef(null);

  // Real-time hail (today's events)
  const [liveHail, setLiveHail] = useState([]);

  // Fetch counties outline GeoJSON
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/north_tx_counties_75mi.geojson")
      .then((res) => res.json())
      .then((data) => setCountyData(data));
  }, []);

  // Fetch your hail_events.json
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/hail_events.json")
      .then((res) => res.json())
      .then((data) => setHailEvents(data));
  }, []);

  // Fetch today's hail events for blue dots
  useEffect(() => {
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
            size: parseFloat(cols[8]),
          };
        }).filter(e => e.state === "TX" && !isNaN(e.size));
        setLiveHail(parsed);
      });
  }, []);

  // Get hail events for a county
  function getCountyEvents(countyName) {
    const found = hailEvents.find(c => c.county.toUpperCase() === countyName.toUpperCase());
    if (!found) return [];
    return found.events;
  }

  // For each county, show outline. If there are qualifying events in window, fill.
  function styleCounty(feature) {
    const events = getCountyEvents(feature.properties.NAME);
    const eligibleEvents = events.filter(ev => getDaysSince(ev.date) <= CLAIM_WINDOW_DAYS);
    let fill = "#eee";
    let border = "#18428a";
    if (eligibleEvents.length > 0) {
      // Color by urgency: red if <14d, gold if <30d, green if safe
      const soonest = eligibleEvents.reduce(
        (a, b) => Math.min(a, CLAIM_WINDOW_DAYS - getDaysSince(b.date)),
        CLAIM_WINDOW_DAYS
      );
      if (soonest <= 14) fill = "#ff4444";
      else if (soonest <= 30) fill = "#FFD700";
      else fill = "#47a36d";
    }
    return {
      fillColor: fill,
      fillOpacity: eligibleEvents.length > 0 ? 0.6 : 0.12,
      color: border,
      weight: 1.5,
      dashArray: "2",
      cursor: "pointer",
    };
  }

  // Pop up after 1s hover: show ALL events for this county
  function onEachCounty(feature, layer) {
    const countyName = feature.properties.NAME;
    layer.on({
      mouseover: () => {
        hoverTimeout.current = setTimeout(() => {
          setHoveredCounty(countyName);
        }, 1000);
      },
      mouseout: () => {
        clearTimeout(hoverTimeout.current);
        setHoveredCounty(null);
      },
      click: () => {
        setHoveredCounty(countyName); // instant popup on click
      }
    });
  }

  // Main map center
  const mapCenter = [32.8, -97.0];

  // Popover for hovered county
  function CountyPopup() {
    if (!hoveredCounty) return null;
    const events = getCountyEvents(hoveredCounty)
      .filter(ev => getDaysSince(ev.date) <= CLAIM_WINDOW_DAYS)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div className="county-popup-card">
        <h4>{hoveredCounty} County</h4>
        {events.length === 0 && (
          <p>No qualifying hail events in the last year.</p>
        )}
        {events.map((ev, i) => {
          const daysLeft = CLAIM_WINDOW_DAYS - getDaysSince(ev.date);
          return (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{ev.date}:</strong> {ev.size}" hail in {ev.location}
              <br />
              {daysLeft > 0
                ? (
                  <span style={{ color: daysLeft <= 14 ? "red" : daysLeft <= 30 ? "#FFD700" : "green" }}>
                    {daysLeft} days left to file
                    {daysLeft <= 14 ? " (🔥 URGENT!)" : daysLeft <= 30 ? " (Expiring Soon!)" : ""}
                  </span>
                )
                : <span style={{ color: "#999" }}>Claim window closed</span>
              }
            </div>
          );
        })}
        <button className="btn btn-primary submit-btn mt-2" onClick={() => setHoveredCounty(null)}>Close</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main-card">
        <h1 className="display-5 page-title">North Texas Real-Time Hail & Storm Damage Tracker</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Interactive County Map – All Qualifying Hail in the Last Year
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          Use our up-to-date North Texas Storm Damage Tracker to see if your county qualifies for insurance-covered repairs.
          <span className="fw-bold text-primary"> Only 1 year to claim! Don’t wait if you’re close to expiring.</span>
        </p>

        {/* === County Hail Map (GeoJSON outlines and fill by status) === */}
        <div className="card mb-4 p-3" style={{ position: "relative" }}>
          {countyData && (
            <MapContainer
              center={mapCenter}
              zoom={8}
              style={{ height: "380px", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              />
              <GeoJSON
                data={countyData}
                style={styleCounty}
                onEachFeature={onEachCounty}
              />
              {/* Optionally: add CircleMarker for each event */}
              {hailEvents.map(c =>
                c.events
                  .filter(ev => getDaysSince(ev.date) <= CLAIM_WINDOW_DAYS)
                  .map((ev, idx) => (
                    <CircleMarker
                      key={`${c.county}-${ev.date}-${ev.location}`}
                      center={[ev.lat, ev.lon]}
                      radius={7 + (ev.size - 1) * 3}
                      color={ev.size >= 2 ? "red" : ev.size >= 1.5 ? "gold" : "green"}
                      fillOpacity={0.75}
                    >
                      <Popup>
                        <strong>{c.county} County</strong><br />
                        {ev.location} — {ev.size}" hail<br />
                        {ev.date}
                      </Popup>
                    </CircleMarker>
                  ))
              )}
            </MapContainer>
          )}
          {/* Pop-up for hovered county */}
          {hoveredCounty && (
            <div
              style={{
                position: "absolute", top: 22, right: 22, zIndex: 999,
                background: "#fff", borderRadius: 12, boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                padding: "1.5em", minWidth: 260, maxWidth: 340
              }}
            >
              <CountyPopup />
            </div>
          )}
          <div className="mt-2 text-center" style={{ fontSize: "0.97em" }}>
            <span className="fw-bold text-primary">
              Green = 1.0", Gold = 1.5+", Red = 2+" hail events.<br />
              Hover a county (1s) or click for all details and urgency!
            </span>
          </div>
        </div>

        {/* === LIVE BLUE DOTS MAP (today's reports) === */}
        <div className="card mb-4 p-3">
          <h3 className="h6 text-primary mb-2">Live Hail Map – See Today’s Actual Reports</h3>
          <MapContainer center={[32.7767, -96.7970]} zoom={7} style={{ height: "320px", width: "100%" }}>
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

        {/* === Your original static map and storm events === */}
        <div className="card mb-4 p-3 text-center">
          <img
            src="/findgoodroofingnow.png"
            alt="North Texas hail storm map"
            className="img-fluid rounded mb-3"
            style={{ maxWidth: "100%" }}
          />
          <p>
            Map shows recent hail storms across Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Allen and more.
            If your area is listed below and your storm was in the last year, you may still qualify for a full roof replacement covered by insurance.
          </p>
        </div>

        <div className="card mb-4 p-4">
          <h3 className="h5 text-primary mb-3 text-center">Recent Major Hail & Storm Events</h3>
          {hailEvents.slice(0, 5).map((county, idx) =>
            county.events.slice(0, 2).map((ev, i) => (
              <div key={idx + "-" + i} className="border-start border-4 border-primary ps-3 mb-3">
                <div className="fw-bold text-primary mb-1">{county.county} – {ev.date}</div>
                <div>Hail size: <strong>{ev.size}"</strong></div>
                <div>Location: <strong>{ev.location}</strong></div>
                <div className={getDaysSince(ev.date) < CLAIM_WINDOW_DAYS ? "text-success fw-bold" : "text-warning fw-bold"}>
                  {getDaysSince(ev.date) < CLAIM_WINDOW_DAYS
                    ? `Act now: ${CLAIM_WINDOW_DAYS - getDaysSince(ev.date)} days left to claim!`
                    : "Claim window may have closed for this storm."}
                </div>
                <a href="/contact" className="btn btn-link text-primary fw-bold px-0">Book My Free Roof Inspection</a>
              </div>
            ))
          )}
        </div>

        <div className="card p-4 mb-3">
          <h3 className="h6 text-primary mb-2">Not Sure If You Qualify?</h3>
          <p>
            If your neighborhood was hit by hail or a severe storm in the last year, contact our DFW roofing experts for a free, no-obligation inspection. We’ll verify your coverage window and make the insurance claim easy—no hassle, no stress.
          </p>
          <a href="/contact" className="btn btn-primary submit-btn">Book Your Free Inspection</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>
          © {new Date().getFullYear()} North Texas Roof Repair. Hail damage tracker for Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, and all North Texas. Recent storm map and insurance claim deadlines for local homeowners. Act fast to get your roof covered!
        </div>
        <div>
          <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#888", fontSize: "0.96em" }}>
            Terms & Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
