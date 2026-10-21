---
title: Zeitlimits für Websites festlegen
description: "Tägliche und wöchentliche Zeitlimits für Websites festlegen. Blockierende Ebene mit optionaler Passwort- oder Zwei-Faktor-Verifizierung."
---

# {{$frontmatter.title}}

Sobald der Analysebericht dir zeigt, wie viel Zeit du auf Websites verlierst, auf denen du am meisten hängen bleibst, möchtest du diese Zeit vielleicht kontrollieren.

Diese Erweiterung ermöglicht es dir, dein Verhalten auf jeder Website zu begrenzen.

## Begrenzungsregeln erstellen

Zunächst musst du Regeln im Dashboard erstellen.

Jede Regel enthält mehrere Teile, wie in der folgenden Tabelle gezeigt.

| Teil                     | Beschreibung                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Eingeschränkte URL       | Die URL, die eingeschränkt werden muss. Ausdrücke werden unterstützt. Wie `https://www.github.com`, `*://www.google.com/**` |
| Tägliches Limit          | Maximale Zeit pro Tag, Null bedeutet keine Begrenzung.                                                                      |
| Limit pro Besuch         | Maximale Zeit pro Besuch, Null bedeutet keine Begrenzung.                                                                   |
| Nicht erlaubte Zeiträume | Die Zeiträume, während derer der Zugriff auf die Ziel-URL immer eingeschränkt ist.                                          |

## Wenn eine Regel auslöst

Sobald die Einschränkungen einer Regel erreicht sind, werden die Seiten, die du besuchst, von einer blockierenden Ebene überdeckt, die weiteres Browsen verhindert.

Um fortzufahren, musst du zur Regelseite gehen und diese Regel deaktivieren oder ändern. Wenn die Entsperroperation in der Option festgelegt ist, ist auch eine Überprüfung oder ein Passwort erforderlich.

::: warning
Absichtlich schwierige CAPTCHAs können das Entsperren deutlich erschweren und viel Zeit kosten. Konfiguriere diese Option mit Vorsicht.
:::
