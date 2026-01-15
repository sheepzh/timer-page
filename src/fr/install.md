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

### Compilation

```sh
cd timer
npm install
npm run build:prod
```

### Installation

1. Ouvrez la page d'extension dans votre navigateur.
2. Activez le mode développeur.
3. Cliquez sur le bouton "Charger l'extension non empaquetée".
4. Sélectionnez le dossier `dist/` du code compilé.
