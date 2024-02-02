---
title: Control
---

# {{$frontmatter.title}}

Once you realize how much time you spend on useless websites through the above analysis report. Maybe, you need to control the time.

This extension supports you to limit your behavior on any website.

## Create limit rules

Firstly, you need create rules on the backend page.

Each rule contains several parts, as shown in the following table.

| Part                | Description                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Restricted URL      | The URL that needs to be restricted. Expressions are supported. Such as `https://www.github.com`, `*://www.google.com/** ` |
| Daily limit         | Maximum time per day, zero means no limit.                                                                                 |
| Limit per visit     | Maximum time per visit, zero means no limit.                                                                               |
| Not allowed periods | The time periods during which access to the target URL is always restricted.                                               |

## Restricted

If you meet the restrictions of any rule, the pages you are visiting will be covered with a mask that prevents you from browsing.

To continue, you must go to the rules page and disable or modify this rule. If the unlock operation is set in the option, verification or password is also required.

::: warning
Disgusting Verification Code is really hard and disgusting, it may take you too much time to unlock it!
:::
