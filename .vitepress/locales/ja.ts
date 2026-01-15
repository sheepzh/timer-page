import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "インストール",
            link: "/ja/install"
        },
        {
            text: "ガイド",
            link: "/ja/guide/start",
        },
        {
            text: "について",
            items: [
                {
                    text: "リリースログ",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "サポート",
                    items: [
                        {
                            text: "問題を報告",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "翻訳に協力",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "法的情報",
                    items: [
                        {
                            text: "プライバシー",
                            link: "/ja/privacy"
                        },
                        {
                            text: "ライセンス",
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
        "/ja/guide": [
            {
                text: 'はじめに',
                link: '/ja/guide/start',
            },
            {
                text: '基本的な使い方',
                collapsed: false,
                items: [
                    {
                        text: '追跡',
                        link: '/ja/guide/basic/stat'
                    },
                    {
                        text: '分析',
                        link: '/ja/guide/basic/analysis',
                    },
                    {
                        text: 'コントロール',
                        link: '/ja/guide/basic/limit',
                    }
                ]
            }, {
                text: 'データ転送',
                link: '/ja/guide/data'
            }
        ]
    }
}

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "タイムトラッカー",
    description: "最高のウェブ時間追跡ツール",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
