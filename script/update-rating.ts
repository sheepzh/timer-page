/**
 * Fetch the latest ratings and review counts from Chrome / Firefox / Edge stores
 * and write them back to .vitepress/shared/rating-resource.json.
 *
 * Run directly with native Node 24 TypeScript: `node script/update-rating.ts`
 * (Type stripping is enabled by default since Node 23.6, no flag required.)
 *
 * Data sources:
 *   - Firefox : https://addons.mozilla.org/api/v5/addons/addon/{slug}/  (official public API)
 *   - Edge    : https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/{id}
 *   - Chrome  : scrape https://chromewebstore.google.com/detail/{id} HTML
 *
 * A failure on a single platform does not affect the others; the process
 * exits non-zero only when every platform fails.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface RatingInfo {
    rating: number
    count: number
    link: string
}

interface RatingResult {
    rating: number
    count: number
}

type RatingFile = Record<string, RatingInfo>
type Fetcher = (link: string) => Promise<RatingResult>

const __dirname = dirname(fileURLToPath(import.meta.url))
const FILE = resolve(__dirname, '../.vitepress/shared/rating-resource.json')

const UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'

// Safety net: any rating below this threshold is treated as a parse anomaly
// (e.g. wrong field picked up after a store HTML/API change) and the entry
// is left untouched instead of being overwritten with a bogus low value.
const MIN_TRUSTED_RATING = 4.8

async function fetchFirefox(link: string): Promise<RatingResult> {
    const slug = link.replace(/\/+$/, '').split('/').pop() as string
    const url = `https://addons.mozilla.org/api/v5/addons/addon/${slug}/`
    const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as {
        ratings?: { average?: number; count?: number }
    }
    const average = data?.ratings?.average
    const count = data?.ratings?.count
    if (typeof average !== 'number' || typeof count !== 'number')
        throw new Error('unexpected response shape')
    return { rating: average, count }
}

async function fetchEdge(link: string): Promise<RatingResult> {
    const id = link.replace(/\/+$/, '').split('/').pop() as string
    const url = `https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/${id}`
    const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as {
        averageRating?: number
        AverageRating?: number
        ratingCount?: number
        RatingCount?: number
    }
    const average = data?.averageRating ?? data?.AverageRating
    const count = data?.ratingCount ?? data?.RatingCount
    if (typeof average !== 'number' || typeof count !== 'number')
        throw new Error('unexpected response shape')
    return { rating: average, count }
}

/**
 * Chrome Web Store has no public ratings API.
 * The detail page injects pre-rendered data via
 *   AF_initDataCallback({key:'ds:0', ..., data:[[<id>,<iconUrl>,<name>,<rating>,<count>,...]], ...})
 * We anchor on the extension id, skip the two string fields (icon / name),
 * and pull the float rating and integer review count that follow.
 */
async function fetchChrome(link: string): Promise<RatingResult> {
    const idMatch = link.match(/[a-p]{32}/)
    if (!idMatch) throw new Error(`cannot extract extension id from ${link}`)
    const id = idMatch[0]
    const url = `https://chromewebstore.google.com/detail/${id}`
    const res = await fetch(url, {
        headers: {
            'User-Agent': UA,
            'Accept-Language': 'en-US,en;q=0.9',
            Accept: 'text/html,application/xhtml+xml',
        },
        redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()

    // "<id>","<icon>","<name>",<rating>,<count>
    const re = new RegExp(
        `"${id}"\\s*,\\s*"[^"]*"\\s*,\\s*"[^"]*"\\s*,\\s*([\\d.]+)\\s*,\\s*(\\d+)`,
    )
    const m = html.match(re)
    if (!m) throw new Error('rating not found in HTML')

    return { rating: Number(m[1]), count: Number(m[2]) }
}

const fetchers: Record<string, Fetcher> = {
    Chrome: fetchChrome,
    Firefox: fetchFirefox,
    Edge: fetchEdge,
}

async function main(): Promise<void> {
    const raw = await readFile(FILE, 'utf-8')
    const data = JSON.parse(raw) as RatingFile

    let changed = false
    let okCount = 0
    let failCount = 0

    for (const [platform, info] of Object.entries(data)) {
        const fetcher = fetchers[platform]
        if (!fetcher) {
            console.warn(`[${platform}] no fetcher, skip`)
            continue
        }
        try {
            const next = await fetcher(info.link)
            if (next.rating < MIN_TRUSTED_RATING) {
                console.warn(
                    `[${platform}] suspicious rating ${next.rating} < ${MIN_TRUSTED_RATING}, keep ${info.rating}/${info.count}`,
                )
                continue
            }
            okCount++
            if (next.rating !== info.rating || next.count !== info.count) {
                console.log(
                    `[${platform}] ${info.rating}/${info.count} -> ${next.rating}/${next.count}`,
                )
                info.rating = next.rating
                info.count = next.count
                changed = true
            } else {
                console.log(`[${platform}] unchanged ${info.rating}/${info.count}`)
            }
        } catch (err) {
            failCount++
            const msg = err instanceof Error ? err.message : String(err)
            console.error(`[${platform}] failed: ${msg}`)
        }
    }

    if (changed) {
        await writeFile(FILE, JSON.stringify(data, null, 4) + '\n', 'utf-8')
        console.log('rating-resource.json updated')
    } else {
        console.log('no changes')
    }

    // Treat as failure only when every platform failed.
    if (okCount === 0 && failCount > 0) process.exit(1)
}

main().catch((err: unknown) => {
    console.error(err)
    process.exit(1)
})
