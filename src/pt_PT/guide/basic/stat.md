---
title: Rastreamento
---

# {{$frontmatter.title}}

## Dimensões das estatísticas

O tempo e a contagem de visitas serão agrupados e agregados por domínio único e data. Isso significa que data e domínio constituem a menor granularidade estatística.

E esta ferramenta permite que você mescle registros básicos de acordo com suas próprias necessidades.

## Resumir dados de sites relacionados

Como mencionado acima, esses dados são agregados por domínio. Por exemplo, `www.github.com` e `gist.github.com` são contados como 2 registros. Se você deseja ver dados agregados dos dois sites, precisará mesclá-los manualmente.

A maioria das páginas de exibição de dados suporta consultas de mesclagem. E você pode personalizar as regras de mesclagem na página de backend.

### Como são as regras?

A regra consiste em duas partes, a parte de origem e a parte de destino. A parte de origem declara quais sites correspondem à regra, e a parte de destino define como esses sites são mesclados. Por exemplo, `gist.github.com >>> github.com` é uma regra comum, a esquerda `gist.github.com` é a parte de origem, e a direita `github.com` é a parte de destino.

### Como definir a parte de origem?

A parte de origem pode ser um nome de domínio específico ou uma expressão Ant. Abaixo estão alguns exemplos.

| Parte de origem  | Exemplos de sites correspondentes                                 |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | Apenas `www.google.com` pode corresponder a esta regra            |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### Como definir a parte de destino?

A parte de destino pode ser um nome de domínio específico, um número inteiro positivo ou ser deixada em branco. Eles serão apresentados um por um em conjunto com a parte de origem na tabela abaixo.

| Parte de origem          | Parte de destino | Aparência                         | Observação                                                                                  |
| ------------------------ | ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| www.google.com.*         | google.com       | `www.google.com.* >>> google.com` | Sites correspondentes a `www.google.com.*` serão mesclados no `google.com` específico       |
| www.google.com.hk        |                  | `www.google.com.hk >>> Not Merge` | `www.google.com.hk` não será mesclado devido à parte de destino em branco                   |
| \*\*\.\*\.google.com     | 3                | `**.*.google.com >>> Keep Level 3` | Sites correspondentes a `**.*.google.com` serão mesclados nos últimos 3 níveis de domínio  |

A tabela a seguir mostra alguns exemplos de mesclagem após definir as regras acima juntas.

| Site original            | Regras correspondentes                                                               | Site mesclado e observação    |
| ------------------------ | ------------------------------------------------------------------------------------- | ----------------------------- |
| www.google.com.au        | `www.google.com.* >>> google.com`                                                   | google.com                    |
| www.google.com.pt        | `www.google.com.* >>> google.com`                                                   | google.com                    |
| www.google.com.hk        | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge`           | www.google.com.hk **(1)**     |
| es.news.google.com       | `**.*.google.com >>> Keep Level 3`                                                   | news.google.com               |
| b.c.photos.google.com    | `**.*.google.com >>> Keep Level 3`                                                   | photos.google.com             |
| pass.hust.edu.cn         |                                                                                      | hust.edu.cn **(2)**           |

::: tip

(1) Quando múltiplas regras correspondem, a parte de origem com um nome de domínio específico tem prioridade

(2) Quando nenhuma regra corresponde, mescla para o nível anterior da [Public Suffix List](https://publicsuffix.org/)

:::
