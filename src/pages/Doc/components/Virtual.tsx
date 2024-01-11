/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import { ElTag } from 'element-plus'
import { t } from '@/i18n'
import List from './common/List'

const DemoTag = defineComponent(({ text }: { text: string }) => {
    return () => (
        <ElTag size="small" type="info">
            {text}
        </ElTag>
    )
})

const _default = defineComponent(() => {
    return () => (
        <>
            <p>{t(msg => msg.virtual.p1)}</p>
            <h2>{t(msg => msg.virtual.step.title)}</h2>
            <List
                items={[
                    [
                        msg => msg.virtual.step.enter,
                        {
                            link: '', // appLink(),
                            menuItem: '', //t(msg => msg.appMenu.siteManage),
                        },
                    ],
                    msg => msg.virtual.step.click,
                    [
                        msg => msg.virtual.step.form,
                        {
                            demo1: <DemoTag text="github.com/sheepzh" />,
                            demo2: (
                                <DemoTag text="github.com/sheepzh/timer/**" />
                            ),
                        },
                    ],
                    msg => msg.virtual.step.browse,
                ]}
            ></List>
        </>
    )
})

export default _default
