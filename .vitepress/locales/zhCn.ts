import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "插件安装",
            link: "/zhCn/install"
        },
        {
            text: "使用指引",
            link: "/zhCn/guide/start",
        },
        {
            text: "捐赠",
            link: "/zhCn/sponsor"
        },
        {
            text: "关于",
            items: [
                {
                    text: "发布日志",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "支持我们",
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
                    text: "法律信息",
                    items: [
                        {
                            text: "隐私声明",
                            link: "/zhCn/privacy"
                        },
                        {
                            text: "开源协议",
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
        "/zhCn/guide": [
            {
                text: '快速开始',
                link: '/zhCn/guide/start',
            },
            {
                text: '基础功能',
                collapsed: false,
                items: [
                    {
                        text: '追踪时间',
                        link: '/zhCn/guide/basic/stat'
                    },
                    {
                        text: '分析报表',
                        link: '/zhCn/guide/basic/analysis',
                    },
                    {
                        text: '控制时间',
                        link: '/zhCn/guide/basic/limit',
                    }
                ]
            }, {
                text: '数据迁移',
                link: '/zhCn/guide/data'
            }
        ]
    }
}

export const zhCnConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "网费很贵",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}