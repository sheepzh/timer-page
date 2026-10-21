import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Installation",
            link: "/en/install"
        },
        {
            text: "FAQ",
            link: "/en/faq"
        },
        {
            text: "Blog",
            link: "/en/blog"
        },
        {
            text: "Guide",
            link: "/en/guide/start",
        },
        {
            text: "About",
            items: [
                {
                    text: "Changelog",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Support us",
                    items: [
                        {
                            text: "Report issues",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Help translate",
                            link: "https://github.com/sheepzh/timer-page",
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
                text: 'Data Sync',
                link: '/en/guide/data'
            }
        ]
    }
}

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Time Tracker - Web Habit Builder",
    description: "An open-source extension that tracks time per website, analyzes browsing habits and limits distracting sites. Free, no account, data stays local. For Chrome, Edge and Firefox.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}