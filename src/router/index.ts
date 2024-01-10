/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHistory } from "vue-router"


export const routes: RouteRecordRaw[] = [{
    path: '/',
    redirect: "index",
}, {
    path: "/index",
    component: () => import('@/pages/Home')
}, {
    path: "/guide",
    component: () => import('@/pages/Guide'),
    children: [{
        path: "start",
        component: () => import('@/pages/Guide/components/Start'),
    }, {
        path: "privacy",
        component: () => import('@/pages/Guide/components/Privacy')
    }, {
        path: "usage",
        redirect: "management",
        children: [
            {
                path: "management",
                component: () => import('@/pages/Guide/components/App'),
            }, {
                path: "merge",
                component: () => import('@/pages/Guide/components/Merge'),
            }, {
                path: "virtual",
                component: () => import('@/pages/Guide/components/Virtual'),
            }, {
                path: "limit",
                component: () => import('@/pages/Guide/components/Limit'),
            }, {
                path: "backup",
                component: () => import('@/pages/Guide/components/Backup'),
            }
        ]
    }]
}]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
