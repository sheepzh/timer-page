---
title: Installation
---

# {{$frontmatter.title}}

## Depuis le magasin web

L'extension est officiellement publiée sur les magasins web de Chrome, Edge et Firefox. Vous pouvez l'installer directement depuis ces liens ci-dessous.

<InstallGrid />

## Depuis le code source

Vous pouvez également télécharger le code source pour l'installer manuellement.

::: tip
Cette section s'applique uniquement aux navigateurs basés sur Chromium. Si vous souhaitez l'installer pour Safari, veuillez lire [cette page](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Prérequis

-   Git.
-   Node.js version 20 ou supérieure.

### Téléchargement du code

```sh
git clone https://github.com/sheepzh/timer.git
```

### Installation des dépendances

```sh
npm install
```

### Compilation et sortie

```sh
npm run build
```

Après la compilation, un fichier nommé `target.zip` sera généré dans le dossier `[PROJECT_ROOT]/market_packages/`. Ensuite, vous pouvez le décompresser et le charger dans votre navigateur.

Pour Firefox et les autres navigateurs ne prenant pas en charge [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), vous devez utiliser cette commande pour la compilation.

```sh
npm run build:firefox
```

De même, un fichier nommé `target.firefox.zip` sera généré.
