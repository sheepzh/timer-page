---
title: 时间追踪
---

# {{$frontmatter.title}}

## 统计维度

插件会按域名和日期统计网站的浏览时间和访问次数。换句话说，日期和域名构成了统计的最小粒度。

当然，它也支持您根据您的需要，合并条目进行统计。

## 合并统计相关的网站

如上所述，统计条目都是基于域名为度。比如 `www.github.com` 和 `gist.github.com` 会被统计到 2 个条目中。如果您想要查看这两个网站的总和数据，就需要手动合并它们。

绝大多数的数据展示页面都支持合并数据查询。你也可以在后台页里，自定义不同网站的合并规则。

### 规则长什么样？

规则由两部分组成，源和目标。源部分声明哪些站点会命中该规则，而目标部分定义如何合并这些站点。比如 `gist.github.com >>> github.com` 就是一个常见的规则，左边的是源，右边的是目标。

### 如何定义源部分？

源部分可以是具体的域名，也可以是 Ant 表达式。下面是一些例子。

| 源部分           | 匹配的网站例子                                                    |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | 只有 `www.google.com` 能够命中该规则                              |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### 如何定义目标部分？

目标部分可以是具体的域名，正整数，或者留空。将在下表中结合源部分一一介绍。

| 源部分               | 目标部分   | 规则外观                           | 备注                                                          |
| -------------------- | ---------- | ---------------------------------- | ------------------------------------------------------------- |
| www.google.com.*     | google.com | `www.google.com.* >>> google.com`  | 满足 `www.google.com.*` 的网站会被合并到指定条目 `google.com` |
| www.google.com.hk    |            | `www.google.com.hk >>> Not Merge`  | `www.google.com.hk` 不会被合并，因为目标部分为空              |
| \*\*\.\*\.google.com | 3          | `**.*.google.com >>> Keep Level 3` | 满足 `**.*.google.com` 的网站，在合并时会保留后 3 级域名      |

下表是上述规则同时设置后的一些合并示例。

| 原始网站              | 命中的规则                                                           | 合并后的网站              |
| --------------------- | -------------------------------------------------------------------- | ------------------------- |
| www.google.com.au     | `www.google.com.* >>> google.com`                                    | google.com                |
| www.google.com.pt     | `www.google.com.* >>> google.com`                                    | google.com                |
| www.google.com.hk     | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> 不合并` | www.google.com.hk **(1)** |
| es.news.google.com    | `**.*.google.com >>> 3 级域名`                                       | news.google.com           |
| b.c.photos.google.com | `**.*.google.com >>> 3 级域名`                                       | photos.google.com         |
| pass.hust.edu.cn      |                                                                      | hust.edu.cn **(2)**       |

::: tip

(1) 命中多个规则时，源部分是具体域名的优先

(2) 没有命中任何规则时，合并至 [Public Suffix List](https://publicsuffix.org/) 的前一级
:::
