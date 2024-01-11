/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import { t } from '@/i18n'
import List from './common/List'

export default defineComponent(() => {
    return () => (
        <>
            <p>{t(msg => msg.limit.p1)}</p>
            <h2>{t(msg => msg.limit.step.title)}</h2>
            <List
                items={[
                    [
                        msg => msg.limit.step.enter,
                        {
                            link: 'link', //appLink(),
                            menuItem: 'menuItem', //t(msg => msg.appMenu.limit),
                        },
                    ],
                    msg => msg.limit.step.click,
                    msg => msg.limit.step.form,
                    msg => msg.limit.step.check,
                ]}
            />
        </>
    )
})
