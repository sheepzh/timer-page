/**
 * Copyright (c) 2022-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Ref } from 'vue'

import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes, type MyRoute } from '@/router'
import { DOC_ROUTE } from '@/router/constants'

export type MenuConf = {
    title: string
    route: string
    children?: MenuConf[]
    previous?: MenuConf
    next?: MenuConf
}

const computeMenuItem = (
    { path, title, children }: MyRoute,
    leafs: MenuConf[]
): MenuConf => {
    const conf: MenuConf = { route: path, title }
    if (children?.length) {
        conf.children = children.map(r => computeMenuItem(r, leafs))
    } else {
        leafs.push(conf)
    }
    return conf
}

const computeMenus = (): [MenuConf[], MenuConf[]] => {
    const { children: rc = [] } = routes.find(r => r.path === DOC_ROUTE) || {}
    const leafs: MenuConf[] = []
    const trees = rc.map(r => computeMenuItem(r, leafs))
    for (let i = 0; i < leafs.length; i++) {
        leafs[i].previous = leafs[i - 1]
        leafs[i].next = leafs[i + 1]
    }
    return [trees, leafs]
}

function renderWithConf(conf: MenuConf, handleClick: (conf: MenuConf) => void) {
    const { title, children, route } = conf
    if (children?.length) {
        // prettier-ignore
        const slots = {
            title: () => <span>{title}</span>,
            default: () => children.map(ch => renderWithConf(ch, handleClick)),
        }
        return <ElSubMenu index={route || '_link'} v-slots={slots} />
    }
    return (
        <ElMenuItem index={route} onClick={() => handleClick(conf)}>
            <span>{title}</span>
        </ElMenuItem>
    )
}

export default defineComponent({
    emits: {
        change: (_clicked: MenuConf) => true,
    },
    setup: (_, ctx) => {
        const router = useRouter()
        const activeRoute: Ref<string> = ref()
        const [trees, leafs] = computeMenus()
        const defaultOpeneds = trees
            .filter(m => m.children?.length && m.route)
            .map(group => group.route)
        // Initialize current route in a new macro task
        onMounted(() => {
            const currentRoute = router.currentRoute?.value?.path
            const currentMenu = leafs.find(m => m.route === currentRoute)
            ctx.emit('change', currentMenu)
            setTimeout(() => (activeRoute.value = currentRoute))
        })
        const handleClick = (menu: MenuConf) => {
            const { route } = menu
            if (!route) return
            const { protocol, host } = window.location || {}
            const url = `${protocol}//${host}${route}`
            window.location.replace(url)
            activeRoute.value = route
        }
        return () => (
            <ElMenu
                defaultOpeneds={defaultOpeneds}
                defaultActive={activeRoute.value}
            >
                {trees.map(conf => renderWithConf(conf, handleClick))}
            </ElMenu>
        )
    },
})
