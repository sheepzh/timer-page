const SITE = "sc-domain:time-tracker-4-browser.app";
const BASE = "https://time-tracker-4-browser.app";
const REPORT_DIR = new URL("../.seo-reports/", import.meta.url);
const QUERY_TABLE_LIMIT = 200;
const COUNTRY_MIN_IMPS = 5;
const COMBINED_MIN_IMPS = 5;
const PAGE_TWO_MIN_IMPS = 50;
const LEAD_COUNTRY_MIN_IMPS = 50;
const BASELINE_MIN_IMPS = 50;
const EVAL_PRE_DAYS = 14;
const EVAL_INDEX_LAG_DAYS = 7;
const LOCALE_MATCH_MIN = 0.6;
const TARGET_DAILY_IMPS = 10000;
const TARGET_CTR = 0.02;

const COUNTRY_LANG: Record<string, string> = {
    usa: "en", gbr: "en", aus: "en", can: "en", ind: "en", sgp: "en", phl: "en", pak: "en", nga: "en", ken: "en", zaf: "en", irl: "en", nzl: "en",
    jpn: "ja",
    deu: "de", aut: "de", che: "de",
    fra: "fr", bel: "fr",
    rus: "ru", blr: "ru", kaz: "ru", kgz: "ru",
    ukr: "uk",
    esp: "es", mex: "es", arg: "es", col: "es", chl: "es", per: "es", ven: "es", ecu: "es", pry: "es",
    prt: "pt_PT",
    twn: "zh_TW", hkg: "zh_TW",
    chn: "zh_CN",
};

interface Row {
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position?: number;
}

const dateKey = (s: string): [number, number, number] => {
    const [y, m, d] = s.split("-").map(Number);
    return [y, m, d];
};

const cmpDate = (a: [number, number, number], b: [number, number, number]): number =>
    a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

async function accessToken(): Promise<string> {
    const { GSC_CLIENT_ID: id, GSC_CLIENT_SECRET: secret, GSC_REFRESH_TOKEN: refresh } = process.env;
    if (!id || !secret || !refresh) {
        throw new Error("GSC_CLIENT_ID / GSC_CLIENT_SECRET / GSC_REFRESH_TOKEN must all be set");
    }
    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: id,
            client_secret: secret,
            refresh_token: refresh,
            grant_type: "refresh_token",
        }),
    });
    if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { access_token?: string };
    if (!json.access_token) throw new Error("token exchange returned no access_token");
    return json.access_token;
}

async function query(token: string, dims: string[], start: string, end: string): Promise<Row[]> {
    const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
    const res = await fetch(url, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ startDate: start, endDate: end, dimensions: dims, rowLimit: 2500 }),
    });
    if (!res.ok) throw new Error(`searchAnalytics ${dims.join(",")} failed: ${res.status} ${await res.text()}`);
    const json = (await res.json()) as { rows?: Row[] };
    return json.rows ?? [];
}

const sum = (rows: Row[]) => ({
    clicks: rows.reduce((s, r) => s + r.clicks, 0),
    impressions: rows.reduce((s, r) => s + r.impressions, 0),
});

const weighted = (rows: Row[]): number => {
    const imps = rows.reduce((s, r) => s + r.impressions, 0);
    return imps ? rows.reduce((s, r) => s + (r.position ?? 0) * r.impressions, 0) / imps : 0;
};

const pct = (v: number): string => `${(v * 100).toFixed(2)}%`;
const signed = (v: number): string => `${v >= 0 ? "+" : ""}${v.toFixed(1)}`;
const pctChange = (a: number, b: number): number => (a > 0 ? ((b - a) / a) * 100 : 0);

const LANGS = ["en", "de", "es", "fr", "ja", "pt_PT", "ru", "uk", "zh_CN", "zh_TW"];

const langOf = (url: string): string | null => {
    const m = url.match(/^https:\/\/[^/]+\/([a-z]{2}(?:_[A-Z]{2})?)(?:\/|$)/);
    return m && LANGS.includes(m[1]) ? m[1] : null;
};

const SLASH_PATHS = [
    "/en/blog/best-time-tracking-chrome-extensions-2026",
    "/en/blog/how-to-track-time-spent-on-websites",
    "/en/blog/does-chrome-have-built-in-time-tracker",
    "/en/blog/webtime-tracker-alternatives",
    "/en/blog/screen-time-tracker-without-account",
    "/ru/blog/how-to-track-time-spent-on-websites",
];

const pathOf = (url: string): string => url.replace(BASE, "") || "/";
const normalizePage = (url: string): string => pathOf(url).replace(/\/+$/, "") || "/";
const cell = (s: string): string => s.replace(/\|/g, "\\|");
const shift = (day: string, delta: number): string => new Date(Date.parse(day) + delta * 86400000).toISOString().slice(0, 10);
const mde = (p: number, n: number): number => (p > 0 && n > 0 ? 2.8 * Math.sqrt((p * (1 - p) * 2) / n) * 100 : 0);

async function lastContentDeploy(): Promise<string | null> {
    try {
        const { execSync } = await import("node:child_process");
        const iso = execSync("git log -1 --format=%cI -- src .vitepress", { encoding: "utf8" }).trim();
        return iso ? iso.slice(0, 10) : null;
    } catch {
        return null;
    }
}
const byImps = (a: Row, b: Row): number => b.impressions - a.impressions;
const metricRow = (label: string, clicks: number, imps: number, wpos: number): string =>
    `| ${label} | ${clicks} | ${imps} | ${pct(imps ? clicks / imps : 0)} | ${wpos.toFixed(1)} |`;
const combinedRow = (r: Row): string =>
    `| ${cell(pathOf(r.keys[0]))} | ${cell(r.keys[1])} | ${cell(r.keys[2])} | ${r.clicks} | ${r.impressions} | ${pct(r.impressions ? r.clicks / r.impressions : 0)} | ${(r.position ?? 0).toFixed(1)} |`;

async function main(): Promise<void> {
    const token = await accessToken();
    const today = new Date();
    const end = new Date(today.getTime() - 2 * 86400000).toISOString().slice(0, 10);
    const start = new Date(today.getTime() - 37 * 86400000).toISOString().slice(0, 10);

    const daily = (await query(token, ["date"], start, end)).sort((a, b) => cmpDate(dateKey(a.keys[0]), dateKey(b.keys[0])));
    if (!daily.length) throw new Error("searchAnalytics returned no rows");
    const winStart = daily[0].keys[0];
    const winEnd = end;
    const dayCount = Math.round((Date.parse(winEnd) - Date.parse(winStart)) / 86400000) + 1;

    const [pages, queries, countries, devices, combined, pageQueries, appearances, branded] = await Promise.all([
        query(token, ["page"], winStart, winEnd),
        query(token, ["query"], winStart, winEnd),
        query(token, ["country"], winStart, winEnd),
        query(token, ["device"], winStart, winEnd),
        query(token, ["page", "query", "country"], winStart, winEnd),
        query(token, ["page", "query"], winStart, winEnd),
        query(token, ["searchAppearance"], winStart, winEnd),
        query(token, ["brandedClassification"], winStart, winEnd),
    ]);

    const totals = sum(pages);
    const windowCtr = totals.impressions ? totals.clicks / totals.impressions : 0;

    const deployDay = await lastContentDeploy();
    const preStart = deployDay ? shift(deployDay, -EVAL_PRE_DAYS) : "";
    const preEnd = deployDay ? shift(deployDay, -1) : "";
    const postStart = deployDay ? shift(deployDay, EVAL_INDEX_LAG_DAYS + 1) : "";
    const postEnd = deployDay ? shift(deployDay, EVAL_INDEX_LAG_DAYS + EVAL_PRE_DAYS) : "";
    const preStartClipped = deployDay && cmpDate(dateKey(preStart), dateKey(winStart)) < 0 ? winStart : preStart;
    const preEndClipped = deployDay && cmpDate(dateKey(preEnd), dateKey(winEnd)) > 0 ? winEnd : preEnd;
    const preRows =
        deployDay && cmpDate(dateKey(preStartClipped), dateKey(preEndClipped)) <= 0
            ? await query(token, ["date"], preStartClipped, preEndClipped)
            : [];
    const postEndClipped = deployDay && cmpDate(dateKey(postEnd), dateKey(winEnd)) > 0 ? winEnd : postEnd;
    const postRows =
        deployDay && cmpDate(dateKey(postStart), dateKey(winEnd)) <= 0 && cmpDate(dateKey(postStart), dateKey(postEndClipped)) <= 0
            ? await query(token, ["date"], postStart, postEndClipped)
            : [];
    const pre = sum(preRows);
    const post = sum(postRows);
    const preDays = preRows.length;
    const postDays = postRows.length;
    const preCtr = pre.impressions ? pre.clicks / pre.impressions : 0;
    const postCtr = post.impressions ? post.clicks / post.impressions : 0;
    const prePos = weighted(preRows);
    const postPos = weighted(postRows);
    const windowPos = weighted(pages);
    const curDailyImps = totals.impressions / dayCount;
    const curDailyClicks = totals.clicks / dayCount;

    const pageAgg = new Map<string, { imps: number; clicks: number; posSum: number }>();
    for (const r of pages) {
        const key = normalizePage(r.keys[0]);
        const a = pageAgg.get(key) ?? { imps: 0, clicks: 0, posSum: 0 };
        a.imps += r.impressions;
        a.clicks += r.clicks;
        a.posSum += (r.position ?? 0) * r.impressions;
        pageAgg.set(key, a);
    }
    const pagesNorm = [...pageAgg.entries()].map(([page, a]) => ({ page, imps: a.imps, clicks: a.clicks, pos: a.imps ? a.posSum / a.imps : 0 }));

    const bucketOf = (pos: number): string => (pos <= 3 ? "1-3" : pos <= 10 ? "4-10" : pos <= 20 ? "11-20" : "21+");
    const buckets = ["1-3", "4-10", "11-20", "21+"].map((name) => {
        const rows = pagesNorm.filter((r) => bucketOf(r.pos) === name);
        const imps = rows.reduce((s, r) => s + r.imps, 0);
        const clicks = rows.reduce((s, r) => s + r.clicks, 0);
        return { name, pageCount: rows.length, imps, clicks, ctr: imps ? clicks / imps : 0 };
    });
    const bucketCtr = new Map(buckets.map((b) => [b.name, b.ctr]));
    const thinBuckets = buckets.filter((b) => b.imps < BASELINE_MIN_IMPS).map((b) => b.name);
    const belowBucket = pagesNorm
        .filter((r) => r.imps >= BASELINE_MIN_IMPS)
        .map((r) => {
            const expected = bucketCtr.get(bucketOf(r.pos)) ?? 0;
            const ctr = r.imps ? r.clicks / r.imps : 0;
            return { ...r, ctr, expected, ratio: expected > 0 ? ctr / expected : 1 };
        })
        .filter((r) => r.expected > 0 && r.ratio < 0.6)
        .sort((a, b) => b.imps - a.imps)
        .slice(0, 15);

    const languages: Record<string, ReturnType<typeof sum> & { ctr: number; wpos: number }> = {};
    for (const lang of LANGS) {
        const rows = pages.filter((r) => langOf(r.keys[0]) === lang);
        const t = sum(rows);
        languages[lang] = { ...t, ctr: t.impressions ? t.clicks / t.impressions : 0, wpos: weighted(rows) };
    }

    const highPosZeroClick = pages.filter((r) => (r.position ?? 99) <= 10 && r.impressions >= 40 && r.clicks === 0);
    const homeZeroClick = pages.filter((r) => {
        const m = r.keys[0].match(/^https:\/\/[^/]+\/([a-z_]{2,5})\/$/);
        return !!m && r.impressions >= 30 && r.clicks === 0;
    });
    const zeroClickQueries = queries.filter((r) => r.impressions >= 100 && r.clicks === 0);
    const slashSplit: Record<string, { slash: number; plain: number }> = {};
    for (const p of SLASH_PATHS) {
        slashSplit[p] = {
            slash: pages.filter((r) => r.keys[0] === BASE + p + "/").reduce((s, r) => s + r.impressions, 0),
            plain: pages.filter((r) => r.keys[0] === BASE + p).reduce((s, r) => s + r.impressions, 0),
        };
    }

    const pagesSorted = [...pages].sort(byImps);
    const queriesSorted = [...queries].sort(byImps);
    const countriesSorted = [...countries].sort(byImps);
    const countriesMain = countriesSorted.filter((r) => r.impressions >= COUNTRY_MIN_IMPS);
    const countriesTail = countriesSorted.filter((r) => r.impressions < COUNTRY_MIN_IMPS);
    const combinedMain = combined.filter((r) => r.impressions >= COMBINED_MIN_IMPS).sort(byImps);
    const combinedImps = combined.reduce((s, r) => s + r.impressions, 0);

    const dailyImps = totals.impressions / dayCount;
    const dailyClicks = totals.clicks / dayCount;

    const pageTwoQueries = queries
        .filter((r) => (r.position ?? 0) >= 11 && (r.position ?? 0) <= 20 && r.impressions >= PAGE_TWO_MIN_IMPS)
        .sort(byImps);

    const queryPages = new Map<string, Map<string, number>>();
    for (const r of pageQueries) {
        const q = r.keys[1];
        const page = normalizePage(r.keys[0]);
        const m = queryPages.get(q) ?? new Map<string, number>();
        m.set(page, (m.get(page) ?? 0) + r.impressions);
        queryPages.set(q, m);
    }
    const cannibalized = [...queryPages.entries()]
        .filter(([, m]) => m.size >= 2)
        .map(([q, m]) => ({ q, pages: [...m.entries()].sort((a, b) => b[1] - a[1]), imps: [...m.values()].reduce((s, v) => s + v, 0) }))
        .sort((a, b) => b.imps - a.imps)
        .slice(0, 20);

    const countryStats = new Map<string, { imps: number; matched: number }>();
    for (const r of combined) {
        const country = r.keys[2];
        const expected = COUNTRY_LANG[country];
        const t = countryStats.get(country) ?? { imps: 0, matched: 0 };
        t.imps += r.impressions;
        if (expected && langOf(r.keys[0]) === expected) t.matched += r.impressions;
        countryStats.set(country, t);
    }
    const localeMismatch = [...countryStats.entries()]
        .filter(([c, t]) => COUNTRY_LANG[c] && t.imps >= LEAD_COUNTRY_MIN_IMPS && t.matched / t.imps < LOCALE_MATCH_MIN)
        .map(([c, t]) => ({ c, expected: COUNTRY_LANG[c], share: t.matched / t.imps, imps: t.imps }))
        .sort((a, b) => b.imps - a.imps);
    const devicesSorted = [...devices].sort(byImps);

    const L: string[] = [];
    L.push(`# SEO observe ${winStart} to ${winEnd} (${dayCount} days)`);
    L.push("");
    L.push(`Page dimension: clicks=${totals.clicks} impressions=${totals.impressions} CTR=${pct(windowCtr)}`);
    L.push("");
    L.push("## Summary");
    L.push("");
    L.push(`Target ${TARGET_DAILY_IMPS} daily impressions at ${pct(TARGET_CTR)} CTR. This window: ${dailyImps.toFixed(0)} per day at ${pct(windowCtr)}, which is ${pct(dailyImps / TARGET_DAILY_IMPS)} of the impression target and ${pct(windowCtr / TARGET_CTR)} of the CTR target.`);
    L.push("");
    L.push(`Section 2.1 hits — zero-click pages at position 10 or better: ${highPosZeroClick.length}; zero-click homepages: ${homeZeroClick.length}; pages under 60% of their rank bucket: ${belowBucket.length}.`);
    L.push("");
    if (deployDay) {
        const readyOn = shift(deployDay, EVAL_INDEX_LAG_DAYS + EVAL_PRE_DAYS + 2);
        L.push(`Deploy boundary ${deployDay}. Next readable comparison ${readyOn}; the deploy-window change column reads n/a until then.`);
    } else {
        L.push("No deploy boundary in the checkout history, so the deploy-window block carries no comparison.");
    }
    L.push("");
    L.push(`Leads for a human: ${pageTwoQueries.length} page-two queries, ${cannibalized.length} queries spread over two or more pages, ${localeMismatch.length} countries under the matching-language threshold. The tables behind these numbers sit under Details.`);
    L.push("");
    L.push("## Baseline");
    L.push("");
    L.push("CTR by position bucket over the same window. A page is judged against its own bucket, not the site average.");
    L.push("");
    L.push("| bucket | pages | impressions | clicks | CTR |");
    L.push("|---|---|---|---|---|");
    for (const b of buckets) L.push(`| ${b.name} | ${b.pageCount} | ${b.imps} | ${b.clicks} | ${pct(b.ctr)} |`);
    L.push("");
    if (thinBuckets.length) {
        L.push(`Bucket ${thinBuckets.join(", ")} carries fewer than ${BASELINE_MIN_IMPS} impressions, so its CTR cannot serve as a reference.`);
        L.push("");
    }
    L.push(`### Pages below 60% of their bucket CTR (imps >= ${BASELINE_MIN_IMPS})`);
    L.push("");
    if (belowBucket.length) {
        L.push("| page | position | impressions | clicks | CTR | bucket CTR | ratio |");
        L.push("|---|---|---|---|---|---|---|");
        for (const r of belowBucket) L.push(`| ${cell(r.page)} | ${r.pos.toFixed(1)} | ${r.imps} | ${r.clicks} | ${pct(r.ctr)} | ${pct(r.expected)} | ${r.ratio.toFixed(2)} |`);
    } else {
        L.push("- none");
    }
    L.push("");
    L.push("## Deploy window");
    L.push("");
    if (!deployDay) {
        L.push("No commit touching `src/` or `.vitepress/` exists in the checkout history, so this run has no deploy boundary. Read the baseline block only.");
        L.push("");
    } else {
        L.push(`Boundary ${deployDay}: commit date of the most recent commit touching \`src/\` or \`.vitepress/\`. A push after that date has no click evidence yet.`);
        L.push("");
        L.push(`Pre window ${preStartClipped} to ${preEnd} (${EVAL_PRE_DAYS} days): ${preDays} days carry data.`);
        L.push(`Post window ${postStart} to ${postEnd}, opened ${EVAL_INDEX_LAG_DAYS} days after the boundary so Google can recrawl and replace the snippet: ${postDays} days carry data.`);
        L.push("");
        const readable = preDays >= EVAL_PRE_DAYS && postDays >= EVAL_PRE_DAYS;
        const preImps = preDays ? pre.impressions / preDays : 0;
        const preClicks = preDays ? pre.clicks / preDays : 0;
        const postImps = postDays ? post.impressions / postDays : 0;
        const postClicks = postDays ? post.clicks / postDays : 0;
        const delta = (a: number, b: number, unit: string): string => (readable ? `${signed(unit === "pp" ? (b - a) * 100 : pctChange(a, b))}${unit}` : "n/a");
        L.push("| metric | pre per day | post per day | change |");
        L.push("|---|---|---|---|");
        L.push(`| impressions | ${preImps.toFixed(1)} | ${postDays ? postImps.toFixed(1) : "-"} | ${delta(preImps, postImps, "%")} |`);
        L.push(`| clicks | ${preClicks.toFixed(2)} | ${postDays ? postClicks.toFixed(2) : "-"} | ${delta(preClicks, postClicks, "%")} |`);
        L.push(`| CTR | ${preDays ? pct(preCtr) : "-"} | ${postDays ? pct(postCtr) : "-"} | ${delta(preCtr, postCtr, "pp")} |`);
        L.push(`| weighted position | ${preDays ? prePos.toFixed(1) : "-"} | ${postDays ? postPos.toFixed(1) : "-"} | ${readable ? signed(postPos - prePos) : "n/a"} |`);
        L.push("");
        if (!readable) {
            const short = EVAL_PRE_DAYS - Math.min(preDays, postDays);
            const readyOn = shift(deployDay, EVAL_INDEX_LAG_DAYS + EVAL_PRE_DAYS + 2);
            L.push(`The change column reads n/a until both sides hold ${EVAL_PRE_DAYS} days; the short side needs ${short} more days. First readable date: ${readyOn}, once the post window closes and the 2-day data latency has passed.`);
            L.push("");
        }
        L.push(`Each side is ${EVAL_PRE_DAYS} days, not 3. At ${curDailyImps.toFixed(0)} impressions per day a 3-day side carries about ${(curDailyImps * 3).toFixed(0)} impressions and its minimum detectable CTR difference is ${mde(windowCtr, curDailyImps * 3).toFixed(1)}pp, wider than the ${((TARGET_CTR - windowCtr) * 100).toFixed(2)}pp still needed to reach target; ${EVAL_PRE_DAYS} days brings it to ${mde(windowCtr, curDailyImps * EVAL_PRE_DAYS).toFixed(1)}pp.`);
        L.push("");
        L.push("This comparison is site level. A single page carries a few dozen impressions per day, so its own before and after stays under the detectable difference at any side length; page-level judgement comes from the baseline block.");
        L.push("");
    }

    L.push("## Target");
    L.push("");
    L.push(`Daily impressions ${TARGET_DAILY_IMPS}, CTR ${pct(TARGET_CTR)}.`);
    L.push("");
    L.push("| metric | window | per day | target per day | progress |");
    L.push("|---|---|---|---|---|");
    L.push(`| impressions | ${totals.impressions} | ${dailyImps.toFixed(0)} | ${TARGET_DAILY_IMPS} | ${pct(dailyImps / TARGET_DAILY_IMPS)} |`);
    L.push(`| clicks | ${totals.clicks} | ${dailyClicks.toFixed(1)} | ${(TARGET_DAILY_IMPS * TARGET_CTR).toFixed(0)} | ${pct(dailyClicks / (TARGET_DAILY_IMPS * TARGET_CTR))} |`);
    L.push(`| ctr | ${pct(windowCtr)} | - | ${pct(TARGET_CTR)} | ${pct(windowCtr / TARGET_CTR)} |`);
    L.push("");


    L.push("## Details (agent input)");
    L.push("");
    L.push("Everything below this line supports attribution and is collapsed in the issue body.");
    L.push("");

    L.push("## Leads (impression side, human decides)");
    L.push("");
    L.push(`### Page-two queries (position 11-20, imps >= ${PAGE_TWO_MIN_IMPS})`);
    L.push("");
    L.push("Moving one of these into the top ten multiplies its impressions. The loop does not rank pages; it reports them.");
    L.push("");
    for (const r of pageTwoQueries) {
        L.push(`- ${cell(r.keys[0])} imps=${r.impressions} pos=${(r.position ?? 0).toFixed(1)}`);
    }
    if (!pageTwoQueries.length) L.push("- none");
    L.push("");
    L.push("### Query cannibalization (one query, two or more pages)");
    L.push("");
    for (const c of cannibalized) {
        L.push(`- ${cell(c.q)} imps=${c.imps} pages: ${c.pages.map(([p, v]) => `${p}(${v})`).join(", ")}`);
    }
    if (!cannibalized.length) L.push("- none");
    L.push("");
    L.push(`### Locale mismatch (country imps >= ${LEAD_COUNTRY_MIN_IMPS}, under ${pct(LOCALE_MATCH_MIN)} landing in the expected locale)`);
    L.push("");
    L.push("Adding a locale is forbidden, so this lead resolves by publishing more inside an existing locale.");
    L.push("");
    for (const m of localeMismatch) {
        L.push(`- ${m.c} expected ${m.expected} share=${pct(m.share)} imps=${m.imps}`);
    }
    if (!localeMismatch.length) L.push("- none");
    L.push("");

    L.push("Dimension totals differ because GSC applies privacy filtering. The page dimension is the volume authority; the query dimension is for wording inspection only. Rows are sorted by impressions.");
    L.push("");
    L.push("## By language");
    L.push("");
    L.push("| lang | clicks | imps | ctr | wpos |");
    L.push("|---|---|---|---|---|");
    for (const [lang, v] of Object.entries(languages)) {
        L.push(metricRow(lang, v.clicks, v.impressions, v.wpos));
    }
    L.push("");
    L.push("## By device");
    L.push("");
    L.push("| device | clicks | imps | ctr | wpos |");
    L.push("|---|---|---|---|---|");
    for (const r of devicesSorted) {
        L.push(metricRow(cell(r.keys[0]), r.clicks, r.impressions, r.position ?? 0));
    }
    if (!devicesSorted.length) L.push("| none | 0 | 0 | 0.00% | 0.0 |");
    L.push("");
    L.push("## By country");
    L.push("");
    L.push(`Countries with fewer than ${COUNTRY_MIN_IMPS} impressions are folded into one row; they are long-tail noise for copy work.`);
    L.push("");
    L.push("| country | clicks | imps | ctr | wpos |");
    L.push("|---|---|---|---|---|");
    for (const r of countriesMain) {
        L.push(metricRow(cell(r.keys[0]), r.clicks, r.impressions, r.position ?? 0));
    }
    if (!countriesMain.length) L.push("| none | 0 | 0 | 0.00% | 0.0 |");
    if (countriesTail.length) {
        const t = sum(countriesTail);
        L.push(metricRow(`${countriesTail.length} countries below ${COUNTRY_MIN_IMPS} imps`, t.clicks, t.impressions, weighted(countriesTail)));
    }
    L.push("");

    L.push("## Triggered thresholds");
    L.push("");
    L.push("### High-position zero-click pages (pos<=10, imps>=40)");
    for (const r of highPosZeroClick) {
        L.push(`- ${pathOf(r.keys[0])} imps=${r.impressions} pos=${(r.position ?? 0).toFixed(1)}`);
    }
    if (!highPosZeroClick.length) L.push("- none");
    L.push("");
    L.push("### Language homepages with zero clicks (imps>=30)");
    for (const r of homeZeroClick) {
        L.push(`- ${pathOf(r.keys[0])} imps=${r.impressions} pos=${(r.position ?? 0).toFixed(1)}`);
    }
    if (!homeZeroClick.length) L.push("- none");
    L.push("");
    L.push("### High-impression zero-click query candidates (imps>=100)");
    L.push("Judge intent relevance per SKILL.md section 2: only queries unrelated to the product (such as trackerweb 4) are excluded from CTR; zero-click category queries are a position problem and stay in.");
    for (const r of zeroClickQueries) {
        L.push(`- ${cell(r.keys[0])} imps=${r.impressions} pos=${(r.position ?? 0).toFixed(1)}`);
    }
    if (!zeroClickQueries.length) L.push("- none");
    L.push("");
    L.push("### Trailing-slash split (record only, no action)");
    for (const [p, v] of Object.entries(slashSplit)) {
        L.push(`- ${p} slash=${v.slash} plain=${v.plain}`);
    }
    L.push("");

    L.push(`## Page table (${pagesSorted.length} pages)`);
    L.push("");
    L.push("| path | clicks | imps | ctr | pos |");
    L.push("|---|---|---|---|---|");
    for (const r of pagesSorted) {
        L.push(metricRow(cell(pathOf(r.keys[0])), r.clicks, r.impressions, r.position ?? 0));
    }
    L.push("");

    const shown = queriesSorted.slice(0, QUERY_TABLE_LIMIT);
    L.push(shown.length === queriesSorted.length
        ? `## Query table (${shown.length} queries)`
        : `## Query table (top ${shown.length} of ${queriesSorted.length} by impressions)`);
    L.push("");
    L.push("| query | clicks | imps | ctr | pos |");
    L.push("|---|---|---|---|---|");
    for (const r of shown) {
        L.push(metricRow(cell(r.keys[0]), r.clicks, r.impressions, r.position ?? 0));
    }
    if (!shown.length) L.push("| none | 0 | 0 | 0.00% | 0.0 |");
    L.push("");

    L.push(`## Page x query x country (imps >= ${COMBINED_MIN_IMPS})`);
    L.push("");
    L.push(`Multi-dimension results are filtered harder than single dimensions: this table accounts for ${combinedImps} of ${totals.impressions} page-dimension impressions. Use it to attribute impressions to pages and queries, never as a volume total.`);
    L.push("");
    L.push("| page | query | country | clicks | imps | ctr | pos |");
    L.push("|---|---|---|---|---|---|---|");
    for (const r of combinedMain) L.push(combinedRow(r));
    if (!combinedMain.length) L.push("| none | - | - | 0 | 0 | 0.00% | 0.0 |");
    L.push("");

    L.push("## Search appearance");
    L.push("");
    L.push("| type | clicks | imps | ctr | pos |");
    L.push("|---|---|---|---|---|");
    for (const r of [...appearances].sort(byImps)) L.push(metricRow(cell(r.keys[0]), r.clicks, r.impressions, r.position ?? 0));
    if (!appearances.length) L.push("| none | 0 | 0 | 0.00% | 0.0 |");
    L.push("");

    L.push("## Branded classification");
    L.push("");
    L.push("| class | clicks | imps | ctr | pos |");
    L.push("|---|---|---|---|---|");
    for (const r of [...branded].sort(byImps)) L.push(metricRow(cell(r.keys[0]), r.clicks, r.impressions, r.position ?? 0));
    if (!branded.length) L.push("| none | 0 | 0 | 0.00% | 0.0 |");
    L.push("");

    L.push("Attribution: clicks dated before the most recent deployment are unrelated to that deployment. Improvements within 3 days after a deployment count as natural rank movement or URL-form convergence, not as copy changes.");
    L.push("");

    if (!process.env.SEO_OBSERVE_NO_WRITE) {
        const stamp = today.toISOString().slice(0, 10);
        const { mkdir, writeFile } = await import("node:fs/promises");
        await mkdir(REPORT_DIR, { recursive: true });
        await writeFile(new URL(`${stamp}.md`, REPORT_DIR), L.join("\n"));
    }
    process.stdout.write(L.join("\n"));
}

main().catch((e) => {
    process.stderr.write(`${e instanceof Error ? e.message : String(e)}\n`);
    process.exit(1);
});
