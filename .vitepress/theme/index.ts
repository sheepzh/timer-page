// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Link from "./components/Link.vue"
import LinkGrid from "./components/LinkGrid.vue"
import InstallGrid from "./components/InstallGrid.vue"
import './style.css'
import './icon.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Link", Link)
    app.component("LinkGrid", LinkGrid)
    app.component("InstallGrid", InstallGrid)
    const path = router?.route?.path
    if (!path || path === "en") {
      router.go("/en/")
    }
  }
} satisfies Theme
