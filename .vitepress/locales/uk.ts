import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Встановлення",
            link: "/uk/install"
        },
        {
            text: "Керівництво",
            link: "/uk/guide/start",
        },
        {
            text: "О розширенні",
            items: [
                {
                    text: "Журнал змін",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Підтримати проєкт",
                    items: [
                        {
                            text: "Повідомити про проблему",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Допомогти з перекладом",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Правова інформація",
                    items: [
                        {
                            text: "Конфіденційність",
                            link: "/uk/privacy"
                        },
                        {
                            text: "Ліцензія",
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
        "/uk/guide": [
            {
                text: 'Початок роботи',
                link: '/uk/guide/start',
            },
            {
                text: 'Основне використання',
                collapsed: false,
                items: [
                    {
                        text: 'Відстеження часу',
                        link: '/uk/guide/basic/stat'
                    },
                    {
                        text: 'Аналіз звичок',
                        link: '/uk/guide/basic/analysis',
                    },
                    {
                        text: 'Обмеження часу',
                        link: '/uk/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Синхронізація даних',
                link: '/uk/guide/data'
            }
        ]
    }
}

export const ukConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Трекер часу для браузера - Chrome, Edge та Firefox",
    description: "Трекер часу в браузері: враховує час на кожному сайті, аналізує звички та обмежує відволікаючі сайти. Безкоштовно, відкритий код, для Chrome, Edge та Firefox.",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
