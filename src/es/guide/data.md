---
title: Transmisión de datos
---

# {{$frontmatter.title}}

Esta extensión solo almacena tus datos localmente con la API `chrome.storage.local` proporcionada por el navegador, y nunca envía tus datos a ninguna parte.

Pero admite herramientas para ayudarte a transmitir tus datos.

## Exportar e importar

Puedes exportar los datos a un archivo `.json` en la página de backend y luego importarlo en otros navegadores. Cabe señalar que esta operación es más adecuada si acabas de empezar a usar un nuevo dispositivo o navegador nuevo.

También puedes importar datos exportados desde otras extensiones similares y decidir si reemplazar o agregar a los datos locales.

| Otra extensión            | Formato de archivo | Observación                                     |
| ------------------------- | ------------------ | ----------------------------------------------- |
| Webtime Tracker           | `.csv` o `.json`   |                                                 |
| Web Activity Time Tracker | `.csv`             |                                                 |
| History Trends Unlimited  | `.tsc`             | Solo contiene datos para el recuento de visitas |

## Sincronizar datos entre clientes

Esta extensión no admite servicios que almacenan datos de forma remota.

En su lugar, proporciona herramientas para ayudarte a sincronizar datos en servicios de terceros en los que confíes.

| Servicio de terceros | Requisitos previos                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Github Gist          | Token de acceso de Github que otorga permisos de Gist                                                                                  |
| Obsidian             | Cliente Obsidian con el complemento [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) instalado |

Si el token está configurado correctamente, puedes consultar los datos de otros clientes en la página de registro.
