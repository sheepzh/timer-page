---
title: 数据迁移
---

# {{$frontmatter.title}}

该插件只会使用浏览器提供的 API 将你的数据保存在本地，不会将它分发到任何位置。

但是插件也提供了工具帮助你转移数据。

## 导出和导入

你可以在后台页将数据导出到一个 .json 文件中，然后在其他的浏览器中导入。该方法更适用于你开始使用新的浏览器或者设备的情况。

当然，你也可以导入同类型的其他浏览器插件导出的数据。比如：

| 其他浏览器插件            | 文件格式            | 备注             |
| ------------------------- | ------------------- | ---------------- |
| Webtime Tracker           | `.csv` 或者 `.json` |                  |
| Web Activity Time Tracker | `.csv`              |                  |
| History Trends Unlimited  | `.tsc`              | 只能导入访问次数 |

## 跨端同步数据

该插件不会提供数据远端存储服务。

不过，它提供了一些工具，以支持你将数据同步到一些你信赖的第三方服务中。

| 第三方服务  | 先决条件                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Github Gist | 一个至少包含 Gist 权限的 Github access token                                                                         |
| Obsidian    | Obsidian 客户端，并安装插件 [Local REST API for Obsidian](https://github.com/coddingtonbear/obsidian-local-rest-api) |

如果你的 token 设置正确的话，你也可以在报表页中查询其他端同步的数据。
