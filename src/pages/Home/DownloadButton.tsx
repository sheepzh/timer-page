/**
 * Copyright (c) 2023-present Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { ArrowDown, Download } from '@element-plus/icons-vue'
import { t } from '@/i18n'
import { detectBrowser } from '@/utils/environment'
import {
    CHROME_HOMEPAGE,
    EDGE_HOMEPAGE,
    FIREFOX_HOMEPAGE,
} from '@/utils/constant'
import {
    ElButton,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
} from 'element-plus'
import { computed, defineComponent, onMounted, ref } from 'vue'

type _Info = {
    name: string
    url: string
}

function initInfo(): _Info[] {
    const result: _Info[] = []
    const browser = detectBrowser()
    browser !== 'chrome' &&
        result.push({ name: 'Chrome', url: CHROME_HOMEPAGE })
    browser !== 'edge' && result.push({ name: 'Edge', url: EDGE_HOMEPAGE })
    browser !== 'firefox' &&
        result.push({ name: 'Firefox', url: FIREFOX_HOMEPAGE })
    return result
}

function openUrl(url: string) {
    if (!url) return
}

const _default = defineComponent(() => {
    const infos = ref<_Info[]>([])
    onMounted(() => (infos.value = initInfo()))
    const firstInfo = computed(() => infos.value?.[0])
    const dropdownInfos = computed(() => infos.value?.slice(1) || [])
    return () => (
        <div class="download-container">
            {firstInfo && (
                <ElButton
                    icon={<Download />}
                    onClick={() => openUrl(firstInfo.value?.url)}
                >
                    {t(msg => msg.home.download, {
                        browser: firstInfo.value?.name,
                    })}
                </ElButton>
            )}
            {dropdownInfos?.value?.length && (
                <ElDropdown
                    onCommand={openUrl}
                    trigger="hover"
                    v-slots={{
                        default: () => (
                            <ElIcon>
                                <ArrowDown />
                            </ElIcon>
                        ),
                        dropdown: () => (
                            <ElDropdownMenu>
                                {dropdownInfos.value?.map(info => (
                                    <ElDropdownItem command={info.url}>
                                        {t(msg => msg.home.download, {
                                            browser: info.name,
                                        })}
                                    </ElDropdownItem>
                                ))}
                            </ElDropdownMenu>
                        ),
                    }}
                />
            )}
        </div>
    )
})

export default _default
