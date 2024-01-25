/**
 * Copyright (c) 2022-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElContainer, ElHeader } from 'element-plus'
import { defineComponent } from 'vue'
import Header from './Header'
import { RouterView } from 'vue-router'

const _default = defineComponent(() => {
    return () => (
        <ElContainer class="guide-container">
            <ElHeader>
                <Header />
            </ElHeader>
            <RouterView />
        </ElContainer>
    )
})

export default _default
