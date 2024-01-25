/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Ref } from "vue"

import { defineComponent, ref, onMounted } from "vue"
import { ElSwitch } from "element-plus"
import { Moon, Sunrise } from "@element-plus/icons-vue"
import { toggle, initDarkMode } from "@/utils/dark-mode"

const _default = defineComponent(() => {
    const value: Ref<boolean> = ref(false)
    onMounted(() => value.value = initDarkMode())
    const handleChange = (newVal: boolean) => {
        value.value = newVal
        toggle(newVal)
    }
    return () => (
        <ElSwitch
            modelValue={value.value}
            inactiveIcon={<Sunrise />}
            activeIcon={<Moon />}
            inlinePrompt
            onChange={(val: boolean | string | number) => handleChange(val as boolean)}
        />
    )
})

export default _default