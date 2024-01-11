/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { defineComponent } from 'vue'
import Alert from '../common/Alert'
import { ElIcon, ElTable, ElTableColumn } from 'element-plus'
import type { PrivacyMessage, Scope } from '@/i18n/messages/privacy'
import { t } from '@/i18n'
import { CircleCheck, Warning } from '@element-plus/icons-vue'
import './privacy.sass'

type ScopeRow = keyof PrivacyMessage['scope']['rows']

const ALL_ROWS: ScopeRow[] = ['website', 'tab', 'clipboard']

const _default = defineComponent(() => {
    return () => (
        <>
            <Alert type="warning">{t(msg => msg.privacy.alert)}</Alert>
            <h2>{t(msg => msg.privacy.scope.title)}</h2>
            <ElTable
                cellClassName="scope-table-cell"
                data={ALL_ROWS}
                border
                fit
            >
                <ElTableColumn
                    label={t(msg => msg.privacy.scope.cols.name)}
                    minWidth={200}
                    v-slots={({ row }: { row: ScopeRow }) =>
                        t(msg => msg.privacy.scope.rows[row].name)
                    }
                />
                <ElTableColumn
                    label={t(msg => msg.privacy.scope.cols.usage)}
                    width={500}
                    v-slots={({ row }: { row: ScopeRow }) =>
                        t(msg => msg.privacy.scope.rows[row].usage)
                    }
                />
                <ElTableColumn
                    label={t(msg => msg.privacy.scope.cols.required)}
                    width={250}
                    v-slots={({ row }: { row: ScopeRow }) => {
                        // prettier-ignore
                        const reason = t(msg => (msg.privacy.scope.rows[row] as Scope)?.optionalReason)
                        return (
                            <span class={reason ? 'optional' : 'required'}>
                                <ElIcon>
                                    {reason ? <Warning /> : <CircleCheck />}
                                </ElIcon>
                                {reason}
                            </span>
                        )
                    }}
                />
            </ElTable>
            <h2>{t(msg => msg.privacy.storage.title)}</h2>
            <p>{t(msg => msg.privacy.storage.p1)}</p>
            <p>{t(msg => msg.privacy.storage.p2)}</p>
            <Alert type="info">{t(msg => msg.privacy.storage.p3)}</Alert>
        </>
    )
})

export default _default
