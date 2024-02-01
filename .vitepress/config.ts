import { defineConfig } from 'vitepress'
import { enConfig } from "./locales/en"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  srcDir: "src",
  outDir: "./dist",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sheepzh/timer' },
      { icon: "mastodon", link: 'https://mastodon.online/@sheepysheep' }
    ],

    search: {
      provider: 'local',

      options: {
        locales: {
        }
      },
    },

    logo: "/assets/logo.png"
  },

  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/",
      ...enConfig,
    }
  }
})
