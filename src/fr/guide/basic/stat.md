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

| Partie source     | Partie cible | Apparence                         | Remarque                                                                                         |
| ----------------- | ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| www.google.com.*  | google.com   | `www.google.com.* >>> google.com` | Les sites correspondant à `www.google.com.*` seront fusionnés dans le `google.com` spécifique    |
| www.google.com.hk |              | `www.google.com.hk >>> Not Merge` | `www.google.com.hk` ne sera pas fusionné en raison de la partie cible vide                       |
| \*\*.github.com   | 2            | `**.github.com >>> Merged(2)`     | Les sites correspondant à `**.github.com` seront fusionnés par les 2 premiers niveaux de domaine |

::: tip
Les exemples ci-dessus sont suffisants pour répondre à vos besoins dans la plupart des cas. Pour plus de détails, veuillez consulter [la documentation complète](https://github.com/sheepzh/timer#merger-rule).
:::
