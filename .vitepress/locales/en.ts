import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Download",
            link: "/download"
        },
        {
            text: "Guide",
            link: "/guide/start",
        },
        {
            text: "Sponsor",
            link: "/sponsor"
        },
        {
            text: "About",
            items: [
                {
                    text: "Author",
                    link: "/about/author"
                },
                {
                    text: "Release log",
                    link: "/about/release"
                },
                {
                    text: "Support us",
                    items: [
                        {
                            text: "Submit issues",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Help translate",
                            link: "https://crowdin.com/project/timer-chrome-edge-firefox",
                        }
                    ]
                },
                {
                    text: "Legal",
                    items: [
                        {
                            text: "Privacy",
                            link: "/legal/privacy"
                        },
                        {
                            text: "License",
                            link: "/legal/license"
                        }
                    ]
                }
            ]
        }
    ]
}

function sidebar(): DefaultTheme.SidebarMulti {
    return {
        "/guide": [
            {
                text: 'Get started',
                link: '/guide/start',
                items: [],
            },
            {
                text: 'Basic usages',
                collapsed: false,
                items: [
                    {
                        text: 'Dimensions of statistic',
                        link: '/guide/basic/stat'
                    },
                    {
                        text: 'Merge data of related sites',
                        link: '/guide/basic/merge',
                    },
                    {
                        text: 'Limited to visit sites',
                        link: '/guide/basic/limit',
                    }
                ]
            }, {
                text: "Advanced usages",
                collapsed: false,
                items: [
                    {
                        text: 'Site whitelist',
                        link: '/guide/advanced/whitelist'
                    },
                    {
                        text: 'Track any URLs',
                        link: '/guide/advanced/virtual'
                    }
                ]
            }, {
                text: "Synchronize data across terminals",
                collapsed: false,
                items: [
                    {
                        text: "With gist",
                        link: '/sync/gist'
                    }, {
                        text: "With Obsibian",
                        link: '/sync/obsibian'
                    }, {
                        text: "Query multi-terminal data",
                        link: '/sync/query'
                    }
                ]
            }
        ]
    }
}

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Time Tracker",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}