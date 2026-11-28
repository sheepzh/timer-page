---
name: seo-governance
description: Governance loop for the timer-page site (time-tracker-4-browser.app), targeting 10,000 daily impressions at 2% CTR. Runs every 5 days: observe Search Console data, apply whitelisted copy and structured-data optimizations, publish through a guarded pull request, and report impression leads it cannot act on. Covers GSC calibration, multilingual copy rules, product-fact verification entry points, publish guardrails and known exceptions. Use when the seo-governance workflow triggers or when site search performance governance is requested.
---

# SEO Governance Loop

## 0. Objective

Daily impressions 10,000 and CTR at least 2%. The measured baseline is 7,900 impressions over 36 days, which is 219 per day, at 1.20% CTR. The gap is 46x on impressions and 76x on clicks.

The impressions half is the hard half. A rank gain that moves a page from page two into the top ten multiplies its impressions several times; a copy edit moves CTR by a fraction of a point. A round that only edits descriptions is a legitimate round, but it is never a round that closes the gap. Expect the loop to report "no whitelisted action this round" as often as it edits, and to name every impression lead it found whether or not it could act on it.

Two constraints are hard and neither is overridable by a trigger threshold:

1. No new locale. The ten locales are fixed. Impression growth comes from more pages and better ranks inside them, never from adding a language.
2. No claim the product does not support. Section 5 lists the verification entry points. A sentence that cannot be verified there does not ship, whatever search volume it could capture.

The loop creates no pages. When the impression side needs a page that does not exist, the loop names it as a lead and a human decides.

## 0.1 Loop definition and pipeline

Trigger: `.github/workflows/seo-governance.yml`, cron at 02:00 UTC on the 1st, 6th, 11th, 16th, 21st and 26th of each month, plus workflow_dispatch.

Pipeline, in order, with artifact destinations:

1. observe: the observe job of seo-governance.yml runs `script/seo-observe.ts`. GSC credentials (client id, client secret, refresh token) are injected as repository secrets into that job's env and never leave it. The script calls searchAnalytics for eight dimension sets in one pass: date, page, query, country, device, page x query x country, searchAppearance and brandedClassification, and writes a single file `.seo-reports/<UTC date>.md`, which the job uploads as a workflow artifact. The report is never committed: it exists only inside the run and, after step 2, inside the issue body. The window is a fixed 36-day span ending 2 days behind today, which is the data latency; the span is requested explicitly rather than left to the API, so the comparison basis does not drift as data accumulates. Every comparison stays inside one report: a page's CTR is judged against the bucket of pages at a similar rank, and the site is compared across the most recent deploy boundary read from git history. No cross-run snapshot is kept.
2. optimize: the next job downloads that artifact and creates a governance issue with `gh issue create --assignee Copilot`, inlining the whole report in a collapsed block of the body alongside the skill path. The GitHub built-in Copilot coding agent picks it up in its hosted environment, reads this skill (`.github/skills/` is the native repository skill location for Copilot) plus the report, edits files according to the thresholds in section 2, and opens a pull request whose title starts with `[seo-governance]`. The agent environment contains GitHub built-in skills and the GitHub MCP only; no third-party agent action is referenced and no GSC credential is exposed to it. If no threshold is hit, the agent closes the issue without a pull request.
3. publish: `.github/workflows/seo-governance-guard.yml` runs build and the whitelist guard on the pull request as a required status check, then enables `gh pr merge --auto --squash`. After merge into main, Vercel deploys automatically; the deployment is the final consumer of the loop. Each run carries its own reference: the rank-bucket table is rebuilt from the same window, so no stored baseline can go stale, and the deploy-window block anchors its pre and post sides on the most recent commit touching `src/` or `.vitepress/`, skipping 7 days after that boundary before the post side opens.

Any failing step stops the loop: observe failure creates no issue; guard failure blocks the merge; when auto-merge is unavailable the pull request waits for a human merge and the loop never pushes to main around the check.

## 0.2 Preflight: abort before spending an agent session

The workflow already fails fast before the agent starts: a missing or rejected GSC credential throws in `script/seo-observe.ts` and exits 1, `optimize` needs `observe`, and `optimize` checks the report before creating the issue. This section covers the remaining window, the moment the agent is already running and can still burn a session on an environment that cannot produce a valid pull request.

Evaluate in order, abort at the first failure:

| # | Check | Command |
|---|---|---|
| 1 | The issue carries an observation report | the body contains a collapsed block that starts with `# SEO observe ` |
| 2 | That block carries page totals and both reference blocks | `Page dimension:`, `## Baseline` and `## Deploy window` all appear inside it |
| 3 | Node responds | `node -v` |
| 4 | Dependencies install | `npm install --no-audit --no-fund`; the repository carries no lockfile, so `npm ci` fails by design |
| 5 | Build is green before any edit | `npm run build` |

Rules that override everything else in this skill:

1. On abort, close the issue with one comment naming the failed check and the raw error, then stop. No pull request, no file edit, no retry, no alternative approach.
2. Abort immediately. Do not read sections 2 to 7, do not fetch the site, do not inspect search performance, do not draft a plan. A session that continues past a failed preflight produces a conclusion built on nothing.
3. Never repair the environment inside the loop. No dependency pinning, no edits to `package.json`, `package-lock.json`, `.nvmrc`, `vercel.json` or either workflow. `npm install` is the sanctioned install step because the repository carries no lockfile; generating a lockfile from inside the loop is the kind of tooling change this rule forbids. Those paths are outside section 3, and a green build from altered tooling is not evidence that the site builds.
4. Never fetch data yourself. The report is the only input. The agent environment holds no GSC credential, so any attempt ends in 401 after the whole session has been spent.
5. Check 5 protects the loop as much as the build: if `main` was already red, every governance pull request fails on grounds unrelated to copy, and the failure gets misread as the previous round's copy change.

## 1. Data calibration for observe

The GSC property is `sc-domain:time-tracker-4-browser.app`. Four measured facts; violating any of them produces wrong conclusions:

1. Two boundaries with two different causes. The end is data latency: the newest available date trails today by 2 days, so the script requests up to today minus 2. The start is a fixed 36-day span from there. Do not request a longer range expecting the API to truncate it, because it does not truncate; it returns whatever exists. This property has no data before 2026-10-19, so an empty result for an earlier range means the site had no impressions then, not that the request was rejected. Before comparing periods, print the date dimension to confirm the real start and end, then compare daily averages, never raw totals.
2. Date strings differ by source: the API returns ISO `2026-11-25`, CSV exports return `2026/10/1`. The CSV form breaks lexicographic sorting (10/1 sorts before 9/9), so parse to (y, m, d) tuples before sorting regardless of where the dates came from.
3. Totals differ across dimensions because of privacy filtering, and the gap widens with every dimension added to the group. In one measured window the page dimension returned 7,900 impressions while page x query x country returned 2,628, about a third. The page dimension has the fullest coverage and is the only volume authority; every multi-dimension table is for attribution only, and the report states how much of the page dimension it covers. The query dimension is for wording inspection, never for totals.
4. Attribution must check three timestamps together: deployment time, window end date, and the Google recrawl plus SERP snapshot cycle (about one week). Clicks dated before a deployment are unrelated to it; improvements within 3 days after a deployment are reported as natural rank movement or URL-form convergence, not as copy changes.

## 2. Metrics and trigger thresholds

Thresholds are grouped by which target number they move. The optimize phase edits only in group 2.1. Group 2.2 produces leads that a human acts on; the loop is not allowed to act on them by itself.

### 2.1 Edits the loop may make (CTR side)

| Metric | Trigger | Action |
|---|---|---|
| Below-bucket CTR | page carries >= 50 impressions and its CTR is under 60% of its rank bucket, in the baseline block | Edit that page's frontmatter title or description per section 4. Broadest trigger: a page at position 9 is judged against the 4-10 bucket, never against the site average |
| High-position zero-click page | position <= 10 and impressions >= 40 and clicks = 0 in the window | Edit that page's frontmatter title or description per section 4 |
| High-impression zero-click query | impressions >= 100 and clicks = 0 | Judge intent relevance first. A query unrelated to the product (known instance: `trackerweb 4`) is excluded from CTR computation and gets no action. A zero-click category query that is relevant is a position problem and stays in |
| Language homepage zero-click | that language's homepage has impressions >= 30 and clicks = 0 | Edit that locale's description and the homepage hero tagline |
| CTR drop | window CTR well under the pre-window CTR while position holds steady | Diagnose only, no edits; list position and wording changes in the report. Skip this row while the deploy-window change column reads n/a |

### 2.2 Leads the loop reports but cannot act on (impression side)

These carry the 46x half of the target. The loop has no authority over any of them; the report names them so a human can decide.

| Lead | Trigger | What the report states |
|---|---|---|
| Page-two query | a query at position 11-20 with impressions >= 50 | The query, the page ranking for it, its position and impressions. Moving one of these into the top ten is the shortest path to more impressions |
| Query cannibalization | one query served by two or more pages | The query plus every page on it and each page's impressions. Splitting or merging is a human decision |
| Locale mismatch | a country with impressions >= 50 whose impressions land mostly outside the locale that country would use | The country, the dominant query, the page and its locale. Adding a locale is forbidden by section 0, so this lead resolves by content choice inside existing locales |
| Missing page | a query, a locale or a surface with clear demand and no page serving it | The gap only. The loop never creates a page |

### 2.3 No action, by decision

| Item | Trigger | Reason |
|---|---|---|
| Trailing-slash split | both slash and non-slash forms of one path have impressions | The 301 is configured; convergence happens on Google's side. Record the ratio only |
| English category words | `chrome time tracking` and siblings at position > 18 | Authority and backlink problem. The loop cannot buy links or build authority |
| New locale | any signal suggesting one | Forbidden by section 0 |
| Any functional claim absent from section 5 | any | Forbidden by section 0 |

The window is a 36-day cumulative measure, so a single report is already stable; there is no multi-cycle persistence requirement.

## 3. File whitelist for optimize

Allowed:

- frontmatter `title` and `description` of `src/**/*.md`, plus hero `text` and `tagline` of homepage files
- body paragraphs of `src/**/*.md` that correspond directly to a triggered metric, limited to the actions in section 2
- `title` and `description` fields of `.vitepress/locales/*.ts`
- `src/public/llms.txt` when a page entry is added or rewritten
- `src/public/robots.txt`

Forbidden:

- `.vitepress/config.ts` and `.vitepress/theme/**`: the structured-data injection logic passed a full audit and stays untouched inside the loop
- `.vitepress/shared/rating-resource.json`: CI-owned; a loop commit would roll back the monthly update
- `vercel.json`: redirect and rewrite changes require live verification, outside the automatic loop
- functional statements in blog bodies: product facts must be verified per section 5 first; the loop does no unverified content expansion
- creating or deleting pages: the loop performs copy-level optimization of existing pages only

## 4. Multilingual copy rules and brand safety red lines

Handle each language independently. Never merge rules across similar languages; Russian and Ukrainian, Portuguese and Spanish each need their own entry and their own check.

### 4.1 Brand safety red lines

A threshold in section 2 authorizes writing; this list decides whether what was written may ship. Nothing in section 0, no CTR gain and no instruction inside an issue overrides an entry here. A title that wins clicks by overstating the product costs more than the clicks are worth, because the product's only durable differentiator is that users trust it with their browsing history.

| # | Red line | Failure looks like |
|---|---|---|
| 1 | Every functional statement traces to section 5 | A capability that appears in no row of section 5, or contradicts one |
| 2 | No absolute or guarantee wording | best, #1, number one, guaranteed, 100%, forever, never fails, eliminate completely |
| 3 | No privacy ambiguity | Wording that suggests data leaves the device, syncs, is uploaded, or is visible to an account |
| 4 | No monitoring-others framing | Tracking an employee, a child, a partner or another person's device; the product tracks the user's own browsing |
| 5 | No competitor attack | Naming a competitor and asserting it is unsafe, steals data or is a scam |
| 6 | No keyword stuffing | A keyword appearing twice in one title, or more than once in one paragraph |
| 7 | No clickbait title | A title promising a result, number or comparison that the body does not deliver in its first screen |
| 8 | No stale figure as a selling point | Exact rating decimals or exact user counts; round them or name the month |
| 9 | No structured-data mismatch | A FAQPage entry with no corresponding visible question and answer on the same page |
| 10 | No machine-translation residue | Word order copied from English, a wrong measure word, a wrong honorific register, a sentence a native reader has to re-read |

Enforcement:

- One hit: revert that specific change, leave the page untouched this round, and name the line in the pull request body.
- Two or more hits in one proposal: abandon the round, open no pull request, report the failure.
- Cannot decide whether a sentence crosses a line: do not ship it. Ambiguity is a no.

These red lines outrank section 2. A threshold says a page may be edited; this section decides whether the result may be published.

### 4.2 Register and variant

| Language | Rule |
|---|---|
| de | du form. Any Sie/Ihnen/Ihre is a violation |
| es | tú form. Any Realice/analice usted form is a violation |
| fr | vous form |
| pt_PT | European Portuguese. Any você/seus/tela/arquivo/baixar Brazilian form is a violation |
| ru / uk | вы and ви respectively; never share word forms |
| zh_TW | Traditional, terms 「擴充功能」「資料」「帳號」「設定», full-width punctuation inside sentences |
| zh_CN | Simplified, terms 「插件」「数据」「账号」 |
| ja | です・ます form, full-width punctuation |

### 4.3 Length and format

- frontmatter description at most 165 characters, no double quote inside the value; a value containing `: ` (colon plus space) must be wrapped in double quotes or the YAML parse fails and the build breaks
- a locale title also serves as the suffix of every page title in that locale; confirm the suffix stays acceptable before changing a locale title
- never substitute ASCII approximations for diacritics (de ue/oe/ae, es n for ñ, tr c/s/g for ç/ş/ğ); run a residue scan for the target language after generation
- full-width CJK punctuation must be inspected and replaced by Unicode code point (python ord and \uff0c-style escapes), never by terminal-echoed literals

### 4.4 Style

- the opening line must not restate fields already rendered above it on the same page (title, rating, user count)
- no three-item verb parallel; use two or four items, or a statement plus one concrete fact
- no information-free marketing phrases (high-precision engine, reclaim your focus, break the cycle, maximize deep work)
- feature names must come from the extension UI strings, see section 5

## 5. Product fact verification entry points

Verify every functional statement in `~/workspace/tt4b` (extension repository) before writing it. The authoritative source for user-visible names is `src/i18n/message/**/*-resource.json`:

| Concept | Correct name (en / zh_CN) |
|---|---|
| subpage-level statistics | subpage / 子页面 (type name is virtual, but the user-visible name is not virtual site) |
| site grouping | Site Category / 网站类目 (not site tags) |
| domain merging | Merge-site Rules / 网站合并 |
| focus feature | Focus & Pomodoro / 专注模式 & 番茄钟 (Deep Focus, Pomodoro; policies Allow only, Block) |
| limit types | Daily limit, Weekly limit, Time limit per visit, Blocked periods |
| unlock verification | password, custom question, timed exact input, 6-digit 2FA code, digits of the decimal part of pi, confession sentence |
| scores | Busyness and Focusness. Never write "no productivity score"; the accurate distinction is that the scores describe browsing patterns and never label a site productive or distracting |
| whitelist | Whitelist; whitelisted sites are neither tracked nor blocked |
| data password | required before viewing data since v4.7.0 |

Forbidden statements: automatic productivity scoring or automatic site categorization, cloud sync or our servers, desktop app tracking, Chrome on Android support, custom day-start or automatic cleanup, exact rating numbers and user counts (they expire; use rounded values or state the month).

Source locations for capability boundaries: limit processors in `src/content-script/limit/processor/` (four files); import formats in `Migration/.../ImportOtherButton/types.ts` (webtime_tracker, web_activity_time_tracker, history_trends_unlimited); export in `Record/file-export.ts` (JSON and CSV); backup targets in `background/service/backup/` (Gist, WebDAV, Obsidian Local REST API); `chrome.storage.sync` covers settings only, browsing data never leaves the device.

## 6. Publish guardrails

1. The guard workflow runs `npm install --no-audit --no-fund && npm run build` on pull requests whose title contains `[seo-governance]` or whose head branch starts with `copilot/seo-governance`. YAML frontmatter errors surface here; a build failure fails the check and blocks the merge.
2. The guard workflow checks that every path in `git diff --name-only base...HEAD` falls inside the section 3 whitelist; any violation fails the check.
3. The guard workflow rejects `.vitepress/shared/rating-resource.json` outright.
4. With all checks green the guard workflow enables auto-merge (squash). When the repository has auto-merge disabled the step degrades to a notice and the pull request waits for a human merge; the loop never pushes to main around the check.
5. Report commits from the observe job use the github-actions[bot] identity, matching the update-rating.yml precedent; local operations use the repository-level git config identity (sheepzh) and never modify git config.
6. The pull request body must list each applied action together with the threshold that triggered it, for human spot checks. Reports and pull requests are the only auditable outputs of the loop.
7. Clicks are attributed by comparing their date against the deployment time: clicks dated before a deployment cannot be its result, and the deployment time is read from the commit history on each run rather than stored. The boundary is the commit date of the most recent commit touching `src/` or `.vitepress/`, because workflow-only commits deploy nothing the crawler can see. The observe job checks out full history for this reason; a shallow clone makes the boundary equal to HEAD and the block meaningless.
8. A pull request that touches a locale outside the ten in section 0, or adds a locale directory, is a violation whatever its diff size. Section 3's whitelist permits any path under `src/`; only this rule keeps a new language out.

## 7. Known exceptions and out-of-loop decisions

Every measurement lives in the report of its own run. No reference number is recorded here, because each run pulls a fresh 36-day window and any figure written into this file expires within weeks. What belongs here is the judgment that pulling data cannot produce: items already diagnosed, and items the loop has no authority over.

Already diagnosed, no action:

1. `trackerweb 4`: Belarusian and Dutch users landing on the English homepage for a query unrelated to the product. Invalid exposure, excluded from CTR computation per section 2.
2. English category words (chrome time tracking and siblings) sit beyond position 18 with zero clicks. Authority and backlink problem, outside a copy-level loop.
3. Trailing-slash convergence: the 301 is configured and correct; the remaining split resolves on the Google side. Record the ratio only, do not re-plumb URLs.

Requires a human decision, the loop cannot act:

4. French market grows faster than any other locale and the site has no `/fr/blog` page. Creating pages is outside section 3.
5. A majority of pages carry titles longer than 60 characters. A locale title also forms the suffix of every page title in that locale, so bulk shortening needs a suffix decision before any batch edit.
6. CWS detailed description is editable only per locale in the Developer Dashboard; the Publish API exposes no method for it. Store copy stays outside the loop.
7. A page that never appears in the page table is unclassified, not unindexed. Telling those apart needs URL Inspection, which observe does not call, so the loop makes no index-coverage claim in either direction.

## 8. Report format

`script/seo-observe.ts` writes `.seo-reports/<date>.md` on the runner. The observe job uploads it as an artifact, the optimize job inlines it into the issue body, and the issue is where the agent reads it. The file is never committed, so no report enters the repository history and no retention policy is needed. One report per run, no companion snapshot.

The report is split at one marker, `## Details (agent input)`. Above the marker sits what a reviewer reads: the header line with window start, end and day count; page-dimension totals and CTR; the summary block (progress against both targets, the count of section 2.1 hits, the deploy boundary with its next readable date, and the size of every lead category); the baseline block (CTR per rank bucket, plus every page under 60% of its own bucket with at least 50 impressions); the deploy-window block (daily averages for 14 days before the most recent content deploy and 14 days starting 7 days after it, change column n/a until both sides are full); the target block. Below the marker sits what the agent reads for attribution: the leads block (page-two queries, query cannibalization, locale mismatch), the by-language, by-device and by-country tables, the triggered threshold lists, the full page table, the query table, the page x query x country table, the search appearance table and the branded classification table. The full tables exist so the agent can attribute impressions to a page, a query and a country without guessing; that is why it needs no GSC access of its own.

The issue body prints everything above the marker as plain text and puts everything below it inside one collapsed `<details>` block. A reviewer sees about 3.5 KB and the agent receives the whole file. The summary block has to stay readable without expanding anything: it repeats the target progress, the hit counts and the next readable date, so a reviewer can tell whether this round will edit anything without opening a single table.

The target block is context. It decides nothing: a progress figure of 2% does not authorize a bigger edit, and a large change in the deploy-window block does not license a claim of improvement, because section 6 and the attribution rule still apply.

The baseline block is the baseline. The first row of the section 2.1 table reads it, and every page it lists is edited against its own bucket. The deploy-window block answers "did the last deploy move the site" for a human reading the issue: pre side 14 days ending the day before the boundary, post side 14 days opening 7 days after it, change column n/a until both sides are full. The loop never edits on it. Fourteen days per side is the smallest window whose minimum detectable CTR difference sits below the gap to target at the site's current volume; a 3-day side detects roughly twice the gap and reports noise as movement.

The leads block is output. Carry it into the pull request body under a `Leads` heading, unchanged, even when the round makes no edits. A round with zero edits and three leads is a successful round; a round that drops the leads to look productive is not.

Cannibalization is computed after trailing-slash normalization, so two rows that differ only by a trailing slash are one page, not two competing pages.

Rows are filtered by impressions before rendering: countries under 5, combinations under 5. Those rows are noise for copy work. The page and query tables are not filtered by value, only the query table is capped at 200 rows by impressions.

The action list and the attribution statement belong to the pull request body, not to the report: which action was applied, which threshold justified it, and the deployment time the next run will measure it against. The body also records the 4.1 check per edited file and names any red line that forced a revert, so the next reader can see what was refused as well as what was shipped.
