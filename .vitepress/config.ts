import { defineConfig } from 'vitepress'
import { enConfig } from "./locales/en"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  srcDir: "src",
  outDir: "./dist",
  cleanUrls: true,
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sheepzh/timer' },
      { icon: "mastodon", link: 'https://mastodon.online/@sheepysheep' }
    ],
    search: {
      provider: 'local',
    },
    logo: "/assets/logo.png"
  },

  locales: {
    en: {
      label: "English",
      lang: "en",
      link: "/en/index",
      ...enConfig,
    }
  },
})
