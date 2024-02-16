import { defineConfig } from 'vitepress'
import { enConfig } from "./locales/en"
import { zhCnConfig } from "./locales/zhCn"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  srcDir: "src",
  outDir: "./dist",
  cleanUrls: true,
  head: [
    ["link", { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" }]
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sheepzh/timer' },
    ],
    logo: "/images/logo.png",
  },
  locales: {
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
      ...enConfig,
    },
    zh_CN: {
      label: "简体中文",
      lang: "zh_CN",
      link: "/zh_CN/",
      ...zhCnConfig,
    },
  },
})
