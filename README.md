# Time Tracker - Web Habit Builder

Official website of [Time Tracker - Web Habit Builder](https://time-tracker-4-browser.app/en/), a free and open-source browser extension for tracking website time, analyzing browsing habits, and limiting distracting sites on Chrome, Edge and Firefox.

Live site: **https://time-tracker-4-browser.app**

## Stack

- [VitePress](https://vitepress.dev/) (2.0.0-alpha) static site generator, 9 locales (en / zh_CN / zh_TW / de / es / fr / ja / pt_PT / ru)
- Node.js >= 22

## Development

```sh
npm install
npm run dev
```

Production build (output in `dist/`):

```sh
npm run build
```

The site is deployed on Vercel; pushes to the default branch trigger an automatic deployment.

## Content layout

```sh
src/<locale>/
├── index.md          # localized landing page
├── install.md        # store download links
├── faq.md            # FAQ (en, with FAQPage structured data)
├── privacy.md        # privacy policy
├── guide/            # user documentation (tracking / analysis / limits / data sync)
└── blog/             # articles and comparisons

src/public/           # robots.txt, llms.txt, images
.vitepress/config.ts  # sitemap, hreflang, canonical, structured data
```

## Contributing

Translations are managed through Crowdin and pull requests to this repository are welcome. See the [translation project](https://github.com/sheepzh/timer-page) and the main [extension repository](https://github.com/sheepzh/time-tracker-4-browser).

## License

The extension is dual-licensed under MIT and the Anti-996 license; website content is part of the same project.
