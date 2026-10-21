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
                    text: "更新履歴",
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
                        text: '計測',
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
                text: 'データ同期',
                link: '/ja/guide/data'
            }
        ]
    }
}

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "タイムトラッカー - Chrome・Edge・Firefox 拡張機能",
    description: "ウェブ閲覧時間を自動計測する無料のブラウザ拡張機能。サイト別の利用時間を記録し、習慣を分析、集中のための利用制限も可能。データは端末内のみに保存。Chrome・Edge・Firefox 対応。",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
