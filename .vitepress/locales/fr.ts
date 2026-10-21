import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Installation",
            link: "/fr/install"
        },
        {
            text: "Guide",
            link: "/fr/guide/start",
        },
        {
            text: "À propos",
            items: [
                {
                    text: "Journal des versions",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Nous soutenir",
                    items: [
                        {
                            text: "Signaler des problèmes",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Aider à traduire",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Légal",
                    items: [
                        {
                            text: "Confidentialité",
                            link: "/fr/privacy"
                        },
                        {
                            text: "Licence",
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
        "/fr/guide": [
            {
                text: 'Commencer',
                link: '/fr/guide/start',
            },
            {
                text: 'Usages de base',
                collapsed: false,
                items: [
                    {
                        text: 'Suivi',
                        link: '/fr/guide/basic/stat'
                    },
                    {
                        text: 'Analyse',
                        link: '/fr/guide/basic/analysis',
                    },
                    {
                        text: 'Contrôle',
                        link: '/fr/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Synchronisation des données',
                link: '/fr/guide/data'
            }
        ]
    }
}

export const frConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Suivi du temps web - Extension Chrome, Edge et Firefox",
    description: "Extension open-source de suivi du temps : mesure le temps passé par site, analyse les habitudes et limite les distractions. Gratuit, sans compte, données locales. Chrome, Edge et Firefox.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
