import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Instalação",
            link: "/pt_PT/install"
        },
        {
            text: "Guia",
            link: "/pt_PT/guide/start",
        },
        {
            text: "Sobre",
            items: [
                {
                    text: "Registo de versões",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Apoie-nos",
                    items: [
                        {
                            text: "Reportar problemas",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Ajude a traduzir",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Legal",
                    items: [
                        {
                            text: "Privacidade",
                            link: "/pt_PT/privacy"
                        },
                        {
                            text: "Licença",
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
        "/pt_PT/guide": [
            {
                text: 'Começar',
                link: '/pt_PT/guide/start',
            },
            {
                text: 'Usos básicos',
                collapsed: false,
                items: [
                    {
                        text: 'Rastreio',
                        link: '/pt_PT/guide/basic/stat'
                    },
                    {
                        text: 'Análise',
                        link: '/pt_PT/guide/basic/analysis',
                    },
                    {
                        text: 'Controle',
                        link: '/pt_PT/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Sincronização de dados',
                link: '/pt_PT/guide/data'
            }
        ]
    }
}

export const ptConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Rastreador de Tempo para Chrome, Edge e Firefox",
    description: "Veja quanto tempo passa em cada site. Extensão gratuita e open-source para Chrome, Edge e Firefox. Sem conta, os dados ficam apenas no seu dispositivo.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
