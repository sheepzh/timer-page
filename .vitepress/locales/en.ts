import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Installation",
            link: "/en/install"
        },
        {
            text: "Guide",
            link: "/en/guide/start",
        },
        {
            text: "Sponsor",
            link: "/en/sponsor"
        },
        {
            text: "About",
            items: [
                {
                    text: "Author",
                    link: "/en/about/author"
                },
                {
                    text: "Release log",
                    link: "/en/about/release"
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
                            link: "/en/legal/privacy"
                        },
                        {
                            text: "License",
                            link: "/en/legal/license"
                        }
                    ]
                }
            ]
        }
    ]
}

function sidebar(): DefaultTheme.SidebarMulti {
    return {
        "/en/guide": [
            {
                text: 'Get Started',
                link: '/en/guide/start',
            },
            {
                text: 'Basic Usages',
                collapsed: false,
                items: [
                    {
                        text: 'Statistics',
                        link: '/en/guide/basic/stat'
                    },
                    {
                        text: 'Analysis',
                        link: '/en/guide/basic/analysis',
                    },
                    {
                        text: 'Control',
                        link: '/en/guide/basic/limit',
                    }
                ]
            }, {
                text: "Advanced usages",
                collapsed: false,
                items: [
                    {
                        text: 'Site whitelist',
                        link: '/en/guide/advanced/whitelist'
                    },
                    {
                        text: 'Track any URLs',
                        link: '/en/guide/advanced/virtual'
                    }
                ]
            }, {
                text: "Synchronize data across terminals",
                collapsed: false,
                items: [
                    {
                        text: "With gist",
                        link: '/en/sync/gist'
                    }, {
                        text: "With Obsibian",
                        link: '/en/sync/obsibian'
                    }, {
                        text: "Query multi-terminal data",
                        link: '/en/sync/query'
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