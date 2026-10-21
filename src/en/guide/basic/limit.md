---
title: Set Website Time Limits
description: "Set daily and weekly time limits on any website. Distracting pages get covered by a blocking overlay, with optional password or two-factor verification."
---

# {{$frontmatter.title}}

Once the analysis report above shows you how much time you spend on the sites that cost you the most time, you may want to control your browsing time.

This extension lets you set rules that limit your browsing on any website.

## Create limit rules

Firstly, you need to create rules on the dashboard.

Each rule contains several parts, as shown in the following table.

| Part                | Description                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Restricted URL      | The URL that needs to be restricted. Expressions are supported. Such as `https://www.github.com`, `*://www.google.com/** ` |
| Daily limit         | Maximum time per day, zero means no limit.                                                                                 |
| Limit per visit     | Maximum time per visit, zero means no limit.                                                                               |
| Not allowed periods | The time periods during which access to the target URL is always restricted.                                               |

## When a Rule Triggers

Once the restrictions of any rule are reached, the pages you are visiting are covered by a blocking overlay that prevents browsing.

To continue, you must go to the rules page and disable or modify this rule. If the unlock operation is set in the option, verification or password is also required.

::: warning
High-difficulty CAPTCHAs are intentionally annoying, and unlocking may take significant time. Configure with caution.
:::
