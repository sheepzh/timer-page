---
title: 程式安裝
---

# {{ $frontmatter.title }}

## 從商店安裝

你可以參考以下鏈接，在 Chrome、Edge 和 Firefox 中安裝該插件。

<InstallGrid />

## 從原始碼安裝

你也可以下載程式的原始碼，然後手動編譯安裝。

::: tip
此方法只適用基於 chromium 的瀏覽器。如果你想在 Safari 上安裝，請查看 [Safari 安裝指引](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md)。
:::

### 安裝環境

-   Git
-   Node.js >= 20

### 原始碼下載

```sh
git clone https://github.com/sheepzh/timer.git
```

### 依賴安裝

```sh
npm install
```

### 編譯和輸出

```sh
npm run build
```

編譯之後，根據你的分支，一個名為 `timer-[version].mv3.zip` 的輸出檔會出現在資料夾 `[PROJECT_ROOT]/market_packages/` 之下。然後你可以解壓縮它，並安裝到您的瀏覽器之中。

如果你的瀏覽器是 Firefox 或其他不支援 [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3) 的瀏覽器，你需要使用以下指令來完成編譯。

```sh
npm run build:firefox
```

同樣的，會出現一個名為 `timer-[version].firefox.zip` 的輸出檔。
