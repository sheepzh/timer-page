---
title: Control
---

# {{$frontmatter.title}}

Una vez que te das cuenta de cuánto tiempo pasas en sitios web inútiles a través del informe de análisis anterior. Quizás necesites controlar el tiempo.

Esta extensión te permite limitar tu comportamiento en cualquier sitio web.

## Crear reglas de límite

En primer lugar, debes crear reglas en la página de backend.

Cada regla contiene varias partes, como se muestra en la siguiente tabla.

| Parte                  | Descripción                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| URL restringida        | La URL que debe ser restringida. Se admiten expresiones. Como `https://www.github.com`, `*://www.google.com/**` |
| Límite diario          | Tiempo máximo por día, cero significa sin límite.                                                               |
| Límite por visita      | Tiempo máximo por visita, cero significa sin límite.                                                            |
| Períodos no permitidos | Los períodos de tiempo durante los cuales el acceso a la URL de destino siempre está restringido.               |

## Restringido

Si cumples con las restricciones de cualquier regla, las páginas que estás visitando se cubrirán con una máscara que te impide navegar.

Para continuar, debes ir a la página de reglas y deshabilitar o modificar esta regla. Si la operación de desbloqueo está configurada en la opción, también se requiere verificación o contraseña.

::: warning
¡El código de verificación desagradable es realmente difícil y desagradable, puede llevarte demasiado tiempo desbloquearlo!
:::
