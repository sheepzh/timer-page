/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { RouteRecordRaw } from "vue-router"
import { DOC_ROUTE, HOME_ROUTE } from "./constants"
import { t } from "@/i18n"

export type MyRoute = RouteRecordRaw & {
    title?: string
    children?: MyRoute[]
}

export const routes: MyRoute[] = [{
    path: '/',
    redirect: HOME_ROUTE,
}, {
    path: HOME_ROUTE,
    component: () => import('@/pages/Home')
}, {
    path: DOC_ROUTE,
    component: () => import('@/pages/Doc'),
    redirect: "/doc/start",
    children: [{
        path: "/doc/start",
        component: () => import('@/pages/Doc/components/Start'),
        title: t(msg => msg.start.title),
    }, {
        path: "/doc/privacy",
        component: () => import('@/pages/Doc/components/Privacy'),
        title: t(msg => msg.privacy.title),
    }, {
        path: "/doc/usage",
        redirect: "/doc/usage/management",
        title: t(msg => msg.layout.menu.usage),
        children: [
            {
                path: "/doc/usage/management",
                component: () => import('@/pages/Doc/components/App'),
                title: t(msg => msg.app.title),
            }, {
                path: "/doc/usage/merge",
                component: () => import('@/pages/Doc/components/Merge'),
                title: t(msg => msg.merge.title),
            }, {
                path: "/doc/usage/virtual",
                component: () => import('@/pages/Doc/components/Virtual'),
                title: t(msg => msg.virtual.title),
            }, {
                path: "/doc/usage/limit",
                component: () => import('@/pages/Doc/components/Limit'),
                title: t(msg => msg.limit.title),
            }, {
                path: "/doc/usage/backup",
                component: () => import('@/pages/Doc/components/Backup'),
                title: t(msg => msg.backup.title),
            }
        ]
    }]
}]
