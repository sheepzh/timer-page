---
title: Does Chrome Have a Built-in Time Tracker? What to Use Instead
description: Chrome has no built-in tracker for per-website browsing durations. This article explains what Chrome and your operating system do offer, and how to add automatic, local-only website time tracking with an open-source extension.
---

# Does Chrome Have a Built-in Time Tracker? What to Use Instead

Short answer: **no**. Chrome can show you a list of sites you visited, but it has no built-in feature that tells you *how long* you spent on each website. If you're looking for the equivalent of a screen time report inside Chrome, you'll need a small extension.

Here is what Chrome and your operating system do offer, and where they fall short.

## What Chrome actually offers

**History**: records that a visit happened and when, but not the duration. You can see you opened a site at 9:15; you cannot see that you stayed until 10:40.

**Google My Activity**: this logs browsing through your Google account, and it lives in the cloud, the opposite of what most people want from a screen time tool. It also still doesn't produce a clean per-website duration report.

**Performance and usage stats in settings**: Chrome reports memory and battery usage per tab, which is about resource consumption, not your attention.

For the question most people are actually asking (how much time per day on YouTube, Reddit or news sites), Chrome itself has no answer.

## Why your operating system's screen time doesn't help either

macOS Screen Time and the equivalent Windows features mostly break down time **per application**. A browser counts as one app, so "Chrome: 5 hours" tells you nothing about which sites consumed those hours. Platform built-ins typically only report per-website detail for their own first-party browsers, such as Safari on macOS; third-party browsers like Chrome, Edge, Brave and Firefox stay invisible at the site level.

That's exactly the gap a dedicated extension fills: it lives *inside* the browser and sees site-level activity directly.

## Add a tracker to Chrome

<a href="/en/install" target="_blank" rel="noopener">Time Tracker - Web Habit Builder</a> adds what Chrome is missing:

- **Automatic per-website timing** based on the active tab, with no timers to start or stop
- **Daily and historical reports** per site, with trends and time-of-day charts (see the [analysis guide](/en/guide/basic/analysis))
- **Local-only storage** via your browser's own storage API: no account, no cloud, no upload
- **Available for Chrome, Edge and Firefox**, and free and open source under the MIT license

Install it, and every focused website accumulates time with second-level precision from then on. You can then act on the numbers with [website time limits](/en/guide/basic/limit) in the same extension; no second tool needed.

## Common follow-up questions

**Does this slow the browser down?** No. The extension is lightweight (around 1 MB) and only records which tab is focused; it does not inspect page content.

**Where is the data stored?** Entirely in your browser's local storage on your device. You can verify this in the open-source code, and you can [export or sync the data yourself](/en/guide/data) at any time.

**Does it work in incognito/private windows?** Browsers don't run extensions in private windows unless you explicitly allow it, so tracking follows your browser's privacy rules.

If per-website durations are what you need, the <a href="/en/install" target="_blank" rel="noopener">install page</a> lists the store links for all three browsers.

## Related reading

- [How to Track Time Spent on Websites in Chrome, Edge and Firefox](/en/blog/how-to-track-time-spent-on-websites)
- [Screen Time Tracker Without an Account: Local-Only Options](/en/blog/screen-time-tracker-without-account)
