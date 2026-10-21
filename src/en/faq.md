---
title: Frequently Asked Questions
faq:
    - q: Does Time Tracker collect my browsing data?
      a: No. All data is stored locally in your browser using the chrome.storage.local API and is never sent to any server. The project is fully open source, so you can verify this in the code.
    - q: Which browsers are supported?
      a: Chrome, Edge and Firefox on desktop, plus Firefox for Android, including site blocking. Chrome on Android does not support extensions.
    - q: Is Time Tracker free?
      a: Yes. The extension is completely free and open source, with no accounts and no subscriptions.
    - q: Can I sync my data across devices?
      a: Yes, through services you control. You can export your data as a JSON or CSV file and import it on another device, or back it up via your own WebDAV server, GitHub Gist or Obsidian — manually, or automatically on a schedule you configure. No third-party cloud of ours is involved.
    - q: How do I limit the time I spend on distracting websites?
      a: Create a limit rule with a restricted URL, then set a daily or weekly limit, a limit per visit, or time periods where access is not allowed. The rule takes effect as soon as the limit is reached.
    - q: Does time still count when I switch tabs or play videos?
      a: The timer follows the focused tab. Fullscreen video is always counted as active, and a tab playing audio is treated as active too. Otherwise the timer stops when you switch away, and tracking can also pause automatically when no activity is detected.
    - q: Does it work on mobile browsers?
      a: Firefox for Android is supported, including tracking and site blocking. Mobile Chrome and iOS browsers do not support the extension APIs required, so those platforms cannot be covered.
    - q: How long is my data kept?
      a: Indefinitely, by design. Data stays on your device until you delete it yourself in the data management page, and there is no automatic retention limit.
    - q: Can I migrate data from other time tracking extensions?
      a: Yes. You can import data exported from Webtime Tracker (CSV or JSON), Web Activity Time Tracker (CSV) and History Trends Unlimited (TSC), and choose to override or append to your local data. See [Data Sync](/en/guide/data).
    - q: Is my usage reported anywhere for statistics?
      a: No. The extension has no telemetry, no analytics and no remote logging. What you browse and how long you browse stays on your device.
---

# {{$frontmatter.title}}

Quick answers about how Time Tracker handles your data, which browsers it supports, and how to control your browsing time. For setup steps, see the [Getting Started guide](/en/guide/start).

## Does Time Tracker collect my browsing data?

No. All data is stored locally in your browser using the `chrome.storage.local` API and is never sent to any server. The project is fully open source, so you can verify this in the code.

## Which browsers are supported?

Chrome, Edge and Firefox on desktop, plus Firefox for Android, including site blocking. Chrome on Android does not support extensions.

## Is Time Tracker free?

Yes. The extension is completely free and open source, with no accounts and no subscriptions.

## Can I sync my data across devices?

Yes, through services you control. You can export your data as a JSON or CSV file and import it on another device, or back it up via your own WebDAV server, GitHub Gist or Obsidian — manually, or automatically on a schedule you configure. No third-party cloud of ours is involved. See [Data Sync](/en/guide/data) for details.

## How do I limit the time I spend on distracting websites?

Create a limit rule with a restricted URL, then set a daily or weekly limit, a limit per visit, or time periods where access is not allowed. The rule takes effect as soon as the limit is reached. See [Set Website Time Limits](/en/guide/basic/limit) for the full walkthrough.

## Does time still count when I switch tabs or play videos?

The timer follows the focused tab. Fullscreen video is always counted as active, and a tab playing audio is treated as active too. Otherwise the timer stops when you switch away, and tracking can also pause automatically when no activity is detected.

## Does it work on mobile browsers?

Firefox for Android is supported, including tracking and site blocking. Mobile Chrome and iOS browsers do not support the extension APIs required, so those platforms cannot be covered.

## How long is my data kept?

Indefinitely, by design. Data stays on your device until you delete it yourself in the data management page, and there is no automatic retention limit.

## Can I migrate data from other time tracking extensions?

Yes. You can import data exported from Webtime Tracker (CSV or JSON), Web Activity Time Tracker (CSV) and History Trends Unlimited (TSC), and choose to override or append to your local data. See [Data Sync](/en/guide/data).

## Is my usage reported anywhere for statistics?

No. The extension has no telemetry, no analytics and no remote logging. What you browse and how long you browse stays on your device.
