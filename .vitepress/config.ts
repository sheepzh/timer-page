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
import { ukConfig } from "./locales/uk"
import { STORE_RATINGS } from "./shared/ratings"

const PRODUCTION_HOME = "https://time-tracker-4-browser.app/en/"
const SITE_URL = new URL(PRODUCTION_HOME).origin.replace(/\/+$/, "")
const DEFAULT_LOCALE_PATH = "/en/"
const SITE_NAME = "Time Tracker - Web Habit Builder"

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
    "/ru/",
    "/ja/",
    "/de/",
    "/uk/",
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
    "/uk/": "uk",
}

// og:locale uses the language_TERRITORY format defined by the Open Graph protocol
const localeOgLocaleMap: Record<string, string> = {
    "/en/": "en_US",
    "/zh_CN/": "zh_CN",
    "/zh_TW/": "zh_TW",
    "/fr/": "fr_FR",
    "/es/": "es_ES",
    "/pt_PT/": "pt_PT",
    "/ja/": "ja_JP",
    "/de/": "de_DE",
    "/ru/": "ru_RU",
    "/uk/": "uk_UA",
}

// Map pageData.locale keys to locale path prefixes, the root locale falls back to English
const localePathByKey: Record<string, string> = {
    root: DEFAULT_LOCALE_PATH,
    en: DEFAULT_LOCALE_PATH,
    zh_CN: "/zh_CN/",
    zh_TW: "/zh_TW/",
    fr: "/fr/",
    es: "/es/",
    pt_PT: "/pt_PT/",
    ja: "/ja/",
    de: "/de/",
    ru: "/ru/",
    uk: "/uk/",
}

// Localized descriptions reused by structured data and social meta tags
// Keys are locale path prefixes, matching the lookup argument used by transformHead and generateStructuredData
const localeDescriptions: Record<string, string> = {
    "/en/": enConfig.description ?? "",
    "/zh_CN/": zhCnConfig.description ?? "",
    "/zh_TW/": zhTwConfig.description ?? "",
    "/fr/": frConfig.description ?? "",
    "/es/": esConfig.description ?? "",
    "/pt_PT/": ptConfig.description ?? "",
    "/ja/": jaConfig.description ?? "",
    "/de/": deConfig.description ?? "",
    "/ru/": ruConfig.description ?? "",
    "/uk/": ukConfig.description ?? "",
}

function toAbsoluteUrl(path: string): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    return `${SITE_URL}${normalizedPath}`
}

function normalizePagePath(pagePath: string): string {
    // ctx.page is relative to srcDir without a leading slash in VitePress 2.0.0-alpha
    const withLeadingSlash = pagePath.startsWith("/") ? pagePath : `/${pagePath}`
    const noMd = withLeadingSlash.replace(/\.md$/, "")
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

function generateFaqStructuredData(faq: { q: string; a: string }[]) {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faq.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a,
            },
        })),
    })
}

function generateArticleStructuredData(path: string, title?: string, description?: string, localePath: string = DEFAULT_LOCALE_PATH) {
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
        'inLanguage': localeHrefLangMap[localePath] ?? 'en',
    })
}

function generateStructuredData(localePath: string) {
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
                'inLanguage': localeHrefLangMap[localePath] ?? 'en',
            },
            {
                '@type': 'SoftwareApplication',
                '@id': `${SITE_URL}/#software`,
                'name': 'Time Tracker - Web Habit Builder',
                'applicationCategory': 'ProductivityApplication',
                'operatingSystem': 'Chrome, Firefox, Edge',
                'url': toAbsoluteUrl(DEFAULT_LOCALE_PATH),
                'image': toAbsoluteUrl('/images/logo.png'),
                'description': localeDescriptions[localePath] || DESCRIPTION.join(", "),
                'isAccessibleForFree': true,
                'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'USD',
                },
                'author': {
                    '@type': 'Person',
                    'name': 'Victor Zhang',
                    'url': 'https://github.com/sheepzh'
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
        // VitePress emits no x-default and groups pages per locale with an empty url for the root page
        transformItems: items =>
            items
                .filter(item => item.url !== "")
                .map(item => {
                    const links = item.links ?? []
                    const enHref = links.find(link => link.lang === "en")?.url
                    return {
                        ...item,
                        links: enHref
                            ? [...links, { lang: "x-default", url: enHref }]
                            : links.length
                                ? links
                                : undefined,
                    }
                }),
    },
    head: [
        ["link", { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" }],
        ["meta", { name: "viewport", content: "width=device-width,initial-scale=1" }],
        ["meta", { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: SITE_NAME }],
        ["meta", { property: "og:image", content: toAbsoluteUrl("/images/logo.png") }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:image", content: toAbsoluteUrl("/images/logo.png") }],
    ],
    transformHead: ctx => {
        const pagePath = normalizePagePath(ctx.page)
        // The root path is redirected to /en/ by Vercel, so all SEO tags resolve to the default locale page
        const effectivePath = pagePath === "/" ? DEFAULT_LOCALE_PATH : pagePath
        const canonicalUrl = toAbsoluteUrl(effectivePath)
        const localeAlternates = generateLocaleAlternates(effectivePath)
        const xDefaultHref = toAbsoluteUrl(buildLocalizedPath(effectivePath, DEFAULT_LOCALE_PATH))
        const pageHead: HeadConfig[] = [
            ["link", { rel: "canonical", href: canonicalUrl }],
            ...localeAlternates,
            ["link", { rel: "alternate", hreflang: "x-default", href: xDefaultHref }],
        ]

        // Infer the locale from the first path segment of the relative page path
        const localeKey = ctx.pageData.relativePath.split("/")[0]
        const localePath = localePathByKey[localeKey] ?? DEFAULT_LOCALE_PATH
        const pageTitle = ctx.pageData.title || SITE_NAME
        const pageDescription = ctx.pageData.description || localeDescriptions[localePath] || DESCRIPTION.join(", ")
        pageHead.push(
            ["meta", { property: "og:title", content: pageTitle }],
            ["meta", { property: "og:description", content: pageDescription }],
            ["meta", { property: "og:url", content: canonicalUrl }],
            ["meta", { property: "og:locale", content: localeOgLocaleMap[localePath] ?? "en_US" }],
            ["meta", { name: "twitter:title", content: pageTitle }],
            ["meta", { name: "twitter:description", content: pageDescription }],
        )
        localePaths.forEach(candidate => {
            if (candidate !== localePath) {
                pageHead.push(["meta", { property: "og:locale:alternate", content: localeOgLocaleMap[candidate] }])
            }
        })

        if (shouldInjectStructuredData(effectivePath)) {
            pageHead.push(['script', { type: 'application/ld+json' }, generateStructuredData(localePath)])
        }
        if (isBlogArticle(effectivePath)) {
            const title = (ctx.pageData?.frontmatter?.title as string | undefined)
                ?? (ctx.pageData?.title as string | undefined)
            const description = ctx.pageData?.frontmatter?.description as string | undefined
            pageHead.push(['script', { type: 'application/ld+json' }, generateArticleStructuredData(effectivePath, title, description, localePath)])
        }
        const faq = ctx.pageData?.frontmatter?.faq as { q: string; a: string }[] | undefined
        if (faq?.length) {
            pageHead.push(['script', { type: 'application/ld+json' }, generateFaqStructuredData(faq)])
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
            lang: "zh-CN",
            link: "/zh_CN/",
            ...zhCnConfig,
        },
        zh_TW: {
            label: "正體中文",
            lang: "zh-TW",
            link: "/zh_TW/",
            ...zhTwConfig
        },
        fr: {
            label: "Français",
            lang: "fr",
            link: "/fr/",
            ...frConfig,
        },
        ru: {
            label: "Русский",
            lang: "ru",
            link: "/ru/",
            ...ruConfig,
        },
        es: {
            label: "Español",
            lang: "es",
            link: "/es/",
            ...esConfig,
        },
        pt_PT: {
            label: "Português",
            lang: "pt-PT",
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
        uk: {
            label: "Українська",
            lang: "uk",
            link: "/uk/",
            ...ukConfig,
        },
    },
})
