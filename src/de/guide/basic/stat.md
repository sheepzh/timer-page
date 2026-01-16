---
title: Verfolgung
---

# {{$frontmatter.title}}

## Dimensionen der Statistik

Zeit und Anzahl der Besuche werden nach eindeutiger Domain und Datum gruppiert und aggregiert. Das bedeutet, dass Datum und Domain die kleinste statistische Granularität bilden.

Und dieses Tool ermöglicht es Ihnen, Basis-Datensätze nach Ihren eigenen Bedürfnissen zusammenzuführen.

## Daten verwandter Websites zusammenfassen

Wie oben erwähnt, werden diese Daten nach Domain aggregiert. Zum Beispiel werden `www.github.com` und `gist.github.com` als 2 Datensätze gezählt. Wenn Sie aggregierte Daten von den beiden Websites sehen möchten, müssen Sie sie manuell zusammenführen.

Die meisten Datenanzeige-Seiten unterstützen Zusammenführungsabfragen. Und Sie können Zusammenführungsregeln auf der Backend-Seite anpassen.

### Wie sehen die Regeln aus?

Die Regel besteht aus zwei Teilen, dem Quellteil und dem Zielteil. Der Quellteil deklariert, welche Websites der Regel entsprechen, und der Zielteil definiert, wie diese Websites zusammengeführt werden. Zum Beispiel ist `gist.github.com >>> github.com` eine übliche Regel, die linke `gist.github.com` ist der Quellteil, und die rechte `github.com` ist der Zielteil.

### Wie definiert man den Quellteil?

Der Quellteil kann ein bestimmter Domainname oder ein Ant-Ausdruck sein. Unten sind einige Beispiele.

| Quellteil        | Beispiele für übereinstimmende Websites                           |
| ---------------- | ----------------------------------------------------------------- |
| www.google.com   | Nur `www.google.com` kann dieser Regel entsprechen                |
| www.google.com.* | `www.google.com.hk` `www.google.com.au`                           |
| \*\*.mit.edu     | `www.mit.edu` `libraries.mit.edu` `web.mit.edu` `foo.bar.mit.edu` |

### Wie definiert man den Zielteil?

Der Zielteil kann ein bestimmter Domainname, eine positive ganze Zahl oder leer gelassen werden. Sie werden nacheinander in Verbindung mit dem Quellteil in der folgenden Tabelle vorgestellt.

| Quellteil              | Zielteil   | Aussehen                          | Bemerkung                                                                                            |
| ---------------------- | ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| www.google.com.*       | google.com | `www.google.com.* >>> google.com` | Websites, die `www.google.com.*` entsprechen, werden in das spezifische `google.com` zusammengeführt |
| www.google.com.hk      |            | `www.google.com.hk >>> Not Merge` | `www.google.com.hk` wird aufgrund des leeren Zielteils nicht zusammengeführt                         |
| \*\*\.\*\.google.com    | 3          | `**.*.google.com >>> Keep Level 3` | Websites, die `**.*.google.com` entsprechen, werden in die letzten 3 Domain-Ebenen zusammengeführt   |

Die folgende Tabelle zeigt einige Zusammenführungsbeispiele nach dem gleichzeitigen Festlegen der obigen Regeln.

| Ursprüngliche Website      | Treffende Regeln                                                               | Zusammengeführte Website und Bemerkung |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| www.google.com.au          | `www.google.com.* >>> google.com`                                             | google.com                             |
| www.google.com.pt          | `www.google.com.* >>> google.com`                                             | google.com                             |
| www.google.com.hk          | `www.google.com.* >>> google.com`<br/>`www.google.com.hk >>> Not Merge`        | www.google.com.hk **(1)**             |
| es.news.google.com         | `**.*.google.com >>> Keep Level 3`                                              | news.google.com                        |
| b.c.photos.google.com      | `**.*.google.com >>> Keep Level 3`                                              | photos.google.com                      |
| pass.hust.edu.cn           |                                                                                 | hust.edu.cn **(2)**                    |

::: tip

(1) Wenn mehrere Regeln zutreffen, hat der Quellteil mit einem spezifischen Domainnamen Vorrang

(2) Wenn keine Regeln zutreffen, wird auf die vorherige Ebene der [Public Suffix List](https://publicsuffix.org/) zusammengeführt

:::
