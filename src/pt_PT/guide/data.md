---
title: Sincronização de dados
description: "Exporte os dados em JSON ou CSV e guarde cópias no GitHub Gist, WebDAV ou Obsidian. Sincronização entre dispositivos a pedido ou agendada."
---

# {{$frontmatter.title}}

Esta extensão apenas armazena os seus dados localmente com a API `chrome.storage.local` fornecida pelo navegador, e nunca os envia para lado nenhum.

Mas ela suporta ferramentas para ajudá-lo a transmitir os seus dados.

## Exportar e importar

Pode exportar os dados para um ficheiro `.json` no painel e depois importá-los noutros navegadores. Note que esta operação é mais adequada se está a começar a utilizar um novo dispositivo ou um novo navegador.

Também é possível importar dados exportados de outras extensões semelhantes e decidir se substitui ou acrescenta aos dados locais.

| Outra extensão            | Formato de ficheiro | Observação                                   |
| ------------------------- | ------------------ | -------------------------------------------- |
| Webtime Tracker           | `.csv` ou `.json`  |                                              |
| Web Activity Time Tracker | `.csv`             |                                              |
| History Trends Unlimited  | `.tsc`             | Contém apenas dados para contagem de visitas |

## Sincronizar dados entre clientes

Esta extensão não suporta serviços que armazenam dados remotamente.

Em vez disso, ela fornece ferramentas para o ajudar a sincronizar dados em serviços de terceiros em que confia.

| Serviço de terceiros | Pré-requisitos                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Github Gist          | Token de acesso do Github concedendo permissões Gist                                                                             |
| Obsidian             | Cliente Obsidian com o plugin [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) instalado |

Se o token estiver configurado corretamente, pode consultar os dados de outros clientes na página de registo.
