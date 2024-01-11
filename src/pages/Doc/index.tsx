import { ElAside, ElContainer, ElMain, ElScrollbar } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import Menu, { type MenuConf } from './Menu'
import { ClientOnly } from '@/components/ClientOnly'
import Article from './Article'

export default defineComponent(() => {
    const menu = ref<MenuConf>()
    return () => (
        <ClientOnly>
            <ElContainer>
                <ElAside>
                    <ElScrollbar>
                        <Menu onChange={newVal => (menu.value = newVal)} />
                    </ElScrollbar>
                </ElAside>
                <ElMain>
                    <ElScrollbar>
                        <Article current={menu.value}>
                            <RouterView />
                        </Article>
                    </ElScrollbar>
                </ElMain>
            </ElContainer>
        </ClientOnly>
    )
})
