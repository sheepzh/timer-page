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

### Instalação de dependências

```sh
npm install
```

### Compilação e saída

```sh
npm run build
```

Após a compilação, um arquivo chamado `target.zip` será gerado na pasta `[PROJECT_ROOT]/market_packages/`. Em seguida, você pode descompactá-lo e carregá-lo no seu navegador.

Para Firefox e outros navegadores que não suportam [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3), você precisa usar este comando para compilação.

```sh
npm run build:firefox
```

Da mesma forma, um arquivo chamado `target.firefox.zip` será gerado.
