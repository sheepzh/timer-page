/**
 * Copyright (c) 2022-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Ref } from 'vue'
import type { I18nKey } from '@/i18n'

import { t } from '@/i18n'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import { type Router, useRouter } from 'vue-router'
import {
    START_ROUTE,
    PRIVACY_ROUTE,
    USAGE_ROUTE,
    APP_PAGE_ROUTE,
    MERGE_ROUTE,
    VIRTUAL_ROUTE,
    BACKUP_ROUTE,
    LIMIT_ROUTE,
} from '@/router/constants'

type RouteMenu = {
    route: string
}

type LinkMenu = {
    link: string
}

type MenuConf = {
    title: I18nKey
    children?: MenuConf[]
} & (RouteMenu | LinkMenu)

const MENU_CONFIGS: MenuConf[] = [
    {
        route: START_ROUTE,
        title: msg => msg.start.title,
    },
    {
        route: PRIVACY_ROUTE,
        title: msg => msg.privacy.title,
    },
    {
        route: USAGE_ROUTE,
        title: msg => msg.layout.menu.usage,
        children: [
            {
                route: APP_PAGE_ROUTE,
                title: msg => msg.app.title,
            },
            {
                route: MERGE_ROUTE,
                title: msg => msg.merge.title,
            },
            {
                route: VIRTUAL_ROUTE,
                title: msg => msg.virtual.title,
            },
            {
                route: LIMIT_ROUTE,
                title: msg => msg.limit.title,
            },
            {
                route: BACKUP_ROUTE,
                title: msg => msg.backup.title,
            },
        ],
    },
]

function renderWithConf(
    conf: MenuConf,
    router: Router,
    activeRoute: Ref<string>
) {
    const { title, children } = conf as Required<MenuConf>
    const route = (conf as RouteMenu)?.route
    if (children?.length) {
        // prettier-ignore
        const slots = {
            title: () => <span>{t(title)}</span>,
            default: () => children.map(ch => renderWithConf(ch, router, activeRoute)),
        }
        return <ElSubMenu index={route || '_link'} v-slots={slots} />
    }
    return (
        <ElMenuItem
            index={route}
            onClick={() => {
                if (!route) return
                router.push('/guide' + route)
                activeRoute.value = route
            }}
        >
            <span>{t(title)}</span>
        </ElMenuItem>
    )
}

export default defineComponent(() => {
    const router = useRouter()
    const activeRoute: Ref<string> = ref()
    // Initialize current route in a new macro task
    onMounted(() =>
        setTimeout(() => (activeRoute.value = router.currentRoute?.value?.path))
    )
    return () => (
        <ElMenu
            defaultOpeneds={MENU_CONFIGS.filter(
                m => m.children?.length && (m as RouteMenu).route
            ).map(group => (group as RouteMenu).route)}
            defaultActive={activeRoute.value}
        >
            {MENU_CONFIGS.map(conf =>
                renderWithConf(conf, router, activeRoute)
            )}
        </ElMenu>
    )
})
