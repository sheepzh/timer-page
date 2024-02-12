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
            text: "About",
            items: [
                {
                    text: "Release log",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
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
                            link: "/en/privacy"
                        },
                        {
                            text: "License",
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
                        text: 'Tracking',
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
                text: 'Data transmission',
                link: '/en/guide/data'
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