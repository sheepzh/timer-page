---
title: Track Website Time
description: "Track time spent on each website automatically. Per-domain and daily statistics, custom sites for a single subpage, site tags, and domain merging rules."
---

# {{$frontmatter.title}}

## Dimensions of statistics

Time and count of visits are grouped and aggregated by unique domain and date. In that default view, a domain plus a date is the smallest unit.

Two settings change that granularity in opposite directions. Custom sites go finer, so one subpage can be counted on its own. Merge rules go coarser, so several related domains collapse into one record. Site tags sit across both, letting you group any set of sites under a label you choose.

## Count a single subpage as its own site

A domain record cannot tell you how long one specific page held your attention. If you want that, add a custom site on the site management page, using the button in the top right.

A custom site matches the whole URL rather than only the host, and the pattern follows the Ant format, so wildcards work the same way they do in merge rules. Two cases where this is useful:

- A video or document you return to constantly, for example one YouTube video or one Notion page, counted separately from the rest of the domain
- A subpath that means something different from the site as a whole, for example `/jobs` on a recruiting site or `/watch` on a video site

Once a custom site matches a visit, that visit is recorded against the custom site in addition to the domain, so the subpage shows up as its own row in the statistics.

## Group sites with tags

Each site can carry a tag, and tags are assigned on the site management page, including in batch for several sites at once. Statistics queries accept tag filters, so you can look at one group without changing how the underlying records are stored.

Tags are manual. The extension does not classify sites into productivity buckets on its own, which is the difference between this and tools that score sites automatically. What you get instead is a grouping that matches how you actually think about your own browsing.

Tags are included when you export site data, so the grouping survives a migration to another device.

## Summarize data of related sites

As above, this data is aggregated by domain. For example, `www.github.com` and `gist.github.com` are counted as 2 records. If you want to see aggregated data from the two sites, you'll need to merge them manually.

Most data display pages support merge queries. And you can customize merge rules on the dashboard.

### What do the rules look like?

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
| www.google.com.hk    |             | `www.google.com.hk >>> Not Merge`  | `www.google.com.hk` won't be merged because of blank target part                    |
| \*\*\.\*\.google.com | 3           | `**.*.google.com >>> Keep Level 3` | Sites hitting `**.*.google.com` will be merged into the right-most 3 labels of the domain |

The following table is some merge examples after setting the above rules together.

| Original site         | Hit rules                                                               | Merged site and remark    |
| --------------------- | ----------------------------------------------------------------------- | ------------------------- |
| www.google.com.au     | `www.google.com.* >>> google.com`                                       | google.com                |
| www.google.com.pt     | `www.google.com.* >>> google.com`                                       | google.com                |
| www.google.com.hk     | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge` | www.google.com.hk **(1)** |
| es.news.google.com    | `**.*.google.com >>> Keep Level 3`                                      | news.google.com           |
| b.c.photos.google.com | `**.*.google.com >>> Keep Level 3`                                      | photos.google.com         |
| dept.cam.ac.uk      |                                                                         | cam.ac.uk **(2)**       |

::: tip

(1) When multiple rules are hit, the source part takes precedence for a specific domain name

(2) Merge to the parent level of [Public Suffix List](https://publicsuffix.org/) when no rules are hit

:::
