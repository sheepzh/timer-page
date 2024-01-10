/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import Article from './common/Article'
import { PRIVACY_ROUTE } from '@/router/constants'
import { tN } from '@/i18n/i18n-vue'
import { t } from '@/i18n'
import Alert from './common/Alert'

const _default = defineComponent(() => {
    return () => (
        <Article
            title={msg => msg.start.title}
            next={{ title: msg => msg.privacy.title, route: PRIVACY_ROUTE }}
        >
            <p>{t(msg => msg.start.p1)}</p>
            <h2>{t(msg => msg.start.s1)}</h2>
            <p>{t(msg => msg.start.s1p1)}</p>
            <img height={300}></img>
            <h2>{t(msg => msg.start.s2)}</h2>
            <p>
                {tN(msg => msg.start.s2p1, {
                    demo: <img />,
                })}
            </p>
            <h2>{t(msg => msg.start.s3)}</h2>
            <p>{t(msg => msg.start.s3p1)}</p>
            <Alert type="success">{t(msg => msg.start.alert)}</Alert>
        </Article>
    )
})

export default _default
