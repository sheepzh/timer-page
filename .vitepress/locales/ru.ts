import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "Установка",
            link: "/ru/install"
        },
        {
            text: "Руководство",
            link: "/ru/guide/start",
        },
        {
            text: "О расширении",
            items: [
                {
                    text: "Журнал изменений",
                    link: "https://github.com/sheepzh/timer/blob/main/CHANGELOG.md"
                },
                {
                    text: "Поддержать нас",
                    items: [
                        {
                            text: "Сообщить о проблеме",
                            link: "https://github.com/sheepzh/timer/issues"
                        },
                        {
                            text: "Помочь с переводом",
                            link: "https://github.com/sheepzh/timer-page",
                        }
                    ]
                },
                {
                    text: "Правовая информация",
                    items: [
                        {
                            text: "Конфиденциальность",
                            link: "/ru/privacy"
                        },
                        {
                            text: "Лицензия",
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
        "/ru/guide": [
            {
                text: 'Начало работы',
                link: '/ru/guide/start',
            },
            {
                text: 'Основное использование',
                collapsed: false,
                items: [
                    {
                        text: 'Отслеживание',
                        link: '/ru/guide/basic/stat'
                    },
                    {
                        text: 'Анализ',
                        link: '/ru/guide/basic/analysis',
                    },
                    {
                        text: 'Контроль',
                        link: '/ru/guide/basic/limit',
                    }
                ]
            }, {
                text: 'Передача данных',
                link: '/ru/guide/data'
            }
        ]
    }
}

export const ruConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    title: "Трекер времени",
    description: "ЛУЧШИЙ инструмент для отслеживания времени в интернете",
    themeConfig: {
        nav: nav(),
        sidebar: sidebar(),
    }
}
