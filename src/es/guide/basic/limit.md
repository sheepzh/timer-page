---
title: Limitar tiempo en sitios
description: "Establece límites de tiempo diarios y semanales en cualquier sitio. La capa de bloqueo cubre la página, con verificación opcional por contraseña o dos factores."
---

# {{$frontmatter.title}}

Una vez que el informe de análisis te muestra cuánto tiempo pasas en los sitios que más te distraen, quizás quieras controlar ese tiempo.

Esta extensión te permite limitar tu comportamiento en cualquier sitio web.

## Crear reglas de límite

En primer lugar, debes crear reglas en el panel.

Cada regla contiene varias partes, como se muestra en la siguiente tabla.

| Parte                  | Descripción                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| URL restringida        | La URL que debe ser restringida. Se admiten expresiones. Como `https://www.github.com`, `*://www.google.com/**` |
| Límite diario          | Tiempo máximo por día, cero significa sin límite.                                                               |
| Límite por visita      | Tiempo máximo por visita, cero significa sin límite.                                                            |
| Períodos no permitidos | Los períodos de tiempo durante los cuales el acceso a la URL de destino siempre está restringido.               |

## Cuando se activa una regla

Cuando se alcanza alguna restricción de las reglas, las páginas que estás visitando se cubren con una capa de bloqueo que impide seguir navegando.

Para continuar, debes ir a la página de reglas y deshabilitar o modificar esta regla. Si la operación de desbloqueo está configurada en la opción, también se requiere verificación o contraseña.

::: warning
Los CAPTCHA de alta dificultad son deliberadamente molestos, y desbloquearlos puede llevarte bastante tiempo. Configúralo con precaución.
:::
