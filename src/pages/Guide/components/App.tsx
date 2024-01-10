/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import Article from './common/Article'
import List from './common/List'
import { MERGE_ROUTE, PRIVACY_ROUTE } from '@/router/constants'
import { t } from '@/i18n'
import Alert from './common/Alert'

const _default = defineComponent(() => {
    return () => (
        <Article
            title={msg => msg.app.title}
            previous={{ route: PRIVACY_ROUTE, title: msg => msg.privacy.title }}
            next={{ route: MERGE_ROUTE, title: msg => msg.merge.title }}
        >
            <p>{t(msg => msg.app.title)}</p>
            <List
                items={[
                    [msg => msg.app.l1, { button: 'All function' }],
                    [msg => msg.app.l2, { button: 'All function' }],
                ]}
            />
            <Alert type="success">{t(msg => msg.app.p2)}</Alert>
        </Article>
    )
})

export default _default
