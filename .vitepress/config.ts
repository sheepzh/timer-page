import { defineConfig } from 'vitepress'
import type { HeadConfig } from 'vitepress'
import { enConfig } from "./locales/en"
import { zhCnConfig } from "./locales/zhCn"
import { zhTwConfig } from "./locales/zhTw"
import { deConfig } from "./locales/de"
import { frConfig } from "./locales/fr"
import { esConfig } from "./locales/es"
import { ptConfig } from "./locales/pt_PT"
import { jaConfig } from "./locales/ja"
import { ruConfig } from "./locales/ru"
import { STORE_RATINGS } from "./shared/ratings"

const PRODUCTION_HOME = "https://www.wfhg.cc/en/"
const SITE_URL = new URL(PRODUCTION_HOME).origin.replace(/\/+$/, "")
const DEFAULT_LOCALE_PATH = "/en/"
const SITE_NAME = "Time Tracker"

const DESCRIPTION: string[] = [
    "Webtime Tracker",
    "Web Activity Time Tracker",
    "Time Tracker",
    "Web Habit Builder",
    "Chrome",
    "Firefox",
    "Edge",
]

const localePaths = [
    DEFAULT_LOCALE_PATH,
    "/zh_CN/",
    "/zh_TW/",
    "/fr/",
    "/es/",
    "/pt_PT/",
    "/ja/",
    "/de/",
    "/ru/",
]

const localeHrefLangMap: Record<string, string> = {
    "/en/": "en",
    "/zh_CN/": "zh-CN",
    "/zh_TW/": "zh-TW",
    "/fr/": "fr",
    "/es/": "es",
    "/pt_PT/": "pt-PT",
    "/ja/": "ja",
    "/de/": "de",
    "/ru/": "ru",
}

function toAbsoluteUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    return `${SITE_URL}${normalizedPath}`
}

function normalizePagePath(pagePath: string): string {
    const noMd = pagePath.replace(/\.md$/, "")
    const withTrailingSlash = noMd.endsWith("/") ? noMd : `${noMd}/`
    return withTrailingSlash.replace(/\/index\/$/, "/")
}

function buildLocalizedPath(path: string, localePath: string): string {
    const sourceLocalePath = localePaths.find(candidate => path.startsWith(candidate))
    if (!sourceLocalePath) {
        return path
    }
    return path.replace(sourceLocalePath, localePath)
}

function generateLocaleAlternates(path: string): HeadConfig[] {
    const sourceLocalePath = localePaths.find(candidate => path.startsWith(candidate))
    if (!sourceLocalePath) {
        return []
    }
    return localePaths.map(localePath => {
        const hrefLang = localeHrefLangMap[localePath]
        const href = toAbsoluteUrl(buildLocalizedPath(path, localePath))
        return ["link", { rel: "alternate", hreflang: hrefLang, href }]
    })
}

function isLocaleHome(path: string): boolean {
    return /^\/[^/]+\/$/.test(path)
}

function shouldInjectStructuredData(path: string): boolean {
    return path === "/" || isLocaleHome(path) || /\/index\/$/.test(path)
}

function isBlogArticle(path: string): boolean {
    return /\/blog\/[^/]+\/$/.test(path)
}

function generateArticleStructuredData(path: string, title?: string, description?: string) {
    const url = toAbsoluteUrl(path)
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title || SITE_NAME,
        'description': description || DESCRIPTION.join(", "),
        'image': toAbsoluteUrl('/images/logo.png'),
        'author': {
            '@type': 'Organization',
            'name': SITE_NAME,
            'url': SITE_URL,
        },
        'publisher': {
            '@type': 'Organization',
            'name': SITE_NAME,
            'logo': {
                '@type': 'ImageObject',
                'url': toAbsoluteUrl('/images/logo.png'),
            },
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': url,
        },
        'url': url,
        'inLanguage': 'en',
    })
}

function generateStructuredData() {
    const totalCount = Object.values(STORE_RATINGS).reduce((sum, item) => sum + item.count, 0)
    const weightedRating = totalCount === 0
        ? 0
        : Object.values(STORE_RATINGS).reduce((sum, item) => sum + item.rating * item.count, 0) / totalCount

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                'name': SITE_NAME,
                'url': SITE_URL,
                'inLanguage': 'en',
            },
            {
                '@type': 'SoftwareApplication',
                '@id': `${SITE_URL}/#software`,
                'name': 'Time Tracker for Browser',
                'applicationCategory': 'BrowserApplication',
                'operatingSystem': 'Chrome, Firefox, Edge',
                'url': toAbsoluteUrl(DEFAULT_LOCALE_PATH),
                'image': toAbsoluteUrl('/images/logo.png'),
                'description': DESCRIPTION.join(", "),
                'isAccessibleForFree': true,
                'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'USD',
                },
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': weightedRating.toFixed(2),
                    'bestRating': '5',
                    'worstRating': '1',
                    'ratingCount': totalCount.toString(),
                    'reviewCount': totalCount.toString(),
                },
                'sameAs': Object.values(STORE_RATINGS).map(item => item.link),
            },
        ],
    })
}

export default defineConfig({
    title: SITE_NAME,
    description: DESCRIPTION.join(", "),
    lastUpdated: true,
    lang: "en",
    srcDir: "./src",
    outDir: "./dist",
    cleanUrls: true,
    sitemap: {
        hostname: SITE_URL,
    },
    head: [
        ["link", { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" }],
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1" }],
        ["meta", { name: "description", content: DESCRIPTION.join(", ") }],
        ["meta", { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: SITE_NAME }],
        ["meta", { property: "og:title", content: SITE_NAME }],
        ["meta", { property: "og:description", content: DESCRIPTION.join(", ") }],
        ["meta", { property: "og:image", content: toAbsoluteUrl("/images/logo.png") }],
        ["meta", { property: "og:url", content: `${SITE_URL}${DEFAULT_LOCALE_PATH}` }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:title", content: SITE_NAME }],
        ["meta", { name: "twitter:description", content: DESCRIPTION.join(", ") }],
        ["meta", { name: "twitter:image", content: toAbsoluteUrl("/images/logo.png") }],
    ],
    transformHead: ctx => {
        const pagePath = normalizePagePath(ctx.page)
        const canonicalUrl = toAbsoluteUrl(pagePath)
        const localeAlternates = generateLocaleAlternates(pagePath)
        const pageHead: HeadConfig[] = [
            ["link", { rel: "canonical", href: canonicalUrl }],
            ...localeAlternates,
            ["link", { rel: "alternate", hreflang: "x-default", href: `${SITE_URL}${DEFAULT_LOCALE_PATH}` }],
        ]

        if (shouldInjectStructuredData(pagePath)) {
            pageHead.push(['script', { type: 'application/ld+json' }, generateStructuredData()])
        }
        if (isBlogArticle(pagePath)) {
            const title = (ctx.pageData?.frontmatter?.title as string | undefined)
                ?? (ctx.pageData?.title as string | undefined)
            const description = ctx.pageData?.frontmatter?.description as string | undefined
            pageHead.push(['script', { type: 'application/ld+json' }, generateArticleStructuredData(pagePath, title, description)])
            if (title) {
                pageHead.push(['meta', { property: "og:title", content: title }])
                pageHead.push(['meta', { name: "twitter:title", content: title }])
                pageHead.push(['meta', { property: "og:type", content: "article" }])
            }
            if (description) {
                pageHead.push(['meta', { property: "og:description", content: description }])
                pageHead.push(['meta', { name: "twitter:description", content: description }])
                pageHead.push(['meta', { name: "description", content: description }])
            }
        }
        return pageHead
    },
    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/sheepzh/time-tracker-4-browser' },
            { icon: 'discord', link: 'https://discord.gg/yXCngD8pKS' },
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
        fr: {
            label: "Français",
            lang: "fr",
            link: "/fr/",
            ...frConfig,
        },
        es: {
            label: "Español",
            lang: "es",
            link: "/es/",
            ...esConfig,
        },
        pt_PT: {
            label: "Português",
            lang: "pt_PT",
            link: "/pt_PT/",
            ...ptConfig,
        },
        ja: {
            label: "日本語",
            lang: "ja",
            link: "/ja/",
            ...jaConfig,
        },
        de: {
            label: "Deutsch",
            lang: "de",
            link: "/de/",
            ...deConfig,
        },
        ru: {
            label: "Русский",
            lang: "ru",
            link: "/ru/",
            ...ruConfig,
        },
    },
})
