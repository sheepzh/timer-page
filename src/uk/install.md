---
title: Встановлення
description: "Як встановити розширення для відстеження часу в Chrome, Edge та Firefox з офіційних магазинів, плюс примітки щодо ручного завантаження для інших браузерів на Chromium."
---

# {{$frontmatter.title}}

## З веб-магазину

Розширення офіційно опубліковано у веб-магазинах Chrome, Edge та Firefox. Ви можете встановити його безпосередньо за цими посиланнями.

<InstallGrid />

## З вихідного коду

Ви також можете завантажити вихідний код і встановити розширення вручну.

::: tip
Цей розділ стосується лише браузерів на основі Chromium. Щоб встановити розширення для Safari, прочитайте [цю сторінку](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Передумови

-   Git.
-   Node.js версії 20 або новішої.

### Завантаження коду

```sh
git clone https://github.com/sheepzh/timer.git
```

### Встановлення залежностей

```sh
npm install
```

### Збірка та результати

```sh
npm run build
```

Після компіляції у папці `[PROJECT_ROOT]/market_packages/` з'явиться файл `target.zip`. Розпакуйте його та завантажте у свій браузер.

Для Firefox та інших браузерів, що не підтримують [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), використовуйте цю команду для компіляції.

```sh
npm run build:firefox
```

Також буде створено файл `target.firefox.zip`.
