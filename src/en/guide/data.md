---
title: Data transmission
---

# {{$frontmatter.title}}

This extension only stores your data in local with `chrome.storage.local` API provided by the browser, and never sends your data anywhere.

But it supports tools to help you transmits your data.

## Export and import

You can export the data to a `.json` file on the backend page and then import it in other browsers. It should be noted that this operation is more suitable if you are just starting to use a new device or new browser.

Also You can import data exported from other similar extensions, and decide to override or append to local data.

| Other extension           | File format       | Remark                             |
| ------------------------- | ----------------- | ---------------------------------- |
| Webtime Tracker           | `.csv` or `.json` |                                    |
| Web Activity Time Tracker | `.csv`            |                                    |
| History Trends Unlimited  | `.tsc`            | Only contains data for visit count |

## Sync data across clients

This extension does not support services that store data remotely.

Instead, it provides tools to help you sync data into third-party services you trust.

| Third-party service | Prerequisites                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Github Gist         | Github access token granting Gist permissions                                                                                  |
| Obsidian            | Obsidian client with plugin [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) installed |

If the token is set correctly, you can query the data of other clients on the record page.
