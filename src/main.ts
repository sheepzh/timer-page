import 'element-plus/theme-chalk/index.css'
import './styles/index.sass'

import { createApp } from 'vue'
import Layout from './Layout'
import { router } from './router'


const main = () => {
    const app = createApp(Layout)
    app.use(router)
    app.mount('#app')
}

main()
