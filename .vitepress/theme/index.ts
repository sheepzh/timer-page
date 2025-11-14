// https://vitepress.dev/guide/custom-theme
import { inject } from "@vercel/analytics"
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import InstallGrid from "./components/InstallGrid.vue"
import Link from "./components/Link.vue"
import LinkGrid from "./components/LinkGrid.vue"
import RatingModule from "./components/RatingModule.vue"
import StarRating from "./components/StarRating.vue"
import Testimonials from "./components/Testimonials.vue"
import './icon.css'
import './style.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router }) {
        inject()
        app.component("Link", Link)
        app.component("LinkGrid", LinkGrid)
        app.component("InstallGrid", InstallGrid)
        app.component("RatingModule", RatingModule)
        app.component("StarRating", StarRating)
        app.component("Testimonials", Testimonials)
    },
} satisfies Theme
