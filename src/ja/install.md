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

### コンパイル

```sh
cd timer
npm install
npm run build:prod
```

### インストール

1. ブラウザで拡張機能ページを開きます。
2. 開発者モードを有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」ボタンをクリックします。
4. コンパイルされたコードの`dist/`フォルダを選択します。
