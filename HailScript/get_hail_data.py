import csv
import json
import requests
from datetime import datetime, timedelta, timezone
from collections import defaultdict

# --- COUNTIES ---
TX_COUNTIES = [
    "COLLIN", "DALLAS", "DENTON", "ELLIS", "KAUFMAN", "ROCKWALL", "TARRANT",
    "JOHNSON", "PARKER", "WISE", "HUNT", "GRAYSON", "FANNIN", "COOKE",
    "NAVARRO", "HILL", "HOOD", "SOMERVELL"
]
OK_COUNTIES = [
    "BRYAN", "MARSHALL"
]

# --- Date logic: Last 365 completed days (no future!) ---
today = datetime.now(timezone.utc).date()
END_DATE = today - timedelta(days=1)           # yesterday
START_DATE = END_DATE - timedelta(days=364)    # 364 days before yesterday

BASE_URL = "https://www.spc.noaa.gov/climo/reports/{}.csv"
hail_events_by_county = defaultdict(list)

print(f"Fetching hail reports for {len(TX_COUNTIES)} TX + {len(OK_COUNTIES)} OK counties, {START_DATE} to {END_DATE}...")

for day in range(365):
    date = START_DATE + timedelta(days=day)
    datestr = date.strftime("%y%m%d")
    url = BASE_URL.format(datestr)
    try:
        r = requests.get(url, timeout=30)
        if r.status_code != 200:
            print(f"Skipped {datestr}: Not found")
            continue
        decoded = r.content.decode("utf-8")
        reader = csv.reader(decoded.splitlines())
        for row in reader:
            if not row or row[0] != "HAIL":
                continue
            try:
                size = float(row[8])
            except:
                continue
            if size < 1.0:
                continue
            county = row[6].strip().upper()
            state = row[7].strip().upper()
            # Texas counties
            if state == "TX" and county in TX_COUNTIES:
                hail_events_by_county[f"{county},TX"].append({
                    "date": row[1],
                    "size": size,
                    "location": row[5],
                    "lat": float(row[3]),
                    "lon": float(row[4])
                })
            # Oklahoma counties
            if state == "OK" and county in OK_COUNTIES:
                hail_events_by_county[f"{county},OK"].append({
                    "date": row[1],
                    "size": size,
                    "location": row[5],
                    "lat": float(row[3]),
                    "lon": float(row[4])
                })
    except Exception as e:
        print(f"Error fetching {datestr}: {e}")

print(f"Fetched hail events for {len(hail_events_by_county)} counties.")

# Format JSON output as requested
output = []
for key, events in hail_events_by_county.items():
    county, state = key.split(",")
    output.append({
        "county": county,
        "state": state,
        "events": sorted(events, key=lambda x: x["date"], reverse=True)
    })

with open("hail_events.json", "w") as f:
    json.dump(output, f, indent=2)

print(f"Saved all hail events to hail_events.json")
