---
title: Instalación
---

# {{$frontmatter.title}}

## Desde la tienda web

La extensión se publica oficialmente en las tiendas web de Chrome, Edge y Firefox. Puedes instalarla directamente desde estos enlaces a continuación.

<InstallGrid />

## Desde el código fuente

También puedes descargar el código fuente para instalarlo manualmente.

::: tip
Esta sección solo se aplica a navegadores basados en Chromium. Si deseas instalarlo para Safari, lee [esta página](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Requisitos previos

-   Git.
-   Node.js versión 20 o superior.

### Descarga del código

```sh
git clone https://github.com/sheepzh/timer.git
```

### Instalación de dependencias

```sh
npm install
```

### Compilación y salida

```sh
npm run build
```

Después de la compilación, se generará un archivo llamado `target.zip` en la carpeta `[PROJECT_ROOT]/market_packages/`. Luego puedes descomprimirlo y cargarlo en tu navegador.

Para Firefox y otros navegadores que no admiten [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), necesitas usar este comando para la compilación.

```sh
npm run build:firefox
```

También se generará un archivo llamado `target.firefox.zip`.
