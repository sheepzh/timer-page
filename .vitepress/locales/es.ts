import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Instalación",
            link: "/es/install"
        },
        {
            text: "Guía",
            link: "/es/guide/start",
        },
        {
            text: "Acerca de",
            items: [
                {
                    text: "Registro de versiones",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Apóyanos",
                    items: [
                        {
                            text: "Reportar problemas",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Ayudar a traducir",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Legal",
                    items: [
                        {
                            text: "Privacidad",
                            link: "/es/privacy"
                        },
                        {
                            text: "Licencia",
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
        "/es/guide": [
            {
                text: 'Comenzar',
                link: '/es/guide/start',
            },
            {
                text: 'Usos básicos',
                collapsed: false,
                items: [
                    {
                        text: 'Seguimiento',
                        link: '/es/guide/basic/stat'
                    },
                    {
                        text: 'Análisis',
                        link: '/es/guide/basic/analysis',
                    },
                    {
                        text: 'Control',
                        link: '/es/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Sincronización de datos',
                link: '/es/guide/data'
            }
        ]
    }
}

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Rastreador de tiempo web - Extensión para Chrome y Edge",
    description: "Mira cuánto tiempo pasas en cada sitio web. Extensión gratuita de código abierto para Chrome, Edge y Firefox. Sin cuenta, datos solo en tu dispositivo.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
