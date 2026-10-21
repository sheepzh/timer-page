---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: '网费很贵'
    text: ''
    tagline: 免费开源插件，自动记录每个网站的浏览时长
    actions:
        - theme: brand
          text: 插件安装
          link: ./install
        - theme: alt
          text: 使用指南
          link: ./guide/start

features:
    - title: 时间追踪
      details: 追踪你每天花在每个网站上的浏览时长，支持按域名、日期和时段查询。
    - title: 习惯分析
      details: 根据追踪数据自动分析你在每个网站上，以及不同时段的浏览习惯。
    - title: 行为控制
      details: 针对分析结果，为指定网站设置每日时长限制和禁止访问时间段，提高工作学习效率。

---

<RatingModule title="浏览器评分"/>
<Testimonials />
