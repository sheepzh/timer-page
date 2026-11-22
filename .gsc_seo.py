import json
import os
import sys

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SITE = "sc-domain:time-tracker-4-browser.app"
TOKEN = os.path.expanduser("~/Library/Application Support/mcp-gsc/token.json")
SA_FILE = os.path.expanduser("~/keys/gsc_service_account.json")
READ_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"


def token_scopes():
    # A refresh request must use a subset of the originally granted scopes.
    # The cached token was granted webmasters (read-write), so replay that exact value.
    try:
        with open(TOKEN) as f:
            scopes = json.load(f).get("scopes")
    except Exception:
        scopes = None
    return scopes or [READ_SCOPE]


def client():
    if os.path.exists(SA_FILE):
        from google.oauth2 import service_account

        creds = service_account.Credentials.from_service_account_file(SA_FILE, scopes=[
                                                                      READ_SCOPE])
        return build("searchconsole", "v1", credentials=creds, cache_discovery=False)

    creds = Credentials.from_authorized_user_file(TOKEN, token_scopes())
    if not creds.valid and creds.refresh_token:
        creds.refresh(Request())
        with open(TOKEN, "w") as f:
            f.write(creds.to_json())
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def query(svc, dims, start, end, limit=25000):
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dims,
        "rowLimit": limit,
    }
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])


def main():
    start, end, mode = sys.argv[1], sys.argv[2], sys.argv[3]
    svc = client()

    if mode == "daily":
        rows = query(svc, ["date"], start, end)
        rows.sort(key=lambda r: r["keys"][0])
        print("date\tclicks\timpressions\tctr\tposition")
        for r in rows:
            print(
                f"{r['keys'][0]}\t{r['clicks']}\t{r['impressions']}\t{r['ctr']:.4f}\t{r['position']:.2f}")
        return

    for dims in (["country"], ["page"], ["query"]):
        rows = query(svc, dims, start, end)
        clicks = sum(r["clicks"] for r in rows)
        imps = sum(r["impressions"] for r in rows)
        ctr = clicks / imps if imps else 0
        print(
            f"### {'/'.join(dims)}\trows={len(rows)}\tclicks={clicks}\timpressions={imps}\tctr={ctr:.4f}")
        rows.sort(key=lambda r: (-r["impressions"], -r["clicks"]))
        for r in rows[:30]:
            print(
                f"{r['keys'][0]}\t{r['clicks']}\t{r['impressions']}\t{r['ctr']:.4f}\t{r['position']:.2f}")
        print()


if __name__ == "__main__":
    main()
