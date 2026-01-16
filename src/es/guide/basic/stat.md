---
title: Seguimiento
---

# {{$frontmatter.title}}

## Dimensiones de las estadísticas

El tiempo y el recuento de visitas se agruparán y agregarán por dominio único y fecha. Esto significa que la fecha y el dominio constituyen la granularidad estadística más pequeña.

Y esta herramienta te permite fusionar registros básicos según tus propias necesidades.

## Resumir datos de sitios relacionados

Como se mencionó anteriormente, estos datos se agregan por dominio. Por ejemplo, `www.github.com` y `gist.github.com` se cuentan como 2 registros. Si deseas ver datos agregados de los dos sitios, deberás fusionarlos manualmente.

La mayoría de las páginas de visualización de datos admiten consultas de fusión. Y puedes personalizar las reglas de fusión en la página de backend.

### ¿Cómo se ven las reglas?

La regla consta de dos partes, la parte de origen y la parte de destino. La parte de origen declara qué sitios coinciden con la regla, y la parte de destino define cómo se fusionan esos sitios. Por ejemplo, `gist.github.com >>> github.com` es una regla común, la izquierda `gist.github.com` es la parte de origen, y la derecha `github.com` es la parte de destino.

### ¿Cómo definir la parte de origen?

La parte de origen puede ser un nombre de dominio específico o una expresión Ant. A continuación se muestran algunos ejemplos.

| Parte de origen  | Ejemplos de sitios coincidentes                                   |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | Solo `www.google.com` puede coincidir con esta regla              |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### ¿Cómo definir la parte de destino?

La parte de destino puede ser un nombre de dominio específico, un número entero positivo o dejarse en blanco. Se presentarán uno por uno junto con la parte de origen en la tabla a continuación.

| Parte de origen          | Parte de destino | Aspecto                           | Observación                                                                                      |
| ------------------------ | ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| www.google.com.*         | google.com       | `www.google.com.* >>> google.com` | Los sitios que coincidan con `www.google.com.*` se fusionarán en el `google.com` específico      |
| www.google.com.hk        |                  | `www.google.com.hk >>> Not Merge` | `www.google.com.hk` no se fusionará debido a la parte de destino en blanco                       |
| \*\*\.\*\.google.com      | 3                | `**.*.google.com >>> Keep Level 3` | Los sitios que coincidan con `**.*.google.com` se fusionarán en los últimos 3 niveles de dominio |

La siguiente tabla muestra algunos ejemplos de fusión después de establecer las reglas anteriores juntas.

| Sitio original           | Reglas que coinciden                                                               | Sitio fusionado y observación    |
| ------------------------ | ----------------------------------------------------------------------------------- | -------------------------------- |
| www.google.com.au        | `www.google.com.* >>> google.com`                                                 | google.com                        |
| www.google.com.pt        | `www.google.com.* >>> google.com`                                                 | google.com                        |
| www.google.com.hk        | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge`           | www.google.com.hk **(1)**        |
| es.news.google.com       | `**.*.google.com >>> Keep Level 3`                                                 | news.google.com                   |
| b.c.photos.google.com    | `**.*.google.com >>> Keep Level 3`                                                 | photos.google.com                 |
| pass.hust.edu.cn         |                                                                                    | hust.edu.cn **(2)**               |

::: tip

(1) Cuando múltiples reglas coinciden, la parte de origen con un nombre de dominio específico tiene prioridad

(2) Cuando no hay reglas que coincidan, se fusiona al nivel anterior de la [Public Suffix List](https://publicsuffix.org/)

:::
