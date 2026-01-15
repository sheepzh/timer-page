---
title: Contrôle
---

# {{$frontmatter.title}}

Une fois que vous réalisez combien de temps vous passez sur des sites Web inutiles grâce au rapport d'analyse ci-dessus. Peut-être avez-vous besoin de contrôler le temps.

Cette extension vous permet de limiter votre comportement sur n'importe quel site Web.

## Créer des règles de limite

Tout d'abord, vous devez créer des règles sur la page backend.

Chaque règle contient plusieurs parties, comme indiqué dans le tableau suivant.

| Partie                  | Description                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| URL restreinte          | L'URL qui doit être restreinte. Les expressions sont prises en charge. Comme `https://www.github.com`, `*://www.google.com/**` |
| Limite quotidienne      | Temps maximum par jour, zéro signifie aucune limite.                                                                           |
| Limite par visite       | Temps maximum par visite, zéro signifie aucune limite.                                                                         |
| Périodes non autorisées | Les périodes pendant lesquelles l'accès à l'URL cible est toujours restreint.                                                  |

## Restreint

Si vous répondez aux restrictions de n'importe quelle règle, les pages que vous visitez seront couvertes d'un masque qui vous empêche de naviguer.

Pour continuer, vous devez vous rendre sur la page des règles et désactiver ou modifier cette règle. Si l'opération de déverrouillage est définie dans l'option, une vérification ou un mot de passe est également requis.

::: warning
Le code de vérification dégoûtant est vraiment difficile et dégoûtant, cela peut vous prendre trop de temps pour le déverrouiller !
:::
