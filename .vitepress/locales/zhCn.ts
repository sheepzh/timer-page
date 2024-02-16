import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "插件安装",
            link: "/zh_CN/install"
        },
        {
            text: "使用手册",
            link: "/zh_CN/guide/start",
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
                            text: "提交反馈",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "帮助翻译",
                            link: "https://crowdin.com/project/timer-chrome-edge-firefox",
                        }
                    ]
                },
                {
                    text: "法律信息",
                    items: [
                        {
                            text: "隐私声明",
                            link: "/zh_CN/privacy"
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
        "/zh_CN/guide": [
            {
                text: '快速开始',
                link: '/zh_CN/guide/start',
            },
            {
                text: '基础功能',
                collapsed: false,
                items: [
                    {
                        text: '时间追踪',
                        link: '/zh_CN/guide/basic/stat'
                    },
                    {
                        text: '习惯分析',
                        link: '/zh_CN/guide/basic/analysis',
                    },
                    {
                        text: '行为控制',
                        link: '/zh_CN/guide/basic/limit',
                    }
                ]
            }, {
                text: '数据迁移',
                link: '/zh_CN/guide/data'
            }
        ]
    }
}

export const zhCnConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "网费很贵",
    description: "最好用的上网时间统计工具",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
        lastUpdated: {
            text: "最后更新时间",
        },
        outline: {
            label: "大纲",
        },
    },
}