---
title: Hat Chrome einen integrierten Zeit-Tracker?
description: Chrome hat keinen integrierten Bildschirmzeit-Tracker für die Zeit pro Website. Dieser Artikel erklärt, was Chrome und das Betriebssystem bieten, und wie du mit einer Open-Source-Erweiterung automatisches, lokales Zeit-Tracking hinzufügst.
---

# Hat Chrome einen integrierten Zeit-Tracker? Was man stattdessen nutzen kann

Kurze Antwort: **nein**. Chrome zeigt dir, welche Seiten du besucht hast, aber nicht, *wie lange* du auf jeder Website warst. Für einen Bildschirmzeit-Bericht innerhalb von Chrome brauchst du eine kleine Erweiterung.

Hier die vollständige Einordnung, inklusive der Frage, warum die „Bildschirmzeit"-Funktionen deines Systems den Browser nicht abdecken.

## Was Chrome tatsächlich bietet

**Verlauf**: speichert, dass ein Besuch stattfand und wann, aber nicht die Dauer. Du siehst den Öffnungszeitpunkt, nicht die Verweilzeit.

**Google Meine Aktivitäten**: zeichnet das Surfen über dein Google-Konto auf und liegt in der Cloud, also das Gegenteil dessen, was die meisten von einem Bildschirmzeit-Tool erwarten. Ein sauberer Dauerbericht pro Website entsteht auch dort nicht.

**Statistiken in den Einstellungen**: Chrome meldet Speicher- und Akkunutzung pro Tab; das betrifft Ressourcen, nicht deine Aufmerksamkeit.

Auf die Frage, die Menschen tatsächlich stellen — „Wie viel Zeit verbringe ich täglich auf YouTube, Reddit oder Nachrichtenseiten?" — hat Chrome selbst keine Antwort.

## Warum die Bildschirmzeit deines Betriebssystems nicht hilft

Die Bildschirmzeit von macOS und die entsprechenden Windows-Funktionen gliedern die Zeit hauptsächlich **nach Anwendung**. Der Browser zählt als eine Anwendung: „Chrome: 5 Stunden" sagt nichts darüber, welche Websites diese Stunden verbraucht haben. Detaillierte Angaben pro Website liefern die Plattformen typischerweise nur für ihre eigenen Browser, etwa Safari unter macOS. Drittanbieter-Browser wie Chrome, Edge, Brave und Firefox bleiben auf Website-Ebene unsichtbar.

Genau diese Lücke füllt eine dedizierte Erweiterung: Sie lebt *im* Browser und sieht die Aktivität auf Website-Ebene direkt.

## Open-Source-Tracker nachrüsten

<a href="/de/install" target="_blank" rel="noopener">Time Tracker - Web Habit Builder</a> ergänzt das, was Chrome fehlt:

- **Automatische Zeiterfassung pro Website** über den aktiven Tab: keine Timer, die man startet und vergisst
- **Tages- und Verlaufsberichte** pro Website, mit Trends und Tageszeit-Verteilung (siehe [Analyse-Anleitung](/de/guide/basic/analysis))
- **Ausschließlich lokale Speicherung** über den eigenen Speicher des Browsers: kein Konto, keine Cloud, kein Upload
- **Für Chrome, Edge und Firefox**, kostenlos und quelloffen unter der MIT-Lizenz

Nach der Installation läuft für jede fokussierte Website die Uhr, sekundengenau. Aus den Zahlen lassen sich direkt [Zeitlimits ableiten](/de/guide/basic/limit), im selben Tool.

## Häufige Nachfragen

**Verlangsamt das den Browser?** Nein. Die Erweiterung ist leichtgewichtig (rund 1 MB) und merkt sich nur den fokussierten Tab; Seiteninhalte werden nicht geprüft.

**Wo liegen die Daten?** Ausschließlich im lokalen Speicher deines Browsers auf deinem Gerät. Das ist im quelloffenen Code überprüfbar, und du kannst die Daten jederzeit [selbst exportieren oder synchronisieren](/de/guide/data).

**Funktioniert das in privaten Fenstern?** Browser führen Erweiterungen nicht in privaten Fenstern aus, außer du erlaubst es ausdrücklich; die Aufzeichnung folgt damit den Datenschutzregeln deines Browsers.

Wenn du die Dauer pro Website brauchst: Auf der <a href="/de/install" target="_blank" rel="noopener">Installationsseite</a> stehen die Store-Links für alle drei Browser.

## Weiterlesen

- [Zeit auf Websites messen in Chrome, Edge und Firefox](/de/blog/how-to-track-time-spent-on-websites)
