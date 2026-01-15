import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Instalação",
            link: "/pt/install"
        },
        {
            text: "Guia",
            link: "/pt/guide/start",
        },
        {
            text: "Sobre",
            items: [
                {
                    text: "Registro de versões",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Apoie-nos",
                    items: [
                        {
                            text: "Enviar problemas",
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
                            link: "/pt/privacy"
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
        "/pt/guide": [
            {
                text: 'Começar',
                link: '/pt/guide/start',
            },
            {
                text: 'Usos básicos',
                collapsed: false,
                items: [
                    {
                        text: 'Rastreamento',
                        link: '/pt/guide/basic/stat'
                    },
                    {
                        text: 'Análise',
                        link: '/pt/guide/basic/analysis',
                    },
                    {
                        text: 'Controle',
                        link: '/pt/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Transmissão de dados',
                link: '/pt/guide/data'
            }
        ]
    }
}

export const ptConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Rastreador de Tempo",
    description: "A MELHOR ferramenta de rastreamento de tempo na web",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
