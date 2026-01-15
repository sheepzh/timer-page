---
title: Controle
---

# {{$frontmatter.title}}

Uma vez que você percebe quanto tempo gasta em sites inúteis através do relatório de análise acima. Talvez você precise controlar o tempo.

Esta extensão permite que você limite seu comportamento em qualquer site.

## Criar regras de limite

Primeiramente, você precisa criar regras na página de backend.

Cada regra contém várias partes, conforme mostrado na tabela a seguir.

| Parte                   | Descrição                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| URL restrita            | A URL que precisa ser restrita. Expressões são suportadas. Como `https://www.github.com`, `*://www.google.com/**` |
| Limite diário           | Tempo máximo por dia, zero significa sem limite.                                                                  |
| Limite por visita       | Tempo máximo por visita, zero significa sem limite.                                                               |
| Períodos não permitidos | Os períodos de tempo durante os quais o acesso à URL de destino está sempre restrito.                             |

## Restrito

Se você atender às restrições de qualquer regra, as páginas que você está visitando serão cobertas com uma máscara que impede você de navegar.

Para continuar, você deve ir à página de regras e desabilitar ou modificar esta regra. Se a operação de desbloqueio estiver definida na opção, verificação ou senha também é necessária.

::: warning
O código de verificação nojento é realmente difícil e nojento, pode levar muito tempo para desbloqueá-lo!
:::
