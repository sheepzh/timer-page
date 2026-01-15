---
title: Instalação
---

# {{$frontmatter.title}}

## Da loja web

A extensão é oficialmente publicada nas lojas web do Chrome, Edge e Firefox. Você pode instalá-la diretamente desses links abaixo.

<InstallGrid />

## Do código-fonte

Você também pode baixar o código-fonte para instalá-lo manualmente.

::: tip
Esta seção se aplica apenas a navegadores baseados em Chromium. Se você deseja instalá-lo para o Safari, leia [esta página](https://github.com/sheepzh/timer/blob/main/doc/safari-install.md).
:::

### Pré-requisitos

-   Git.
-   Node.js versão 20 ou superior.

### Download do código

```sh
git clone https://github.com/sheepzh/timer.git
```

### Compilação

```sh
cd timer
npm install
npm run build:prod
```

### Instalação

1. Abra a página de extensões em seu navegador.
2. Ative o modo de desenvolvedor.
3. Clique no botão "Carregar extensão sem pacote".
4. Selecione a pasta `dist/` do código compilado.
