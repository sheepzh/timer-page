---
title: Suivi
---

# {{$frontmatter.title}}

## Dimensions des statistiques

Le temps et le nombre de visites seront regroupés et agrégés par domaine unique et date. Cela signifie que la date et le domaine constituent la plus petite granularité statistique.

Et cet outil vous permet de fusionner les enregistrements de base en fonction de vos propres besoins.

## Résumer les données des sites connexes

Comme ci-dessus, ces données sont agrégées par domaine. Par exemple, `www.github.com` et `gist.github.com` sont comptés comme 2 enregistrements. Si vous souhaitez voir les données agrégées des deux sites, vous devrez les fusionner manuellement.

La plupart des pages d'affichage des données prennent en charge les requêtes de fusion. Et vous pouvez personnaliser les règles de fusion sur la page backend.

### À quoi ressemblent les règles ?

La règle se compose de deux parties, la partie source et la partie cible. La partie source déclare quels sites correspondent à la règle, et la partie cible définit comment ces sites sont fusionnés. Par exemple, `gist.github.com >>> github.com` est une règle courante, la gauche `gist.github.com` est la partie source, et la droite `github.com` est la partie cible.

### Comment définir la partie source ?

La partie source peut être un nom de domaine spécifique ou une expression Ant. Voici quelques exemples.

| Partie source    | Exemples de sites correspondants                                  |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | Seul `www.google.com` peut correspondre à cette règle             |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### Comment définir la partie cible ?

La partie cible peut être un nom de domaine spécifique, un entier positif ou être laissée vide. Ils seront présentés un par un en conjonction avec la partie source dans le tableau ci-dessous.

| Partie source            | Partie cible | Apparence                         | Remarque                                                                                         |
| ------------------------ | ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| www.google.com.*         | google.com   | `www.google.com.* >>> google.com` | Les sites correspondant à `www.google.com.*` seront fusionnés dans le `google.com` spécifique    |
| www.google.com.hk        |              | `www.google.com.hk >>> Not Merge` | `www.google.com.hk` ne sera pas fusionné en raison de la partie cible vide                       |
| \*\*\.\*\.google.com     | 3            | `**.*.google.com >>> Keep Level 3` | Les sites correspondant à `**.*.google.com` seront fusionnés dans les 3 derniers niveaux de domaine |

Le tableau suivant présente quelques exemples de fusion après avoir défini les règles ci-dessus ensemble.

| Site original            | Règles correspondantes                                                               | Site fusionné et remarque    |
| ------------------------ | ----------------------------------------------------------------------------------- | ---------------------------- |
| www.google.com.au        | `www.google.com.* >>> google.com`                                                 | google.com                    |
| www.google.com.pt        | `www.google.com.* >>> google.com`                                                 | google.com                    |
| www.google.com.hk        | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge`           | www.google.com.hk **(1)**    |
| es.news.google.com       | `**.*.google.com >>> Keep Level 3`                                                 | news.google.com              |
| b.c.photos.google.com    | `**.*.google.com >>> Keep Level 3`                                                 | photos.google.com            |
| pass.hust.edu.cn         |                                                                                    | hust.edu.cn **(2)**           |

::: tip

(1) Lorsque plusieurs règles correspondent, la partie source avec un nom de domaine spécifique a la priorité

(2) Lorsqu'aucune règle ne correspond, fusion au niveau précédent de la [Public Suffix List](https://publicsuffix.org/)

:::
