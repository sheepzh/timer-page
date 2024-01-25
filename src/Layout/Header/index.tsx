/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from "@/i18n"
import { defineComponent } from "vue"
import IconButton from "./IconButton"
import DarkSwitch from "./DarkSwitch"
import LocaleSelect from "./LocaleSelect"
import './header.sass'
import { useRouter } from "vue-router"
import { HOME_ROUTE } from "@/router/constants"
import { SOURCE_CODE_PAGE } from "@/utils/constant"
import { author } from "../../../package.json"
import GithubIcon from "@/assets/github.svg"
import EmailIcon from "@/assets/email.svg"
import Logo from "@/assets/logo.png"
import HeaderMenu from "./HeaderMenu"
import { ElDivider } from "element-plus"

const _default = defineComponent(() => {
    const router = useRouter()
    const jumpToHome = () => router.push(HOME_ROUTE)
    return () => (
        <div class="header-container">
            <div class="header-left" onClick={jumpToHome}>
                <span class="icon">
                    <img src={Logo} width={42} height={42} />
                </span>
                <span class="title">
                    {t(msg => msg.meta.marketName)}
                </span>
            </div>
            <div class="header-right">
                <HeaderMenu />
                <ElDivider direction="vertical" />
                <LocaleSelect />
                <ElDivider direction="vertical" />
                <IconButton href={SOURCE_CODE_PAGE} tip={t(msg => msg.layout.header.sourceCode)}>
                    <GithubIcon />
                </IconButton>
                <IconButton href={`mailto:${author.email}`} tip={t(msg => msg.layout.header.email)}>
                    <EmailIcon />
                </IconButton>
                <DarkSwitch />
            </div>
        </div>
    )

})

export default _default