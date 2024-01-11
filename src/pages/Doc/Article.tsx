/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { PropType } from 'vue'

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { computed, defineComponent, h, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuConf } from './Menu'
import './article.sass'

const _default = defineComponent({
    props: {
        current: Object as PropType<MenuConf>,
    },
    setup(props, ctx) {
        const router = useRouter()
        const myCurrent = ref<MenuConf>()
        watch(
            () => props.current,
            () => (myCurrent.value = props.current)
        )
        const content = ctx.slots.default
        const previous = computed(() => myCurrent.value?.previous)
        const next = computed(() => myCurrent.value?.next)
        const footerVisible = computed(() => previous.value || next.value)
        const jumpMenu = (target: MenuConf) => router.push(target?.route)
        return () => (
            <div class="article-container">
                <h1 class="article-title">{myCurrent.value?.title}</h1>
                {content && <div class="article-content">{h(content)}</div>}
                <div
                    class="article-footer"
                    style={{ display: footerVisible ? null : 'none' }}
                >
                    {previous.value && (
                        <div
                            class="previous-container"
                            onClick={() => jumpMenu(previous.value)}
                        >
                            <ArrowLeft />
                            <span>{previous.value?.title}</span>
                        </div>
                    )}
                    {next.value && (
                        <div
                            class="next-container"
                            onClick={() => jumpMenu(next.value)}
                        >
                            <span>{next.value?.title}</span>
                            <ArrowRight />
                        </div>
                    )}
                </div>
            </div>
        )
    },
})

export default _default
