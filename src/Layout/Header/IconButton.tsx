/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElTooltip } from "element-plus"
import { defineComponent, h } from "vue"

const _default = defineComponent({
    props: {
        tip: String,
        href: String,
    },
    setup(props, ctx) {
        return () => (
            <ElTooltip effect="dark" placement="bottom" content={props.tip} offset={5} showArrow={false}>
                <a href={props.href} target="_blank" class="icon-link">
                    {h(ctx.slots.default)}
                </a>
            </ElTooltip>
        )
    }
})

export default _default