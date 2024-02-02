---
title: Installation
---

# {{ $frontmatter.title }}

## From web store

The extension is officially released to the web stores of Chrome, Edge and Firefox. You can install it directly from these links below.

<InstallGrid />

## From source code

You can also download the source code to install it manually.

::: tip
This section only applies to chromium based browsers. If you want to install it for Safari, please read [this page](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Prerequisites

-   Git.
-   Node.js version 18 or higher.

### Code download

```sh
git clone https://github.com/sheepzh/timer.git
```

If your browser does not support [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), you need to switch to the `mv2` branch.

```sh [switch branch for mv2]
git fetch -a & git checkout origin/mv2
```

### Dependencies installation

```sh
npm install
```

### Building & outputs

```sh
npm run build
```

After compilation, one file named `timer-[version].zip` or `timer-[version].mv3.zip`, depending on your branch, will be output under the folder `[PROJECT_ROOT]/market_packages/`. Then you can unpack it and load into your browser.
