import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";




const findgoodroofingnow = "https://findgoodroofingnow.png";

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

function getDaysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = (now - then) / (1000 * 60 * 60 * 24);
  return Math.floor(diff);
}

export default function DamageTracker() {
  // Fetch county GeoJSON from public/data/
  const [countyData, setCountyData] = useState(null);

  // New: For claim eligibility tracker
  const [hailEvents, setHailEvents] = useState([]); // parsed from NOAA
  const [countyStorms, setCountyStorms] = useState({}); // {county: {date, size}}
  const [modalStep, setModalStep] = useState(0); // 0=closed, 1=address, 2=email, 3=insurance, 4=thankyou
  const [modalCounty, setModalCounty] = useState("");
  const [modalInfo, setModalInfo] = useState({ address: "", email: "", insurance: "" });

  // Old: For real-time blue-dot hail map
  const [liveHail, setLiveHail] = useState([]);

  // Fetch GeoJSON on mount
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/north_tx_counties_75mi.geojson")
      .then((res) => res.json())
      .then((data) => setCountyData(data));
  }, []);

  // Fetch hail reports for Texas from SPC
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
        setHailEvents(parsed);
        setLiveHail(parsed);

        // --- Assign last hail event (today) to each county for claim window
        if (countyData) {
          const lastStormPerCounty = {};
          for (const countyFeat of countyData.features) {
            const countyName = countyFeat.properties.NAME;
            // Find all events in this county today
            const countyEvents = parsed.filter(
              e => (e.county || "").toLowerCase().includes(countyName.toLowerCase())
            );
            // Get largest event today
            let best = null;
            for (const e of countyEvents) {
              if (!best || e.size > best.size) best = e;
            }
            if (best) {
              lastStormPerCounty[countyName] = {
                date: best.date,
                size: best.size,
              };
            }
          }
          setCountyStorms(lastStormPerCounty);
        }
      });
  }, [countyData]);

  // --- Claim window logic per county
  const DEFAULT_CLAIM_WINDOW = 365;
  function getCountyEligibility(countyName) {
    const event = countyStorms[countyName];
    if (!event) return { eligible: false, daysLeft: 0, warning: null, lastStorm: null, size: null };
    const daysSince = getDaysSince(event.date);
    const daysLeft = DEFAULT_CLAIM_WINDOW - daysSince;
    let warning = null;
    if (daysLeft < 1) return { eligible: false, daysLeft: 0, warning: "Claim window closed", lastStorm: event.date, size: event.size };
    if (daysLeft <= 30) warning = "Claim window closing soon!";
    if (daysLeft <= 14) warning = "🔥 URGENT: Final 2 weeks to file!";
    return { eligible: true, daysLeft, warning, lastStorm: event.date, size: event.size };
  }

  function MapBlocker() {
    useMapEvents({
      zoomstart: () => setModalStep(1),
      dragstart: () => setModalStep(1),
    });
    return null;
  }

  const styleCounty = (feature) => {
    const { NAME } = feature.properties;
    const status = getCountyEligibility(NAME);
    return {
      fillColor: status.eligible ? (status.warning ? "#FFD700" : "#47a36d") : "#eee",
      fillOpacity: status.eligible ? 0.6 : 0.1,
      color: status.eligible ? "#18428a" : "#999",
      weight: 1.5,
      dashArray: status.eligible ? "3" : "1",
      cursor: "pointer",
    };
  };

  const onEachCounty = (feature, layer) => {
    const county = feature.properties.NAME;
    const status = getCountyEligibility(county);
    let popupMsg = `<strong>${county} County</strong><br/>`;
    if (status.eligible) {
      popupMsg += status.lastStorm
        ? `Last large hail: ${status.lastStorm} (${status.size}" hail)<br/>`
        : "";
      popupMsg += `<span style="color:${status.warning ? 'red' : 'green'}">Claim window: ${
        status.daysLeft
      } days left</span>`;
      if (status.warning) popupMsg += `<br/><strong>${status.warning}</strong>`;
    } else {
      popupMsg += `<span style="color:gray">No qualifying hail event today</span>`;
    }
    layer.bindPopup(popupMsg);
    layer.on({
      click: () => {
        setModalCounty(county);
        setModalStep(1);
      },
    });
  };

  const mapCenter = [33.1, -97.1];

  return (
    <div className="container">
      <div className="main-card">
        <h1 className="display-5 page-title">North Texas Real-Time Hail & Storm Damage Tracker</h1>
        <h2 className="h4 mb-4 text-primary text-center">
          Interactive Map & Recent Storms – Find Out If Your Roof Qualifies for Insurance Repair
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          Use our up-to-date North Texas Storm Damage Tracker to see if your neighborhood was recently hit by hail or severe weather. We highlight the most impacted cities and areas—including Dallas, Plano, Frisco, Fort Worth, McKinney, Denton, and more—plus real insurance deadlines. <span className="fw-bold text-primary">Don’t wait: most Texas policies only allow you a year (or less) to file a storm claim!</span>
        </p>

        {/* === New Claim Eligibility Map (top, focus) === */}
        <div className="card mb-4 p-3">
          <h3 className="h6 text-primary mb-2">Real-Time County Claim Eligibility Map</h3>
          {countyData && (
            <MapContainer
              center={mapCenter}
              zoom={7}
              style={{ height: "420px", width: "100%" }}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              dragging={false}
              zoomControl={false}
              attributionControl={false}
            >
              <MapBlocker />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <GeoJSON
                data={countyData}
                style={styleCounty}
                onEachFeature={onEachCounty}
              />
            </MapContainer>
          )}
          <div className="mt-3">
            <small>
              <span className="fw-bold text-primary">
                Only highlighted counties are eligible.<br />
                <span style={{ color: "#FFD700" }}>Gold</span> = URGENT claim window closing soon!<br />
                Click a county for a personalized eligibility check.
              </span>
            </small>
          </div>
        </div>

        {/* === Staged Modal Lead Gen === */}
        {modalStep > 0 && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.38)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{
              background: "#fff", borderRadius: 18, padding: 32, minWidth: 320, maxWidth: 420, boxShadow: "0 6px 32px rgba(0,0,0,0.2)"
            }}>
              {modalStep === 1 && (
                <>
                  <h4 className="text-primary mb-3">
                    Enter your address for a free storm claim eligibility check!
                  </h4>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setModalStep(2);
                    }}>
                    <input
                      className="form-control mb-2"
                      required
                      placeholder="Your address"
                      value={modalInfo.address}
                      onChange={e => setModalInfo(i => ({ ...i, address: e.target.value }))}
                    />
                    <button className="btn btn-primary submit-btn w-100" type="submit">Next</button>
                    <button type="button" className="btn btn-link mt-2" onClick={() => setModalStep(0)}>Cancel</button>
                  </form>
                </>
              )}
              {modalStep === 2 && (
                <>
                  <h4 className="text-primary mb-3">
                    Enter your email to get your personalized answer!
                  </h4>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setModalStep(3);
                    }}>
                    <input
                      type="email"
                      className="form-control mb-2"
                      required
                      placeholder="Your email"
                      value={modalInfo.email}
                      onChange={e => setModalInfo(i => ({ ...i, email: e.target.value }))}
                    />
                    <button className="btn btn-primary submit-btn w-100" type="submit">Next</button>
                    <button type="button" className="btn btn-link mt-2" onClick={() => setModalStep(0)}>Cancel</button>
                  </form>
                </>
              )}
              {modalStep === 3 && (
                <>
                  <h4 className="text-primary mb-3">
                    Any insurance info or details you'd like us to know?
                  </h4>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setModalStep(4);
                    }}>
                    <input
                      className="form-control mb-2"
                      placeholder="Insurance or details (optional)"
                      value={modalInfo.insurance}
                      onChange={e => setModalInfo(i => ({ ...i, insurance: e.target.value }))}
                    />
                    <button className="btn btn-primary submit-btn w-100" type="submit">That's it!</button>
                    <button type="button" className="btn btn-link mt-2" onClick={() => setModalStep(0)}>Cancel</button>
                  </form>
                </>
              )}
              {modalStep === 4 && (
                <div className="text-center">
                  <h4 className="mb-3 text-success">Ready for your free inspection?</h4>
                  <p>
                    Thank you! A local roof pro will review your info and send a personalized report and offer for your address.<br />
                    <strong>Need help faster? Call us direct any time!</strong>
                  </p>
                  <button className="btn btn-primary submit-btn w-100" onClick={() => setModalStep(0)}>Close</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === LIVE BLUE DOTS MAP (your original map) === */}
        <div className="card mb-4 p-3">
          <h3 className="h6 text-primary mb-2">Live Hail Map – See Today’s Actual Reports</h3>
          <MapContainer center={[32.7767, -96.7970]} zoom={7} style={{ height: "400px", width: "100%" }}>
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

        {/* === STATIC MAP IMAGE SECTION === */}
        <div className="card mb-4 p-3 text-center">
          <img
            src={findgoodroofingnow.png}
            alt="North Texas hail storm map"
            className="img-fluid rounded mb-3"
            style={{ maxWidth: "100%" }}
          />
          <p>
            Map shows recent hail storms across Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Allen and more. If your area is listed below and your storm was in the last year, you may still qualify for a full roof replacement covered by insurance.
          </p>
        </div>

        {/* === RECENT MAJOR HAIL & STORM EVENTS === */}
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

        {/* === ENGAGEMENT & CALL TO ACTION === */}
        <div className="card p-4 mb-3">
          <h3 className="h6 text-primary mb-2">Not Sure If You Qualify?</h3>
          <p>
            If your neighborhood was hit by hail or a severe storm in the last year, contact our DFW roofing experts for a free, no-obligation inspection. We’ll verify your coverage window and make the insurance claim easy—no hassle, no stress.
          </p>
          <a href="/contact" className="btn btn-primary submit-btn">Book Your Free Inspection</a>
        </div>
      </div>

      {/* === UNIVERSAL FOOTER WITH TERMS === */}
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
