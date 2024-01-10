/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { I18nKey } from '@/i18n'

import { tN } from '@/i18n/i18n-vue'
import { defineComponent, type PropType } from 'vue'

type ListItem = [I18nKey, any] | I18nKey

export default defineComponent({
    props: {
        items: Array as PropType<ListItem[]>,
    },
    setup: ({ items }) => {
        const children = items?.map(item => {
            let i18nKey: I18nKey = undefined,
                param = undefined
            if (typeof item === 'function') {
                i18nKey = item
            } else {
                i18nKey = item[0]
                param = item[1]
            }
            return <li>{tN(i18nKey, param)}</li>
        })
        return () => <div class="list-container">{children}</div>
    },
})
