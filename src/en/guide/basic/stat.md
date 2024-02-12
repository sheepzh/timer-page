---
title: Tracking
---

# {{$frontmatter.title}}

## Dimensions of statistics

Time and count of visits will be grouped and aggregated by unique domain and date. It means that date and domain constitutes the smallest statistical granularity.

And this tool supports you to merge basic records according to your own needs.

## Summarize data of related sites

As above, this data is aggregated by domain. For example, `www.github.com` and `gist.github.com` are counted as 2 records. If you want to see aggregated data from the two sites, you'll need to merge them manually.

Most data display pages support merge queries. And you can customize merge rules on the backend page.

### What's rules look like?

The rule consists of two parts, the source part and the target part. The source part declares which sites hit the rule, and the target part defines how those sites are merged. For example, `gist.github.com >>> github.com` is a common rule, the left `gist.github.com` is the source part, and the right `github.com` is the target part.

### How to define the source part?

The source part can be a specific domain name or an Ant expression. Below are some examples.

| Source part      | Examples of hit sites                                             |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | Only `www.google.com` can hit this rule                           |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### How to define the target part?

The target part can be a specific domain name, a positive integer, or be left blank. They will be introduced one by one in conjunction with the source part in the table below.

| Source part          | Target part | Look                               | Remark                                                                            |
| -------------------- | ----------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| www.google.com.*     | google.com  | `www.google.com.* >>> google.com`  | Sites hitting `www.google.com.*` will be merged into the specific `google.com`    |
| www.google.com.hk    |             | `www.google.com.hk >>> Not Merge`  | `www.google.com.hk` won't be merged cause of blank target part                    |
| \*\*\.\*\.google.com | 3           | `**.*.google.com >>> Keep Level 3` | Sites hitting `**.*.google.com` will be merged into the last 3 level domain names |

The following table is some merge examples after setting the above rules together.

| Original site         | Hit rules                                                               | Merged site and remark    |
| --------------------- | ----------------------------------------------------------------------- | ------------------------- |
| www.google.com.au     | `www.google.com.* >>> google.com`                                       | google.com                |
| www.google.com.pt     | `www.google.com.* >>> google.com`                                       | google.com                |
| www.google.com.hk     | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge` | www.google.com.hk **(1)** |
| es.news.google.com    | `**.*.google.com >>> Keep Level 3`                                      | news.google.com           |
| b.c.photos.google.com | `**.*.google.com >>> Keep Level 3`                                      | photos.google.com         |
| pass.hust.edu.cn      |                                                                         | hust.edu.cn **(2)**       |

::: tip

(1) When multiple rules are hit, the source part takes precedence for a specific domain name

(2) Merge to the before level of [Public Suffix List](https://publicsuffix.org/) when no rules are hit

:::
