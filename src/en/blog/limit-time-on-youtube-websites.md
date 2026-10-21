---
title: How to Limit Time on YouTube and Other Websites in Chrome
description: Set a daily time limit for YouTube, Reddit, social media or any website in Chrome, Edge and Firefox. Free and open-source website time limiter with per-visit limits and blocked time periods.
---

# How to Limit Time on YouTube and Other Websites in Chrome

"I'll watch one video" is how an evening disappears: the autoplay queue keeps feeding the next one, and willpower at 11 pm rarely wins. A rule enforced by your browser holds up better.

This guide shows how to set an automatic time limit for YouTube (or any other website) using a free, open-source extension for Chrome, Edge and Firefox.

## Why not install a "YouTube limiter" extension?

The store is full of single-purpose limiters: one for YouTube, another for TikTok, a third for Instagram.

- **One extension per site** means five sites, five tools, five sets of permissions
- Most of them only know their one target site; a news habit or a Reddit habit is out of scope
- Each extra extension is extra memory and one more party your browser must trust

A general-purpose rule engine handles all of them with one tool: the same extension that [tracks your time](/en/blog/how-to-track-time-spent-on-websites) can also enforce limits on any URL pattern.

## How the limiting rules work

In <a href="/en/install" target="_blank" rel="noopener">Time Tracker - Web Habit Builder</a>, each rule combines a target URL with one or more constraints (see the full [control guide](/en/guide/basic/limit)):

| Constraint | What it does |
| --- | --- |
| **Daily limit** | Maximum time per day on the site; once the budget is used up, the site is covered by a blocking mask until the next day |
| **Limit per visit** | Caps each single visit, so "just checking quickly" can't become an hour |
| **Not allowed periods** | Blocks the site during defined windows, e.g. 9:00–12:00 on workdays |
| **Weekly limit** | Maximum time per week, for patterns where a daily cap doesn't fit |
| **Focus sessions** | While a Focus or Pomodoro session runs, restricted sites stay blocked |

URLs support expressions, so one rule can cover a whole domain or specific sections of it.

## Setting a YouTube limit, step by step

1. Install the extension from your browser's store; it's free and needs no account
2. Open the dashboard and go to the control section
3. Create a rule with `https://www.youtube.com` as the restricted URL
4. Set a daily limit — for example 30 minutes
5. Optionally add a per-visit cap of 10 minutes, and "not allowed" hours for your deep-work window

From now on, when the daily budget is spent, the page gets covered by a blocking mask, and it stays blocked until the next day unless you deliberately change the rule. The optional unlock verification (a question, a password or two-factor) makes bypassing the rule a deliberate act rather than a one-click one.

## The same rule works for everything else

Because the rule engine matches URL patterns rather than a hardcoded site list, the same approach limits social media, news, shopping or gaming sites. It also runs on Chrome, Edge and Firefox, so your rules cover every browser you use.

A practical starter set:

- **Social feeds**: 20 minutes/day, plus not-allowed hours during work
- **News**: per-visit limit only, so quick checks stay quick
- **Video streaming**: daily limit in the evening window you actually want

All data, your rules and usage history alike, stays local in your browser. You can [export it anytime](/en/guide/data) or answer common questions in the [FAQ](/en/faq).

Start with one rule for the site that costs you the most time; the rest can wait. The <a href="/en/install" target="_blank" rel="noopener">install page</a> has the store links.

## Related reading

- [How to Track Time Spent on Websites in Chrome, Edge and Firefox](/en/blog/how-to-track-time-spent-on-websites)
- [The Best Time Tracking Chrome Extensions in 2026](/en/blog/best-time-tracking-chrome-extensions-2026)
