---
title: Datensynchronisierung
description: "Zeitdaten als JSON oder CSV exportieren und mit GitHub Gist, WebDAV oder Obsidian sichern. Geräteübergreifende Synchronisierung auf Abruf oder nach Zeitplan."
---

# {{$frontmatter.title}}

Diese Erweiterung speichert deine Daten nur lokal mit der vom Browser bereitgestellten `chrome.storage.local`-API und sendet deine Daten niemals irgendwohin.

Sie unterstützt jedoch Tools, die dir beim Übertragen deiner Daten helfen.

## Exportieren und Importieren

Du kannst die Daten im Dashboard in eine `.json`-Datei exportieren und sie dann in anderen Browsern importieren. Es ist zu beachten, dass diese Operation besser geeignet ist, wenn du gerade erst beginnst, ein neues Gerät oder einen neuen Browser zu verwenden.

Du kannst auch Daten importieren, die aus anderen ähnlichen Erweiterungen exportiert wurden, und entscheiden, ob du lokale Daten überschreiben oder anhängen möchtest.

| Andere Erweiterung        | Dateiformat         | Bemerkung                                |
| ------------------------- | ------------------- | ---------------------------------------- |
| Webtime Tracker           | `.csv` oder `.json` |                                          |
| Web Activity Time Tracker | `.csv`              |                                          |
| History Trends Unlimited  | `.tsc`              | Enthält nur Daten für die Besuchszählung |

## Daten über Clients synchronisieren

Diese Erweiterung unterstützt keine Dienste, die Daten remote speichern.

Stattdessen bietet sie Tools, die Ihnen helfen, Daten in Dienste von Drittanbietern zu synchronisieren, denen Sie vertrauen.

| Drittanbieter-Dienst | Voraussetzungen                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Github Gist          | Github-Zugriffstoken mit Gist-Berechtigungen                                                                                      |
| Obsidian             | Obsidian-Client mit installiertem Plugin [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) |

Wenn das Token korrekt eingestellt ist, kannst du die Daten anderer Clients auf der Aufzeichnungsseite abfragen.
