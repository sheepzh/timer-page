---
title: Datenübertragung
---

# {{$frontmatter.title}}

Diese Erweiterung speichert Ihre Daten nur lokal mit der vom Browser bereitgestellten `chrome.storage.local`-API und sendet Ihre Daten niemals irgendwohin.

Sie unterstützt jedoch Tools, die Ihnen beim Übertragen Ihrer Daten helfen.

## Exportieren und Importieren

Sie können die Daten auf der Backend-Seite in eine `.json`-Datei exportieren und sie dann in anderen Browsern importieren. Es ist zu beachten, dass diese Operation besser geeignet ist, wenn Sie gerade erst beginnen, ein neues Gerät oder einen neuen Browser zu verwenden.

Sie können auch Daten importieren, die aus anderen ähnlichen Erweiterungen exportiert wurden, und entscheiden, ob Sie lokale Daten überschreiben oder anhängen möchten.

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

Wenn das Token korrekt eingestellt ist, können Sie die Daten anderer Clients auf der Aufzeichnungsseite abfragen.
