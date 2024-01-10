/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from "@/i18n"
import { defineComponent, h } from "vue"
import IconButton from "./icon-button"
import DarkSwitch from "./dark-switch"
import LocaleSelect from "./locale-select"
import './header.sass'
import { GITHUB_PATH, EMAIL_PATH } from "./svg"
import { useRouter } from "vue-router"
import { HOME_ROUTE } from "@/router/constants"
import { SOURCE_CODE_PAGE } from "@/utils/constant"
import { author } from "../../../package.json"

const ICON_URL = ''
const logo = () => h('span', { class: 'icon' }, h('img', { src: ICON_URL, width: 42, height: 42 }))

const title = () => h('span', { class: 'title' }, t(msg => msg.meta.marketName))

const github = () => h(IconButton, {
    path: GITHUB_PATH,
    tip: t(msg => msg.layout.header.sourceCode),
    href: SOURCE_CODE_PAGE,
})
const email = () => h(IconButton, {
    path: EMAIL_PATH,
    tip: t(msg => msg.layout.header.email),
    href: `mailto:${author.email}`
})
const darkSwitch = () => h(DarkSwitch)
const localeSelect = () => h(LocaleSelect)

const _default = defineComponent(() => {
    const router = useRouter()
    return () => h('div', { class: 'header-container' }, [
        h('div', { class: 'header-left', onClick: () => router.push(HOME_ROUTE) }, [logo(), title()]),
        h('div', { class: 'header-right' }, [
            github(),
            email(),
            darkSwitch(),
            localeSelect(),
        ])
    ])
})

export default _default