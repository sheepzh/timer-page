/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import List from './common/List'
import { t } from '@/i18n'
import Alert from './common/Alert'

const _default = defineComponent(() => {
    return () => (
        <>
            <p>{t(msg => msg.app.title)}</p>
            <List
                items={[
                    [msg => msg.app.l1, { button: 'All function' }],
                    [msg => msg.app.l2, { button: 'All function' }],
                ]}
            />
            <Alert type="success">{t(msg => msg.app.p2)}</Alert>
        </>
    )
})

export default _default
