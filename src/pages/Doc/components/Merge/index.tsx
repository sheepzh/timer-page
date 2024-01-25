/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent, h } from 'vue'
import { SiteExampleTable, SourceTable, TargetTable } from './tables'
import { t } from '@/i18n'
import { tN } from '@/i18n/i18n-vue'
import { RuleTag } from './tags'
import './merge.sass'

const _default = defineComponent(() => {
    return () => (
        <>
            <p>
                {tN(msg => msg.merge.p1, {
                    demo1: <i>www.github.com</i>,
                    demo2: <i>gist.github.com</i>,
                })}
            </p>
            <p>
                {tN(msg => msg.merge.p2, {
                    link: '', // appLink(MERGE_ROUTE)
                })}
            </p>
            <h2>{t(msg => msg.merge.lookTitle)}</h2>
            <p>
                {tN(msg => msg.merge.p3, {
                    demo: <RuleTag origin="gist.github.com" />,
                })}
            </p>
            <h2>{t(msg => msg.merge.source.title)}</h2>
            <p>{t(msg => msg.merge.source.p1)}</p>
            <SourceTable />
            <h2>{t(msg => msg.merge.target.title)}</h2>
            <p>{t(msg => msg.merge.target.p1)}</p>
            <TargetTable />
            <p>{t(msg => msg.merge.target.p2)}</p>
            <SiteExampleTable />
        </>
    )
})

export default _default