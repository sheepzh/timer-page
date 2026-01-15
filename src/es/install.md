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

### Compilación

```sh
cd timer
npm install
npm run build:prod
```

### Instalación

1. Abre la página de extensiones en tu navegador.
2. Activa el modo de desarrollador.
3. Haz clic en el botón "Cargar extensión sin empaquetar".
4. Selecciona la carpeta `dist/` del código compilado.
