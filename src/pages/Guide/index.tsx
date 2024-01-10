import { ElAside, ElContainer, ElMain, ElScrollbar } from 'element-plus'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Menu from './Menu'
import './components/common/article.sass'

export default defineComponent(() => {
    return () => (
        <ElContainer>
            <ElAside>
                <ElScrollbar>
                    <Menu />
                </ElScrollbar>
            </ElAside>
            <ElMain>
                <ElScrollbar>
                    <RouterView />
                </ElScrollbar>
            </ElMain>
        </ElContainer>
    )
})
