---
title: Transmission de données
---

# {{$frontmatter.title}}

Cette extension ne stocke vos données qu'en local avec l'API `chrome.storage.local` fournie par le navigateur, et n'envoie jamais vos données nulle part.

Mais elle prend en charge les outils pour vous aider à transmettre vos données.

## Exporter et importer

Vous pouvez exporter les données vers un fichier `.json` sur la page backend puis les importer dans d'autres navigateurs. Il convient de noter que cette opération est plus appropriée si vous commencez tout juste à utiliser un nouveau périphérique ou un nouveau navigateur.

Vous pouvez également importer des données exportées depuis d'autres extensions similaires et décider de remplacer ou d'ajouter aux données locales.

| Autre extension           | Format de fichier | Remarque                                                |
| ------------------------- | ----------------- | ------------------------------------------------------- |
| Webtime Tracker           | `.csv` ou `.json` |                                                         |
| Web Activity Time Tracker | `.csv`            |                                                         |
| History Trends Unlimited  | `.tsc`            | Contient uniquement les données de comptage des visites |

## Synchroniser les données entre clients

Cette extension ne prend pas en charge les services qui stockent les données à distance.

Au lieu de cela, elle fournit des outils pour vous aider à synchroniser les données dans des services tiers en qui vous avez confiance.

| Service tiers | Prérequis                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Github Gist   | Jeton d'accès Github accordant des autorisations Gist                                                                            |
| Obsidian      | Client Obsidian avec le plugin [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) installé |

Si le jeton est correctement défini, vous pouvez interroger les données d'autres clients sur la page d'enregistrement.
