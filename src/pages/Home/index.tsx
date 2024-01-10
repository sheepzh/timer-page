/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { t } from '@/i18n'
import { defineComponent } from 'vue'
import DownloadButton from './DownloadButton'
import StartButton from './StartButton'
import './home.sass'

const _default = defineComponent(() => {
    const desc = t(msg => msg.home.desc, { appName: t(msg => msg.meta.name) })
    return () => (
        <div class="home-container">
            <h1 class="slogan">{t(msg => msg.meta.slogan)}</h1>
            <img height={400} />
            <p class="desc">{desc}</p>
            <div class="button-container">
                <StartButton />
                <DownloadButton />
            </div>
        </div>
    )
})

export default _default
