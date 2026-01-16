---
title: Установка
---

# {{$frontmatter.title}}

## Из веб-магазина

Расширение официально опубликовано в веб-магазинах Chrome, Edge и Firefox. Вы можете установить его напрямую по следующим ссылкам.

<InstallGrid />

## Из исходного кода

Вы также можете загрузить исходный код для ручной установки.

::: tip
Этот раздел применяется только к браузерам на основе Chromium. Если вы хотите установить его для Safari, прочитайте [эту страницу](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Требования

-   Git.
-   Node.js версии 20 или выше.

### Загрузка кода

```sh
git clone https://github.com/sheepzh/timer.git
```

### Установка зависимостей

```sh
npm install
```

### Компиляция и вывод

```sh
npm run build
```

После компиляции файл с именем `target.zip` будет выведен в папку `[PROJECT_ROOT]/market_packages/`. Затем вы можете распаковать его и загрузить в браузер.

Для Firefox и других браузеров, не поддерживающих [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), вам нужно использовать эту команду для компиляции.

```sh
npm run build:firefox
```

Также будет выведен файл с именем `target.firefox.zip`.
