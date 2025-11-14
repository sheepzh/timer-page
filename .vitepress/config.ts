import { defineConfig } from 'vitepress'
import { enConfig } from "./locales/en"
import { zhCnConfig } from "./locales/zhCn"
import { zhTwConfig } from "./locales/zhTw"

const DESCRIPTION: string[] = [
    "Webtime Tracker",
    "Web Activity Time Tracker",
    "Time Tracker",
    "Web Habit Builder",
    "Chrome",
    "Firefox",
    "Edge",
]

const ratings = [
    {
        browser: 'Chrome',
        rating: 4.8,
        count: 500,
        link: 'https://chrome.google.com/webstore/detail/%E7%BD%91%E8%B4%B5%E5%BE%88%E8%B4%B5-%E4%B8%8A%E7%BD%91%E6%97%B6%E9%97%B4%E7%BB%9F%E8%AE%A1/dkdhhcbjijekmneelocdllcldcpmekmm',
    },
    {
        browser: 'Firefox',
        rating: 4.7,
        count: 300,
        link: 'https://addons.mozilla.org/firefox/addon/besttimetracker',
    },
    {
        browser: 'Edge',
        rating: 4.9,
        count: 200,
        link: 'https://microsoftedge.microsoft.com/addons/detail/timer-the-web-time-is-e/fepjgblalcnepokjblgbgmapmlkgfahc',
    },
]

function generateStructuredData() {
    const applications = ratings.map(rating => ({
        '@type': 'SoftwareApplication',
        'name': `Time Tracker for ${rating.browser}`,
        'applicationCategory': 'BrowserExtension',
        'operatingSystem': rating.browser,
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': rating.rating.toString(),
            'bestRating': '5',
            'worstRating': '1',
            'ratingCount': rating.count.toString(),
        },
        'url': rating.link,
    }))

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': applications,
    })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lastUpdated: true,
    srcDir: "./src",
    outDir: "./dist",
    cleanUrls: true,
    head: [
        ["link", { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" }],
        ["meta", { name: "description", content: DESCRIPTION.join(", ") }],
    ],
    transformHead: ctx => {
        const pagePath = ctx.page
        if (pagePath === 'en/index.md' || pagePath === 'zh_CN/index.md' || pagePath === 'zh_TW/index.md') {
            return [
                ['script', { type: 'application/ld+json' }, generateStructuredData()],
            ]
        }
        return []
    },
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/sheepzh/timer' },
        ],
        logo: "/images/logo.png",
    },
    locales: {
        en: {
            label: "English",
            lang: "en",
            link: "/en/",
            ...enConfig,
        },
        zh_CN: {
            label: "简体中文",
            lang: "zh_CN",
            link: "/zh_CN/",
            ...zhCnConfig,
        },
        zh_TW: {
            label: "正體中文",
            lang: "zh_TW",
            link: "/zh_TW/",
            ...zhTwConfig
        },
    },
})
