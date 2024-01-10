/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Ref } from "vue"

import { defineComponent, ref, h } from "vue"

import { ElSwitch } from "element-plus"
import { Moon, Sunrise } from "@element-plus/icons-vue"

const _default = defineComponent(() => {
    const value: Ref<boolean> = ref(false)
    const handleChange = (newVal: boolean) => {
        value.value = newVal
    }
    return () => h(ElSwitch, {
        modelValue: value.value,
        inactiveIcon: Sunrise,
        activeIcon: Moon,
        inlinePrompt: true,
        onChange(newVal: boolean | string | number) {
            handleChange(newVal as boolean)
        },
    })
})

export default _default