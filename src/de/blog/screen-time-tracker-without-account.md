---
title: "Bildschirmzeit ohne Konto messen: lokale Tracker für Chrome, Edge und Firefox"
description: Bildschirmzeit und Browsenstunden tracken, ohne ein Konto anzulegen. Kostenlose Open-Source-Zeit-Tracker mit rein lokaler Speicherung für Chrome, Edge und Firefox.
---

# Bildschirmzeit ohne Konto messen: lokale Tracker für Chrome, Edge und Firefox

Dein Browserverlauf ist ein Tagebuch, das du nie veröffentlichen wolltest: Gesundheitsfragen, Jobsuche, persönliche Nachrichten, finanzielle Sorgen. Wer seine Bildschirmzeit messen will, will vernünftigerweise auch, dass diese Messung privat bleibt.

Ein guter Zeit-Tracker braucht kein Konto, keinen Cloud-Dienst und keine einzige Verbindung zu einem Server. Dieser Artikel erklärt, was „rein lokal" in der Praxis bedeutet, was du prüfen solltest, bevor du den Versprechen eines Tools vertraust, und wie du alles einrichtest.

## Was ein Konto tatsächlich kostet

Viele Tracking-Tools verlangen eine Anmeldung, weil ihr Produkt das Dashboard in der Cloud ist. Dieses Design hat echte Kosten:

- Dein Verlauf liegt auf einem fremden Server, nach fremden Aufbewahrungsregeln
- Das Konto verknüpft die Daten mit deiner Identität; wird der Server kompromittiert, ist deine Aufmerksamkeits-Chronologie offengelegt
- Stellt der Dienst ein oder ändert seine Datenschutzerklärung, ist dein Verlauf mittendrin

Ein rein lokaler Tracker dreht alles um: Daten werden auf dem Speicher deines eigenen Geräts geschrieben, nichts wird übertragen, und auf einem Server gibt es nichts zu kompromittieren — weil es keinen Server gibt.

## Die vier Punkte einer Datenschutz-Prüfung

Bevor du irgendetwas installierst, prüfe:

1. **Kein Konto nötig**: Die Erweiterung muss ab der ersten Minute vollständig funktionieren, ohne Registrierung
2. **Lokale Speicherung, präzise benannt**: Suche nach einem konkreten Mechanismus (z. B. der Local-Storage-API deines Browsers), nicht nur nach dem Wort „privat"
3. **Open Source**: Eine MIT- oder ähnliche Lizenz bedeutet, dass sich das Speicherverhalten im Code überprüfen lässt, nicht nur in der Beschreibung versprechen
4. **Export in deiner Hand**: Dein Verlauf sollte in einem offenen Format (JSON/CSV) verlassen können, das dir gehört, nicht als proprietäres Backup

## Ein lokales Setup für Chrome, Edge und Firefox

<a href="/de/install" target="_blank" rel="noopener">Time Tracker - Web Habit Builder</a> besteht alle vier Prüfungen:

- **Null Konten**: Installieren, Tracking startet; einen Anmeldefluss gibt es gar nicht
- **Rein lokale Speicherung**: Alle Daten liegen im lokalen Speicher deines Browsers (`chrome.storage.local` und Entsprechungen) und werden nie versendet
- **Vollständig quelloffen**: MIT-lizenziert, das Speicherverhalten lässt sich im Repository verifizieren statt auf Glauben zu nehmen
- **Deine Daten, dein Format**: [Alles jederzeit als JSON oder CSV exportieren](/de/guide/data)

Über den Export hinaus unterstützt die Erweiterung Sync über Dienste, die du selbst kontrollierst (ein eigener WebDAV-Server oder ein privates GitHub Gist). Multi-Device-Backup braucht so keine dritte Partei (siehe [Datensynchronisation](/de/guide/data)).

## Tracking-Qualität ohne Cloud

Dieselbe Erweiterung liefert sekundengenaues Tracking auf Basis des aktiven Tabs, tägliche und historische Berichte pro Website, Wochenverläufe und Tageszeit-Diagramme (siehe [Surfgewohnheiten analysieren](/de/guide/basic/analysis)). Sie kann außerdem [Zeitlimits für jede Website durchsetzen](/de/blog/limit-time-on-youtube-websites) — vollständig offline.

## Tracking über den Browser hinaus

Wenn du über den Browser hinaus tracken willst (Desktop-Apps, systemweit), ist [ActivityWatch](https://activitywatch.net/) eine angesehene Open-Source-Anwendung mit lokalem First-Ansatz. Für browserbezogene Gewohnheiten vermeidet eine reine Erweiterung eine Hintergrund-App und erfasst dieselben Daten mit weniger Einrichtung. In beiden Fällen erfordert die Messung keinen Verzicht auf lokale Kontrolle.

Wenn die Prüfliste oben dem entspricht, was du suchst, findest du auf der <a href="/de/install" target="_blank" rel="noopener">Installationsseite</a> die Store-Links für Chrome, Edge und Firefox.

## Weiterlesen

- [Hat Chrome einen integrierten Zeit-Tracker?](/de/blog/does-chrome-have-built-in-time-tracker)
- [Zeit auf Websites messen in Chrome, Edge und Firefox](/de/blog/how-to-track-time-spent-on-websites)
