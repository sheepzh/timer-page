---
title: Installation
---

# {{$frontmatter.title}}

## Aus dem Web Store

Die Erweiterung wird offiziell in den Web Stores von Chrome, Edge und Firefox veröffentlicht. Sie können sie direkt über die folgenden Links installieren.

<InstallGrid />

## Aus dem Quellcode

Du kannst auch den Quellcode herunterladen, um ihn manuell zu installieren.

::: tip
Dieser Abschnitt gilt nur für Chromium-basierte Browser. Wenn du es für Safari installieren möchtest, findest du auf [dieser Seite](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md) die entsprechende Anleitung.
:::

### Voraussetzungen

-   Git.
-   Node.js Version 20 oder höher.

### Code herunterladen

```sh
git clone https://github.com/sheepzh/timer.git
```

### Abhängigkeiten installieren

```sh
npm install
```

### Kompilierung & Ausgabe

```sh
npm run build
```

Nach der Kompilierung wird eine Datei namens `target.zip` im Ordner `[PROJECT_ROOT]/market_packages/` ausgegeben. Dann kannst du sie entpacken und in deinen Browser laden.

Für Firefox und andere Browser, die [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3) nicht unterstützen, musst du diesen Befehl für die Kompilierung verwenden.

```sh
npm run build:firefox
```

Auch hier wird eine Datei namens `target.firefox.zip` ausgegeben.
