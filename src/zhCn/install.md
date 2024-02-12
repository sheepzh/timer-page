---
title: 插件安装
---

# {{ $frontmatter.title }}

## 从商城安装

您可以参照以下链接，在 Chrome、Edge 和 Firefox 中安装该插件。

<InstallGrid />

## 从源代码安装

您也可以下载插件的源代码，然后手动编译和安装。

::: tip
该方法只适用基于 chromium 的浏览器。如果您想在 Safari 上安装，请查看 [Safari 安装指引](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md)。
:::

### 安装环境

-   Git
-   Node.js >= 18

### 源代码下载

```sh
git clone https://github.com/sheepzh/timer.git
```

如果您的浏览器不支持 [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)，您需要切换到分支 `mv2`。

```sh [switch branch for mv2]
git fetch -a & git checkout origin/mv2
```

### 依赖安装

```sh
npm install
```

### 编译和输出

```sh
npm run build
```

编译之后，根据您的分支，一个名为 `timer-[version].zip` 或 `timer-[version].mv3.zip` 的输出文件会出现在文件夹 `[PROJECT_ROOT]/market_packages/` 之下。然后您可以解压它，并安装到您的浏览器之中。
