import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "程式安裝",
            link: "/zh_TW/install"
        },
        {
            text: "使用手冊",
            link: "/zh_TW/guide/start",
        },
        {
            text: "關於",
            items: [
                {
                    text: "發布日誌",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "支援我們",
                    items: [
                        {
                            text: "提交回饋",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "幫助翻譯",
                            link: "https://crowdin.com/project/timer-chrome-edge-firefox",
                        }
                    ]
                },
                {
                    text: "法律資訊",
                    items: [
                        {
                            text: "隱私權聲明",
                            link: "/zh_TW/privacy"
                        },
                        {
                            text: "開源協議",
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
        "/zh_TW/guide": [
            {
                text: '快速開始',
                link: '/zh_TW/guide/start',
            },
            {
                text: '基礎功能',
                collapsed: false,
                items: [
                    {
                        text: '時間追蹤',
                        link: '/zh_TW/guide/basic/stat'
                    },
                    {
                        text: '習慣分析',
                        link: '/zh_TW/guide/basic/analysis',
                    },
                    {
                        text: '行為控制',
                        link: '/zh_TW/guide/basic/limit',
                    }
                ]
            }, {
                text: '資料遷移',
                link: '/zh_TW/guide/data'
            }
        ]
    }
}

export const zhTwConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "網費很貴",
    description: "最好用的上網追蹤工具",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
        lastUpdated: {
            text: "最後更新時間",
        },
        outline: {
            label: "大綱",
        },
        docFooter: {
            next: "下一節",
            prev: "上一節",
        },
        sidebarMenuLabel: "選單",
    },
}