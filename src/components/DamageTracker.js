import React from "react";

// FULL county hail events array (last 18 months, as provided)
const COUNTY_HAIL_EVENTS = [
  {
    county: "Collin County, TX",
    events: [
      {
        date: "2023-06-11",
        location: "4 miles NE of Waxahachie (storm path included Collin County)",
        size: '3.25" (softball-sized)',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Collin County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Radar/Severe Thunderstorm Watch",
      },
      {
        date: "2025-05-29",
        location: "Dallas, TX area (includes Collin County)",
        size: "≥1 inch (Doppler radar detected hail)",
        source: "Doppler Radar",
      },
    ],
  },
  {
    county: "Dallas County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "Irving to Cedar Hill",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2025-06-01",
        location: "Dallas, TX",
        size: "≥1 inch (Doppler radar detected hail)",
        source: "Doppler Radar",
      },
      {
        date: "2025-05-29",
        location: "Dallas, TX",
        size: "≥1 inch (Doppler radar detected hail)",
        source: "Doppler Radar",
      },
      {
        date: "2025-06-03",
        location: "Dallas, TX",
        size: "≥1 inch (Doppler radar detected hail)",
        source: "Doppler Radar",
      },
    ],
  },
  {
    county: "Denton County, TX",
    events: [
      {
        date: "2023-06-11",
        location: "2 miles SW of Double Oak",
        size: '4.25" (grapefruit-sized)',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2023-06-15",
        location: "Sanger",
        size: '5" hail',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Denton County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Ellis County, TX",
    events: [
      {
        date: "2023-06-10",
        location: "3 miles SE of Rice",
        size: '2.5" hail',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2023-06-12",
        location: "Midlothian",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2023-06-15",
        location: "2 miles NE of Waxahachie",
        size: '3" hail',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Ellis County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Kaufman County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "General Kaufman County (storm path)",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Kaufman County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Rockwall County, TX",
    events: [
      {
        date: "2023-06-11",
        location: "General Rockwall County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Rockwall County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Tarrant County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "1 mile NE of Mansfield",
        size: '5" hail',
        source: "Radar/Local Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Tarrant County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Johnson County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "General Johnson County (storm path)",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Johnson County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Parker County, TX",
    events: [
      {
        date: "2023-06-11",
        location: "General Parker County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Parker County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Wise County, TX",
    events: [
      {
        date: "2023-06-11",
        location: "General Wise County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Wise County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Hunt County, TX",
    events: [
      {
        date: "2023-06-10",
        location: "General Hunt County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2023-06-11",
        location: "General Hunt County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Hunt County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Grayson County, TX",
    events: [
      {
        date: "2025-04-04",
        location: "General Grayson County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Fannin County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "General Fannin County",
        size: 'Up to 3.25" (softball-sized)',
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Fannin County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Cooke County, TX",
    events: [
      {
        date: "2023-06-15",
        location: "General Cooke County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Cooke County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Navarro County, TX",
    events: [
      {
        date: "2023-06-10",
        location: "General Navarro County (storm path)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Navarro County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Hill County, TX",
    events: [
      {
        date: "2025-04-04",
        location: "General Hill County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Hood County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "General Hood County (storm path)",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Hood County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Somervell County, TX",
    events: [
      {
        date: "2023-06-12",
        location: "General Somervell County (storm path)",
        size: "Supercell produced hail ≥1 inch",
        source: "Storm Report",
      },
      {
        date: "2025-04-04",
        location: "General Somervell County (under severe thunderstorm watch)",
        size: "Severe storms with hail ≥1 inch reported",
        source: "Severe Thunderstorm Watch",
      },
    ],
  },
  {
    county: "Bryan County, OK",
    events: [
      {
        date: "2025-06-02",
        location: "General Bryan County (part of storm path near Durant)",
        size: "≥1 inch (based on regional storm reports)",
        source: "Regional Storm Reports",
      },
    ],
  },
  {
    county: "Marshall County, OK",
    events: [
      {
        date: "2025-06-02",
        location: "General Marshall County (part of storm path near Madill)",
        size: "≥1 inch (based on regional storm reports)",
        source: "Regional Storm Reports",
      },
    ],
  },
];

// Config
const CLAIM_WINDOW_DAYS = 365;
const CLAIM_LOOKBACK_DAYS = 548; // 18 months

function getDaysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  return (now - then) / (1000 * 60 * 60 * 24);
}
function warningForEvent(dateStr) {
  const days = getDaysSince(dateStr);
  if (days > CLAIM_WINDOW_DAYS && days <= CLAIM_LOOKBACK_DAYS)
    return "⚠️ Claim window may be closed for this event!";
  if (days > CLAIM_LOOKBACK_DAYS)
    return null; // Too old to show
  return null;
}

export default function DamageTracker() {
  return (
    <div className="container">
      <div className="main-card">

        <h1 className="display-5 page-title text-center" style={{ marginBottom: 0 }}>
          North Texas Hail & Storm Damage Tracker
        </h1>
        <div style={{
          textAlign: "center",
          fontSize: "1.18rem",
          color: "#396fd6",
          marginBottom: "1.15em",
          marginTop: ".3em",
          fontWeight: 500,
        }}>
          Do you qualify for a free roof inspection?
        </div>

        {/* Responsive image row */}
        <div className="hail-image-row">
          <div className="hail-img-map-wrap">
            <img
              src="/countymap.png"
              alt="North Texas hail-impacted counties map"
              className="img-fluid hail-county-map"
            />
            <div className="hail-caption">
              Shaded counties show where we track recent hail damage (last 18 months).<br />
              These areas are the most storm-impacted in North Texas and Oklahoma. Data updated monthly.
            </div>
          </div>
          <div className="hail-img-ad-wrap">
            <img
              src="/freetexashailinspectionsmall.png"
              alt="Free Texas hail inspection promotion"
              className="img-fluid hail-promo-img"
            />
          </div>
        </div>

        <h2 className="h4 mb-4 text-primary text-center" style={{ marginTop: "1.7em" }}>
          Latest Severe Hail Events by County (≥ 1 inch, last 18 months)
        </h2>
        <p className="lead text-center mb-4" style={{ color: "#34435e" }}>
          See the biggest storms by county, with the most recent major hail events (1"+). Our data is updated monthly. Insurance coverage windows are usually <b>12 months</b>—don’t wait if you were hit!
        </p>

        {/* --- HAIL EVENTS BY COUNTY --- */}
        <div className="mb-4">
          {COUNTY_HAIL_EVENTS.map((county, idx) => (
            <div className="card mb-4" key={idx}>
              <h2 className="h5 text-primary mb-3">{county.county}</h2>
              {county.events
                .filter(ev => getDaysSince(ev.date) <= CLAIM_LOOKBACK_DAYS)
                .map((event, eIdx) => (
                <div key={eIdx} className="mb-2 ps-2">
                  <b>{event.date}:</b> {event.location}<br />
                  <span>Hail Size: <b>{event.size}</b></span><br />
                  <span>Source: {event.source}</span>
                  {warningForEvent(event.date) && (
                    <div className="text-warning fw-bold mt-1">
                      {warningForEvent(event.date)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="card p-4 mb-3">
          <h3 className="h6 text-primary mb-2">How Do I Know If I Qualify?</h3>
          <p>
            If your home is in a highlighted county and was hit by hail in the last 12 months, you may qualify for a full roof replacement at no cost (after deductible). Contact our DFW experts for a free inspection.
          </p>
          <a href="/contact" className="btn btn-primary submit-btn">Book Your Free Roof Inspection</a>
        </div>
      </div>
      {/* --- Custom Responsive Styles --- */}
      <style>{`
        .hail-image-row {
          display: flex;
          gap: 2.4em;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          margin-bottom: 1.3em;
        }
        .hail-img-map-wrap, .hail-img-ad-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hail-county-map {
          max-width: 550px;
          max-height: 277px;
          width: 100%;
          height: auto;
          border: 2px solid #18428a;
          background: #f8fafc;
          border-radius: 12px;
        }
        .hail-caption {
          color: #34435e;
          font-size: 1em;
          margin-top: 0.7em;
          background: #f4f8ff;
          padding: 0.4em 1.1em;
          border-radius: 0.7em;
          max-width: 540px;
        }
        .hail-promo-img {
          max-width: 277px;
          max-height: 277px;
          width: auto;
          height: 277px;
          border-radius: 10px;
          border: 2px solid #18428a;
          object-fit: cover;
          box-shadow: 0 2px 14px #18232f22;
          margin-top: 0;
        }
        @media (max-width: 850px) {
          .hail-image-row {
            flex-direction: column;
            align-items: center;
            gap: 1.5em;
          }
          .hail-county-map, .hail-promo-img {
            margin-bottom: 0.7em;
          }
        }
      `}</style>
    </div>
  );
}
