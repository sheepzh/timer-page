/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { VNode } from 'vue'
import type { ElTableRowScope } from '@/typings/element'

import { t, type I18nKey } from '@/i18n'
import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent } from 'vue'
import { RuleTag, SiteTag } from './tags'
import { tN } from '@/i18n/i18n-vue'

type _SourceExample = {
    source: string
    examples: string[] | I18nKey
}

const SOURCE_EXAMPLES: _SourceExample[] = [
    {
        source: 'www.google.com',
        examples: msg => msg.merge.source.only,
    },
    {
        source: 'www.google.com.*',
        examples: ['www.google.com.hk', 'www.google.com.au'],
    },
    {
        source: '**.mit.edu',
        examples: [
            'www.mit.edu',
            'libraries.mit.edu',
            'web.mit.edu',
            'foo.bar.mit.edu',
        ],
    },
]

const renderSourceExample = (row: _SourceExample) => {
    const { source, examples } = row
    if (typeof examples === 'function') {
        return (
            <span>{tN(examples, { source: <SiteTag site={source} /> })}</span>
        )
    }
    const exampleTags = examples.map(site => <SiteTag site={source} />)
    return <div class="source-example-cell">{exampleTags}</div>
}

export const SourceTable = defineComponent(() => {
    return () => (
        <ElTable data={SOURCE_EXAMPLES} border fit>
            <ElTableColumn
                label={t(msg => msg.merge.sourceCol)}
                width={240}
                v-slots={({ row }: ElTableRowScope<_SourceExample>) =>
                    row.source
                }
            />
            <ElTableColumn
                label={t(msg => msg.merge.source.exampleCol)}
                v-slots={({ row }: ElTableRowScope<_SourceExample>) =>
                    renderSourceExample(row)
                }
            />
        </ElTable>
    )
})

type _RuleExample = {
    source: string
    target?: string | number
}

type _TargetExample = _RuleExample & {
    remark: I18nKey
}

type _SiteExample = {
    original: string
    ruleIdx?: number | number[]
    remark?: string | (VNode | string)[]
}

function computeTarget(val: undefined | string | number): string | number {
    return typeof val === 'number' ? val + 1 : val || ''
}

const TARGET_EXAMPLES: _TargetExample[] = [
    {
        source: 'www.google.com.*',
        target: 'google.com',
        remark: msg => msg.merge.target.remark.spec,
    },
    {
        source: 'www.google.com.hk',
        remark: msg => msg.merge.target.remark.blank,
    },
    {
        source: '**.*.google.com',
        target: 2,
        remark: msg => msg.merge.target.remark.integer,
    },
]

export const TargetTable = defineComponent(() => {
    return () => (
        <ElTable data={TARGET_EXAMPLES} border fit>
            <ElTableColumn
                label={t(msg => msg.merge.sourceCol)}
                width={180}
                v-slots={({ row }: ElTableRowScope<_TargetExample>) =>
                    row.source
                }
            />
            <ElTableColumn
                label={t(msg => msg.merge.targetCol)}
                width={150}
                v-slots={({
                    row: { target },
                }: ElTableRowScope<_TargetExample>) => computeTarget(target)}
            />
            <ElTableColumn
                label={t(msg => msg.merge.target.lookCol)}
                width={240}
                v-slots={({
                    row: { source, target },
                }: ElTableRowScope<_TargetExample>) => (
                    <RuleTag origin={source} merged={target} />
                )}
            />
            <ElTableColumn
                label={t(msg => msg.merge.remarkCol)}
                minWidth={300}
                v-slots={({
                    row: { source, target, remark },
                }: ElTableRowScope<_TargetExample>) =>
                    tN(remark, {
                        source: <i>{source}</i>,
                        target: <i>{computeTarget(target)}</i>,
                    })
                }
            />
        </ElTable>
    )
})

const MERGER = {
    merge: (val: string) => val,
}

const SITE_EXAMPLES: _SiteExample[] = [
    {
        original: 'www.google.com.au',
        ruleIdx: 0,
    },
    {
        original: 'www.google.com.pt',
        ruleIdx: 0,
    },
    {
        original: 'www.google.com.hk',
        ruleIdx: [0, 1],
        remark: t(msg => msg.merge.target.remark.specFirst),
    },
    {
        original: 'es.news.google.com',
        ruleIdx: [2],
    },
    {
        original: 'a.b.c.photos.google.com',
        ruleIdx: [2],
    },
    {
        original: 'pass.hust.edu.cn',
        remark: tN(msg => msg.merge.target.remark.miss, {
            link: '', // link(PSL_HOMEPAGE),
        }),
    },
]

function renderHitCell({ ruleIdx }: _SiteExample): string | VNode {
    const idxType = typeof ruleIdx
    if (idxType === 'undefined') {
        return ''
    } else if (idxType === 'number') {
        const rule = TARGET_EXAMPLES[ruleIdx as number]
        return rule ? <RuleTag origin={rule.source} merged={rule.target} /> : ''
    } else {
        return (
            <span>
                {(ruleIdx as number[])
                    .map(idx => TARGET_EXAMPLES[idx])
                    .filter(a => !!a)
                    .map(rule => (
                        <RuleTag origin={rule.source} merged={rule.target} />
                    ))}
            </span>
        )
    }
}

export const SiteExampleTable = defineComponent(() => {
    return () => (
        <ElTable data={SITE_EXAMPLES} border fit>
            <ElTableColumn
                label={t(msg => msg.merge.target.originalCol)}
                formatter={(row: _SiteExample) => row.original}
                width={195}
            />
            <ElTableColumn
                label={t(msg => msg.merge.target.mergedCol)}
                formatter={(row: _SiteExample) => MERGER.merge(row.original)}
                width={160}
            />
            <ElTableColumn
                label={t(msg => msg.merge.target.hitCol)}
                width={238}
                v-slots={({ row }: ElTableRowScope<_SiteExample>) =>
                    renderHitCell(row)
                }
            />
            <ElTableColumn
                label={t(msg => msg.merge.remarkCol)}
                v-slots={({ row }: ElTableRowScope<_SiteExample>) => row.remark}
            />
        </ElTable>
    )
})
