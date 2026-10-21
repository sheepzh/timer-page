---
title: Définir des limites de temps
description: "Fixez des limites de temps quotidiennes et hebdomadaires. Superposition de blocage avec vérification optionnelle par mot de passe ou deux facteurs."
---

# {{$frontmatter.title}}

Une fois que le rapport d'analyse vous montre sur les sites qui vous font perdre le plus de temps, vous voudrez peut-être contrôler ce temps.

Cette extension vous permet de limiter votre comportement sur n'importe quel site Web.

## Créer des règles de limite

Tout d'abord, vous devez créer des règles sur le tableau de bord.

Chaque règle contient plusieurs parties, comme indiqué dans le tableau suivant.

| Partie                  | Description                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| URL restreinte          | L'URL qui doit être restreinte. Les expressions sont prises en charge. Comme `https://www.github.com`, `*://www.google.com/**` |
| Limite quotidienne      | Temps maximum par jour, zéro signifie aucune limite.                                                                           |
| Limite par visite       | Temps maximum par visite, zéro signifie aucune limite.                                                                         |
| Périodes non autorisées | Les périodes pendant lesquelles l'accès à l'URL cible est toujours restreint.                                                  |

## Au déclenchement d'une règle

Dès qu'une restriction d'une règle est atteinte, les pages que vous visitez sont couvertes d'une superposition de blocage qui empêche la navigation.

Pour continuer, vous devez vous rendre sur la page des règles et désactiver ou modifier cette règle. Si l'opération de déverrouillage est définie dans l'option, une vérification ou un mot de passe est également requis.

::: warning
Les CAPTCHA de haute difficulté sont volontairement pénibles, et leur déverrouillage peut prendre beaucoup de temps. Configurez cette option avec prudence.
:::
