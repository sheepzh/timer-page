---
title: Installation
---

# {{$frontmatter.title}}

## Aus dem Web Store

Die Erweiterung wird offiziell in den Web Stores von Chrome, Edge und Firefox veröffentlicht. Sie können sie direkt über die folgenden Links installieren.

<InstallGrid />

## Aus dem Quellcode

Sie können auch den Quellcode herunterladen, um ihn manuell zu installieren.

::: tip
Dieser Abschnitt gilt nur für Chromium-basierte Browser. Wenn Sie es für Safari installieren möchten, lesen Sie bitte [diese Seite](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Voraussetzungen

-   Git.
-   Node.js Version 20 oder höher.

### Code herunterladen

```sh
git clone https://github.com/sheepzh/timer.git
```

### Kompilierung

```sh
cd timer
npm install
npm run build:prod
```

### Installation

1. Öffnen Sie die Erweiterungsseite in Ihrem Browser.
2. Aktivieren Sie den Entwicklermodus.
3. Klicken Sie auf die Schaltfläche "Entpackte Erweiterung laden".
4. Wählen Sie den Ordner `dist/` des kompilierten Codes aus.
