/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from '@/i18n'
import { computeMergeTxt, computeMergeType } from '@/utils/merge'
import { ElTag } from 'element-plus'
import { defineComponent } from 'vue'

export const RuleTag = defineComponent({
    props: {
        origin: String,
        merged: [String, Number],
    },
    setup: ({ origin, merged = '' }) => {
        return () => (
            <ElTag type={computeMergeType(merged)} size="small">
                {computeMergeTxt(origin, merged, (finder, param) =>
                    t(msg => finder(msg.mergeCommon), param)
                )}
            </ElTag>
        )
    },
})

export const SiteTag = defineComponent({
    props: {
        site: String,
    },
    setup: ({ site }) => {
        return () => (
            <ElTag type="info" size="small">
                {site}
            </ElTag>
        )
    },
})
