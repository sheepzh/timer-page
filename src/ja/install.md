---
title: インストール
---

# {{$frontmatter.title}}

## ウェブストアから

この拡張機能は、Chrome、Edge、Firefoxのウェブストアに正式にリリースされています。以下のリンクから直接インストールできます。

<InstallGrid />

## ソースコードから

ソースコードをダウンロードして手動でインストールすることもできます。

::: tip
このセクションは、Chromiumベースのブラウザにのみ適用されます。Safariにインストールする場合は、[このページ](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md)をお読みください。
:::

### 前提条件

-   Git
-   Node.js バージョン20以上

### コードのダウンロード

```sh
git clone https://github.com/sheepzh/timer.git
```

### 依存関係のインストール

```sh
npm install
```

### ビルドと出力

```sh
npm run build
```

コンパイル後、`target.zip`という名前のファイルが`[PROJECT_ROOT]/market_packages/`フォルダの下に出力されます。その後、解凍してブラウザに読み込むことができます。

Firefoxや[Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)をサポートしていない他のブラウザの場合、コンパイルにはこのコマンドを使用する必要があります。

```sh
npm run build:firefox
```

同様に、`target.firefox.zip`という名前のファイルが出力されます。
