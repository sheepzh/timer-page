/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus"
import { defineComponent } from "vue"
import { getI18nVal, locale as current, ALL_LOCALES, type Locale } from "@/i18n"
import localeMessages from "@/i18n/messages/locale"
import LocaleIcon from "@/assets/locale.svg"
import { CROWDIN_HOMEPAGE } from "@/utils/constant"

const HELP_CMD: string = '_help'

const getLocaleName = (locale: Locale) => getI18nVal(localeMessages, msg => msg.name, locale)

const _default = defineComponent({
    render: () => (
        <ElDropdown
            class="locale-select"
            v-slots={{
                dropdown: () => (
                    <ElDropdownMenu>
                        {ALL_LOCALES.map(locale => (
                            <ElDropdownItem disabled={current === locale} command={locale}>
                                {getLocaleName(locale)}
                            </ElDropdownItem>
                        ))}
                        <ElDropdownItem divided command={HELP_CMD}>
                            <a href={CROWDIN_HOMEPAGE} target="_blank">
                                Help us translate!
                            </a>
                        </ElDropdownItem>
                    </ElDropdownMenu>
                )
            }}
        >
            <div class="locale-button">
                <LocaleIcon />
                <span>{getLocaleName(current)}</span>
            </div>
        </ElDropdown>
    )
})

export default _default