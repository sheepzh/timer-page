---
title: Limitar tempo em sites
description: "Defina limites de tempo diários e semanais em qualquer site. A camada de bloqueio cobre a página, com verificação opcional por palavra-passe ou dois fatores."
---

# {{$frontmatter.title}}

Quando o relatório de análise mostrar quanto tempo gasta nos sites onde perde mais tempo, talvez queira controlar esse tempo.

Esta extensão permite limitar o seu comportamento em qualquer site.

## Criar regras de limite

Primeiramente, precisa de criar regras no painel.

Cada regra contém várias partes, conforme mostrado na tabela a seguir.

| Parte                   | Descrição                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| URL restrita            | A URL que precisa ser restrita. Expressões são suportadas. Como `https://www.github.com`, `*://www.google.com/**` |
| Limite diário           | Tempo máximo por dia, zero significa sem limite.                                                                  |
| Limite por visita       | Tempo máximo por visita, zero significa sem limite.                                                               |
| Períodos não permitidos | Os períodos de tempo durante os quais o acesso à URL de destino está sempre restrito.                             |

## Quando uma regra é acionada

Se alguma regra for acionada, as páginas que está a visitar serão cobertas por uma máscara que impede a navegação.

Para continuar, deve ir à página de regras e desativar ou modificar esta regra. Se a operação de desbloqueio estiver definida na opção, verificação ou palavra-passe também é necessária.

::: warning
Os CAPTCHA de alta dificuldade são propositadamente incómodos, e desbloqueá-los pode demorar bastante. Configure esta opção com cuidado.
:::
