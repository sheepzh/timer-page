---
title: About Time Tracker
description: "Time Tracker is a free, open-source browser extension for Chrome, Edge and Firefox. Who builds it, how it works, and its local-only privacy model."
---

# {{$frontmatter.title}}

Time Tracker - Web Habit Builder is a browser extension that records how long you spend on each website, turns that record into habit reports, and lets you limit the sites that cost you the most time. It is free and open source under the MIT license, and it works in Chrome, Edge and Firefox. Your data stays on your device: there is no account and nothing is uploaded.

## What it does

-   **Automatic time tracking.** Time is recorded per website based on the active tab, with no timers to start or stop. Records are grouped by domain and date, and can be refined with custom sites, tags and merge rules.
-   **Habit reports.** Pie charts, time-of-day distribution, busiest hours, longest idle periods, per-site history and period comparison, all built on the tracked data.
-   **Site time limits.** Daily and weekly caps, per-visit caps, blocked hours and focus sessions for any URL pattern, with optional password, question or two-factor verification to unlock a rule.
-   **Data you control.** Export to JSON or CSV, import from other trackers, and back up to your own GitHub Gist, WebDAV server or Obsidian. See the [Getting Started guide](/en/guide/start) and [Data Sync](/en/guide/data).

## Open source

The extension and this documentation are both open source, so the privacy claims can be checked in the code rather than taken on faith.

-   [Extension source](https://github.com/sheepzh/time-tracker-4-browser): MIT-licensed code of the extension.
-   [Documentation source](https://github.com/sheepzh/timer-page): this VitePress site.
-   [Issue tracker and changelog](https://github.com/sheepzh/timer): bug reports, feature requests and release history.

## Privacy by design

Time Tracker collects only the browsing data needed to count time, stores it in your browser's own local storage (`chrome.storage.local`), and never sends it to a server. There is no telemetry, no analytics and no remote logging. The full details are in the [privacy statement](/en/privacy).

## Who maintains it

The project is maintained by an independent open-source developer, [Victor Zhang (@sheepzh)](https://github.com/sheepzh), together with the contributors who report issues, request features and help translate the documentation. Questions and feedback are welcome on the [issue tracker](https://github.com/sheepzh/timer/issues) and in the [Discord community](https://discord.gg/yXCngD8pKS).

## Availability

Time Tracker is free, with no account, no subscription and no premium tier. It runs on Chrome, Edge and Firefox for desktop and on Firefox for Android, and this documentation is published in ten languages. Install it from the [installation page](/en/install), or read the [FAQ](/en/faq) for common questions.
