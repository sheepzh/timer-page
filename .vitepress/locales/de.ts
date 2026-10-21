import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Installation",
            link: "/de/install"
        },
        {
            text: "Anleitung",
            link: "/de/guide/start",
        },
        {
            text: "Blog",
            link: "/de/blog"
        },
        {
            text: "Über",
            items: [
                {
                    text: "Versionsprotokoll",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Unterstützen Sie uns",
                    items: [
                        {
                            text: "Probleme melden",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Bei der Übersetzung helfen",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Rechtliches",
                    items: [
                        {
                            text: "Datenschutz",
                            link: "/de/privacy"
                        },
                        {
                            text: "Lizenz",
                            link: "https://github.com/sheepzh/timer/blob/main/LICENSE"
                        }
                    ]
                }
            ]
        }
    ]
}

function sidebar(): DefaultTheme.SidebarMulti {
    return {
        "/de/guide": [
            {
                text: 'Erste Schritte',
                link: '/de/guide/start',
            },
            {
                text: 'Grundlegende Verwendung',
                collapsed: false,
                items: [
                    {
                        text: 'Statistik',
                        link: '/de/guide/basic/stat'
                    },
                    {
                        text: 'Analyse',
                        link: '/de/guide/basic/analysis',
                    },
                    {
                        text: 'Kontrolle',
                        link: '/de/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Datensynchronisierung',
                link: '/de/guide/data'
            }
        ]
    }
}

export const deConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Zeiterfassung für Browser - Chrome, Edge & Firefox",
    description: "Open-Source-Erweiterung zur Zeiterfassung: erfasst die Surfzeit pro Website, analysiert Surfgewohnheiten und blockt ablenkende Seiten. Kostenlos, ohne Konto, für Chrome, Edge und Firefox.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}