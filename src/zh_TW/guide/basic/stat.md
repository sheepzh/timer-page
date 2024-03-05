---
title: 時間追蹤
---

# {{$frontmatter.title}}

## 統計維度

插件會依網域名稱和日期統計網站的瀏覽時間和造訪次數。換句話說，日期和網域構成了統計的最小粒度。

當然，它也支援你根據你的需要，合併條目進行統計。

## 合併統計相關的網站

如上所述，統計條目都是基於網域名稱為度。例如 `www.github.com` 和 `gist.github.com` 會被統計到 2 個條目中。 如果你想要查看這兩個網站的總和數據，你需要手動合併它們。

絕大多數的資料展示頁面都支援合併資料查詢。你也可以在後台頁裡，自訂不同網站的合併規則。

### 規則長什麼樣？

規則由兩部分組成，源和目標。來源部分聲明哪些網站會命中該規則，而目標部分定義如何合併這些網站。 例如 `gist.github.com >>> github.com` 就是一個常見的規則，左邊的是源頭，右邊的是目標。

### 如何定义源部分？

來源部分可以是具體的域名，也可以是 Ant 表達式。下面是一些例子。

| 來源部分         | 匹配的網站例子                                                    |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | 只有 `www.google.com` 能夠命中該規則                              |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### 如何定義目標部分？

目標部分可以是具體的域名，正整數，或是留空。 將在下表中結合源部分一一介紹。

| 來源部分             | 目標部分   | 規則外觀                           | 備註                                                        |
| -------------------- | ---------- | ---------------------------------- | ----------------------------------------------------------- |
| www.google.com.*     | google.com | `www.google.com.* >>> google.com`  | 符合 `www.google.com.*` 的網站會合併到指定條目 `google.com` |
| www.google.com.hk    |            | `www.google.com.hk >>> Not Merge`  | `www.google.com.hk` 不會被合併，因為目標部分為空            |
| \*\*\.\*\.google.com | 3          | `**.*.google.com >>> Keep Level 3` | 滿足 `**.*.google.com` 的網站，在合併時會保留後 3 級域名    |

下表是上述規則同時設定後的一些合併範例。

| 原始網站              | 命中的規則                                                           | 合併後的網站              |
| --------------------- | -------------------------------------------------------------------- | ------------------------- |
| www.google.com.au     | `www.google.com.* >>> google.com`                                    | google.com                |
| www.google.com.pt     | `www.google.com.* >>> google.com`                                    | google.com                |
| www.google.com.hk     | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> 不合并` | www.google.com.hk **(1)** |
| es.news.google.com    | `**.*.google.com >>> 3 级域名`                                       | news.google.com           |
| b.c.photos.google.com | `**.*.google.com >>> 3 级域名`                                       | photos.google.com         |
| pass.hust.edu.cn      |                                                                      | hust.edu.cn **(2)**       |

::: tip

(1) 命中多個規則時，來源部分是具體網域的優先

(2) 沒有命中任何規則時，合併至 [Public Suffix List](https://publicsuffix.org/) 的前一級
:::
