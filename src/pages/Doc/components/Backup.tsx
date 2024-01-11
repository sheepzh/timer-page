/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent, h } from 'vue'
import { t } from '@/i18n'
import { ElButton } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import List from './common/List'
import Alert from './common/Alert'

export default defineComponent(() => {
    return () => (
        <>
            <p>
                {t(msg => msg.backup.p1, {
                    link: '', // link('https://gist.github.com')
                })}
            </p>
            <h2>{t(msg => msg.backup.upload.title)}</h2>
            <List
                items={[
                    [
                        msg => msg.backup.upload.prepareToken,
                        {
                            link: '', //link('https://github.com/settings/tokens')
                        },
                    ],
                    [
                        msg => msg.backup.upload.enter,
                        {
                            link: '', // appLink(OPTION_ROUTE, { i: 'backup' })
                        },
                    ],
                    msg => msg.backup.upload.form,
                    msg => msg.backup.upload.backup,
                ]}
            />
            <h2>{t(msg => msg.backup.query.title)}</h2>
            <p>{t(msg => msg.backup.query.p1)}</p>
            <List
                items={[
                    [
                        msg => msg.backup.query.enter,
                        {
                            link: '', // appLink(REPORT_ROUTE),
                            menuItem: 'menuItem', //t(msg => msg.appMenu.dataReport),
                        },
                    ],
                    [
                        msg => msg.backup.query.enable,
                        {
                            icon: h(ElButton, {
                                text: true,
                                link: true,
                                icon: UploadFilled,
                                disabled: true,
                            }),
                        },
                    ],
                    msg => msg.backup.query.wait,
                ]}
            />
            <Alert type="warning">{t(msg => msg.backup.query.tip)}</Alert>
        </>
    )
})
