import csv
import requests
from datetime import datetime, timedelta, timezone

print("Starting Denton County hail search for past 365 days...")

county = "DENTON"
state = "TX"
today = datetime.now(timezone.utc).date()
END_DATE = today - timedelta(days=1)
START_DATE = END_DATE - timedelta(days=364)
BASE_URL = "https://www.spc.noaa.gov/climo/reports/{}.csv"

found = []

for day in range(365):
    date = START_DATE + timedelta(days=day)
    datestr = date.strftime("%y%m%d")
    print(f"Checking {datestr}...", flush=True)
    url = BASE_URL.format(datestr)
    try:
        r = requests.get(url, timeout=30)
        if r.status_code != 200:
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
            row_county = row[6].strip().upper()
            row_state = row[7].strip().upper()
            if row_county == county and row_state == state:
                found.append({
                    "date": row[1],
                    "size": size,
                    "location": row[5],
                    "lat": float(row[3]),
                    "lon": float(row[4])
                })
    except Exception as e:
        print(f"Error fetching {datestr}: {e}")

if found:
    print(f"\nFound {len(found)} hail events for {county} County, TX in the last year:")
    for ev in found:
        print(ev)
else:
    print("\nNo hail events found for Denton County, TX in the last 365 days.")
