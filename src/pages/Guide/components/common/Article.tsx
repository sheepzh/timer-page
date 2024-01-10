/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { I18nKey } from '@/i18n'
import type { PropType } from 'vue'

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { t } from '@/i18n'
import { defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'

type Link = {
    route: string
    title: I18nKey
}

const Footer = defineComponent({
    props: {
        previous: Object as PropType<Link>,
        next: Object as PropType<Link>,
    },
    setup: ({ previous, next }) => {
        const router = useRouter()

        return () => (
            <div
                class="article-footer"
                style={{ display: !previous && !next ? 'none' : null }}
            >
                {previous && (
                    <div
                        class="previous-container"
                        onClick={() => router.push(previous.route)}
                    >
                        <ArrowLeft />
                        <span>{t(previous.title)}</span>
                    </div>
                )}
                {next && (
                    <div
                        class="next-container"
                        onClick={() => router.push(next.route)}
                    >
                        <span>{t(next.title)}</span>
                        <ArrowRight />
                    </div>
                )}
            </div>
        )
    },
})

const _default = defineComponent({
    props: {
        title: {
            type: Function as PropType<I18nKey>,
            required: true,
        },
        next: Object as PropType<Link>,
        previous: Object as PropType<Link>,
    },
    setup(props, ctx) {
        const { previous, next, title } = props
        const content = ctx.slots.default
        return () => (
            <div class="article-container">
                <h1 class="article-title">{t(title)}</h1>
                {content && <div class="article-content">{h(content)}</div>}
                <Footer previous={previous} next={next} />
            </div>
        )
    },
})

export default _default
