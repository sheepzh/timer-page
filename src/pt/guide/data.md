---
title: Transmissão de dados
---

# {{$frontmatter.title}}

Esta extensão apenas armazena seus dados localmente com a API `chrome.storage.local` fornecida pelo navegador, e nunca envia seus dados para qualquer lugar.

Mas ela suporta ferramentas para ajudá-lo a transmitir seus dados.

## Exportar e importar

Você pode exportar os dados para um arquivo `.json` na página de backend e depois importá-lo em outros navegadores. Deve-se notar que esta operação é mais adequada se você está apenas começando a usar um novo dispositivo ou novo navegador.

Você também pode importar dados exportados de outras extensões semelhantes e decidir substituir ou adicionar aos dados locais.

| Outra extensão            | Formato de arquivo | Observação                                   |
| ------------------------- | ------------------ | -------------------------------------------- |
| Webtime Tracker           | `.csv` ou `.json`  |                                              |
| Web Activity Time Tracker | `.csv`             |                                              |
| History Trends Unlimited  | `.tsc`             | Contém apenas dados para contagem de visitas |

## Sincronizar dados entre clientes

Esta extensão não suporta serviços que armazenam dados remotamente.

Em vez disso, ela fornece ferramentas para ajudá-lo a sincronizar dados em serviços de terceiros em que você confia.

| Serviço de terceiros | Pré-requisitos                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Github Gist          | Token de acesso do Github concedendo permissões Gist                                                                             |
| Obsidian             | Cliente Obsidian com o plugin [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) instalado |

Se o token estiver configurado corretamente, você pode consultar os dados de outros clientes na página de registro.
