---
title: Zeit auf YouTube und anderen Websites begrenzen
description: Tageslimit für YouTube, Reddit, soziale Medien oder jede beliebige Website in Chrome, Edge und Firefox festlegen. Kostenloser Open-Source-Zeitbegrenzer mit Limits pro Besuch und gesperrten Zeitfenstern.
---

# Zeit auf YouTube und anderen Websites begrenzen

„Ich schaue nur ein Video" — und der Abend ist weg: Die Autoplay-Schleife liefert das nächste Video, und Willenskraft um 23 Uhr verliert meistens. Eine Regel, die dein Browser durchsetzt, hält besser durch.

Diese Anleitung zeigt, wie du mit einer kostenlosen Open-Source-Erweiterung für Chrome, Edge und Firefox ein echtes, automatisches Zeitlimit für YouTube (oder jede beliebige Website) einrichtest.

## Warum keine „YouTube-Limiter"-Erweiterung?

Im Store gibt es Spezialisten für einzelne Seiten: einen für YouTube, einen für TikTok, einen für Instagram. Die Probleme summieren sich:

- **Eine Erweiterung pro Seite** heißt: fünf Seiten, fünf Tools, fünf Sätze an Berechtigungen
- Die meisten kennen nur ihre eine Zielseite; eine Nachrichten- oder Reddit-Gewohnheit bleibt außen vor
- Jede zusätzliche Erweiterung kostet Speicher und ist eine Partei mehr, der dein Browser vertrauen muss

Eine allgemeine Regel-Engine erledigt alles mit einem Tool: dieselbe Erweiterung, die deine [Zeit misst](/de/blog/how-to-track-time-spent-on-websites), setzt auch Limits für jedes URL-Muster durch.

## So funktionieren die Limit-Regeln

In <a href="/de/install" target="_blank" rel="noopener">Time Tracker - Web Habit Builder</a> kombiniert jede Regel eine Ziel-URL mit einer oder mehreren Bedingungen (vollständige Anleitung: [Kontrolle](/de/guide/basic/limit)):

| Bedingung | Wirkung |
| --- | --- |
| **Tageslimit** | Maximale Zeit pro Tag auf der Website; ist das Budget aufgebraucht, verdeckt eine Sperre die Seite bis zum nächsten Tag |
| **Limit pro Besuch** | Deckelt jeden einzelnen Besuch, damit „kurz nachsehen" nicht zur Stunde wird |
| **Nicht erlaubte Zeiträume** | Sperrt die Seite in definierten Fenstern, z. B. 9:00–12:00 an Arbeitstagen |
| **Wochenlimit** | Maximale Zeit pro Woche, wenn ein Tageslimit nicht passt |
| **Fokus-Sitzungen** | Während einer Focus- oder Pomodoro-Sitzung bleiben eingeschränkte Seiten blockiert |

URLs unterstützen Muster, sodass eine Regel eine ganze Domain oder einzelne Bereiche abdecken kann.

## YouTube-Limit Schritt für Schritt

1. Erweiterung aus dem Store installieren, kostenlos und ohne Konto
2. Dashboard öffnen und zum Kontrolle-Bereich wechseln
3. Regel mit `https://www.youtube.com` als eingeschränkter URL anlegen
4. Tageslimit festlegen, zum Beispiel 30 Minuten
5. Optional: Limit von 10 Minuten pro Besuch und „nicht erlaubte" Stunden für deine Tiefenarbeitszeit

Ab jetzt wird die Seite verdeckt, sobald das Tagesbudget verbraucht ist, und bleibt gesperrt bis zum nächsten Tag, außer du änderst die Regel bewusst. Die optionale Entsperr-Verifizierung (Frage, Passwort oder sogar Zwei-Faktor) macht das Umgehen der Regel zu einer bewussten Entscheidung statt einem Klick.

## Dieselbe Regel funktioniert überall

Weil die Regel-Engine URL-Muster statt einer festen Siteliste verwendet, begrenzt derselbe Ansatz soziale Medien, Nachrichten, Shopping- oder Gaming-Seiten. Das läuft auf Chrome, Edge und Firefox, sodass deine Regeln jeden Browser abdecken, den du nutzt.

Ein praktischer Einstieg:

- **Soziale Feeds**: 20 Minuten/Tag, plus gesperrte Stunden während der Arbeit
- **Nachrichten**: nur Limit pro Besuch, damit schnelle Checks schnell bleiben
- **Streaming**: Tageslimit für den Abend, in dem du es wirklich willst

Alle Daten, Regeln wie Nutzungshistorie, bleiben lokal im Browser und lassen sich jederzeit exportieren ([Datenübertragung](/de/guide/data)).

Fang mit einer Regel für die Website an, die dir die meiste Zeit kostet; der Rest kann warten. Die <a href="/de/install" target="_blank" rel="noopener">Installationsseite</a> hat die Store-Links.

## Weiterlesen

- [Zeit auf Websites messen in Chrome, Edge und Firefox](/de/blog/how-to-track-time-spent-on-websites)
