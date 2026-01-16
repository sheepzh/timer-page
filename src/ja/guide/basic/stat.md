---
title: 追跡
---

# {{$frontmatter.title}}

## 統計の次元

時間と訪問回数は、一意のドメインと日付でグループ化および集約されます。つまり、日付とドメインが最小の統計粒度を構成します。

このツールでは、独自のニーズに応じて基本レコードをマージできます。

## 関連サイトのデータを要約する

上記のように、このデータはドメインごとに集約されます。たとえば、`www.github.com`と`gist.github.com`は2つのレコードとしてカウントされます。2つのサイトから集約されたデータを表示する場合は、手動でマージする必要があります。

ほとんどのデータ表示ページは、マージクエリをサポートしています。バックエンドページでマージルールをカスタマイズできます。

### ルールはどのように見えますか？

ルールは、ソース部分とターゲット部分の2つの部分で構成されます。ソース部分は、どのサイトがルールにヒットするかを宣言し、ターゲット部分は、それらのサイトがどのようにマージされるかを定義します。たとえば、`gist.github.com >>> github.com`は一般的なルールで、左の`gist.github.com`がソース部分、右の`github.com`がターゲット部分です。

### ソース部分を定義する方法は？

ソース部分は、特定のドメイン名またはAnt式にすることができます。以下はいくつかの例です。

| ソース部分       | ヒットするサイトの例                                              |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | `www.google.com`のみがこのルールにヒットできます                  |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### ターゲット部分を定義する方法は？

ターゲット部分は、特定のドメイン名、正の整数、または空白のままにすることができます。以下の表でソース部分と組み合わせて、1つずつ紹介します。

| ソース部分             | ターゲット部分 | 外観                              | 備考                                                                         |
| --------------------- | -------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| www.google.com.*      | google.com     | `www.google.com.* >>> google.com` | `www.google.com.*`にヒットするサイトは、特定の`google.com`にマージされます   |
| www.google.com.hk     |                | `www.google.com.hk >>> Not Merge` | ターゲット部分が空白のため、`www.google.com.hk`はマージされません            |
| \*\*\.\*\.google.com  | 3              | `**.*.google.com >>> Keep Level 3` | `**.*.google.com`にヒットするサイトは、最後の3レベルのドメインでマージされます |

以下の表は、上記のルールを同時に設定した後のマージ例です。

| 元のサイト              | ヒットするルール                                                               | マージ後のサイトと備考    |
| ---------------------- | ------------------------------------------------------------------------------ | ------------------------- |
| www.google.com.au      | `www.google.com.* >>> google.com`                                             | google.com                |
| www.google.com.pt      | `www.google.com.* >>> google.com`                                             | google.com                |
| www.google.com.hk      | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge`      | www.google.com.hk **(1)** |
| es.news.google.com     | `**.*.google.com >>> Keep Level 3`                                             | news.google.com           |
| b.c.photos.google.com  | `**.*.google.com >>> Keep Level 3`                                             | photos.google.com         |
| pass.hust.edu.cn       |                                                                                | hust.edu.cn **(2)**        |

::: tip

(1) 複数のルールがヒットする場合、ソース部分が特定のドメイン名のものが優先されます

(2) ルールがヒットしない場合、[Public Suffix List](https://publicsuffix.org/)の前のレベルにマージされます

:::
