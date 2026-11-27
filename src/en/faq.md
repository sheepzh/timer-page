---
title: "Browser Time Tracker FAQ: Limits, Privacy and Migration"
description: Find quick answers on website time tracking, Chrome time limits, local-only privacy, data import, export, sync and supported browsers.
faq:
    - q: How do I see how much time I spend on each website?
      a: Install the extension and it records time per website on its own, second by second, with no timer to start. Open the dashboard for today's totals, then switch to the report pages for per-site history, weekly trends and time-of-day distribution.
    - q: Does Chrome track website time on its own?
      a: No. Chrome History records that a visit happened and when it started, not how long you stayed. Google My Activity logs browsing through your Google account and stores it in the cloud, and it still gives no clean per-website duration. An extension that runs inside the browser is the only way to get site-level time.
    - q: Can Chrome limit how long I spend on a website?
      a: Chrome has no built-in site time limit. This extension adds four kinds of rule for any URL pattern — a daily or weekly cap, a cap per single visit, blocked hours, and a focus session that keeps chosen sites closed while it runs.
    - q: How do I stop YouTube from taking my whole evening?
      a: Give YouTube a daily budget, then add a per-visit cap so one video cannot turn into two hours, and block the hours you want back. When the budget runs out the page is covered until the next day. You can require a password, a custom question or a two-factor code to unlock it, so skipping the rule takes a deliberate act.
    - q: Is there a time tracker that works without an account?
      a: This one never asks for registration. Everything is written to your browser's own local storage, nothing is uploaded, and the code is MIT-licensed so the storage behaviour can be checked rather than trusted.
    - q: How do I move my history from another time tracker?
      a: Export from the old extension, then use the import tool. It reads Webtime Tracker (CSV or JSON), Web Activity Time Tracker (CSV) and History Trends Unlimited (TSC), and you choose whether the imported rows overwrite or append to what you already have.
    - q: Does Time Tracker collect or report my browsing data?
      a: No. There is no telemetry, no analytics and no remote logging. Data lives in the chrome.storage.local API on your device and the project is fully open source, so you can verify both claims in the repository.
    - q: Which browsers are supported?
      a: Chrome, Edge and Firefox on desktop, plus Firefox for Android, including site blocking there. Chrome on Android does not support extensions at all, which is a platform restriction rather than a missing feature.
    - q: Is Time Tracker free?
      a: Yes. Completely free and open source, with no accounts, no subscriptions and no premium tier.
    - q: Can I sync my data across devices?
      a: Yes, through services you control. Export as JSON or CSV and import on the other device, or back up to your own WebDAV server, a private GitHub Gist or Obsidian via its Local REST API plugin. Backups run on demand or on a schedule you set. No cloud of ours is involved.
    - q: Does time still count when I switch tabs or play videos?
      a: The timer follows the focused tab. Fullscreen video always counts as active, and a tab playing audio counts as active too. Otherwise timing stops when you switch away, and it can also pause automatically when no activity is detected.
    - q: How long is my data kept?
      a: Indefinitely, by design. It stays on your device until you delete it yourself on the data management page. There is no automatic retention limit and no cleanup schedule.
    - q: Can I export the data or take it with me?
      a: Yes, as JSON or CSV at any time. Both are open formats, so the history is not locked into this extension.
---

# {{$frontmatter.title}}

Answers to the questions people ask before installing a browser time tracker, and the ones that come up afterwards. For setup steps, see the [Getting Started guide](/en/guide/start).

## How do I see how much time I spend on each website?

Install the extension and it records time per website on its own, second by second, with no timer to start. Open the dashboard for today's totals, then switch to the report pages for per-site history, weekly trends and time-of-day distribution. See [How Tracking Works](/en/guide/basic/stat) and [Habit Reports](/en/guide/basic/analysis).

## Does Chrome track website time on its own?

No. Chrome History records that a visit happened and when it started, not how long you stayed. Google My Activity logs browsing through your Google account and stores it in the cloud, and it still gives no clean per-website duration. An extension that runs inside the browser is the only way to get site-level time. The [full breakdown](/en/blog/does-chrome-have-built-in-time-tracker) covers what Chrome and your operating system do report.

## Can Chrome limit how long I spend on a website?

Chrome has no built-in site time limit. This extension adds four kinds of rule for any URL pattern — a daily or weekly cap, a cap per single visit, blocked hours, and a focus session that keeps chosen sites closed while it runs. See [Set Website Time Limits](/en/guide/basic/limit) for the walkthrough.

## How do I stop YouTube from taking my whole evening?

Give YouTube a daily budget, then add a per-visit cap so one video cannot turn into two hours, and block the hours you want back. When the budget runs out the page is covered until the next day. You can require a password, a custom question or a two-factor code to unlock it, so skipping the rule takes a deliberate act. The [YouTube walkthrough](/en/blog/limit-time-on-youtube-websites) has the exact settings.

## Is there a time tracker that works without an account?

This one never asks for registration. Everything is written to your browser's own local storage, nothing is uploaded, and the code is MIT-licensed so the storage behaviour can be checked rather than trusted. [Local-only options compared](/en/blog/screen-time-tracker-without-account).

## How do I move my history from another time tracker?

Export from the old extension, then use the import tool. It reads Webtime Tracker (CSV or JSON), Web Activity Time Tracker (CSV) and History Trends Unlimited (TSC), and you choose whether the imported rows overwrite or append to what you already have. See [Data Sync](/en/guide/data) and the [alternatives comparison](/en/blog/webtime-tracker-alternatives).

## Does Time Tracker collect or report my browsing data?

No. There is no telemetry, no analytics and no remote logging. Data lives in the `chrome.storage.local` API on your device and the project is fully open source, so you can verify both claims in the repository.

## Which browsers are supported?

Chrome, Edge and Firefox on desktop, plus Firefox for Android, including site blocking there. Chrome on Android does not support extensions at all, which is a platform restriction rather than a missing feature.

## Is Time Tracker free?

Yes. Completely free and open source, with no accounts, no subscriptions and no premium tier.

## Can I sync my data across devices?

Yes, through services you control. Export as JSON or CSV and import on the other device, or back up to your own WebDAV server, a private GitHub Gist or Obsidian via its Local REST API plugin. Backups run on demand or on a schedule you set. No cloud of ours is involved. See [Data Sync](/en/guide/data) for details.

## Does time still count when I switch tabs or play videos?

The timer follows the focused tab. Fullscreen video always counts as active, and a tab playing audio counts as active too. Otherwise timing stops when you switch away, and it can also pause automatically when no activity is detected.

## How long is my data kept?

Indefinitely, by design. It stays on your device until you delete it yourself on the data management page. There is no automatic retention limit and no cleanup schedule.

## Can I export the data or take it with me?

Yes, as JSON or CSV at any time. Both are open formats, so the history is not locked into this extension.
