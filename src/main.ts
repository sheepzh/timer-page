import 'element-plus/theme-chalk/index.css'
import './styles/index.sass'

import { ViteSSG } from 'vite-ssg'
import Layout from './Layout'
import { routes } from './router'

export const createApp = ViteSSG(
    Layout,
    { routes },
    ({ }) => {
        // install plugins etc.
    },
)