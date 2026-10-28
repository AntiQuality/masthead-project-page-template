<div align="center">

<img src="assets/logo.svg" width="72" height="72" alt="Masthead logo">

# Masthead

[English](README.md) &nbsp;|&nbsp; **简体中文**

**一个 Agent 原生的学术项目主页模板**<br>
安装 skill，把论文交给你的 Agent，一句话就能得到一个完整的项目主页

```bash
npx skills add AntiQuality/masthead-project-page-template
```

[![License: MIT](https://img.shields.io/badge/license-MIT-191712)](LICENSE)
[![No build step](https://img.shields.io/badge/build-none-2b55c9)](#快速开始)
[![Agent Skill](https://img.shields.io/badge/agent%20skill-included-0b7a55)](#用-ai-agent)
[![Dark mode](https://img.shields.io/badge/dark%20mode-yes-15140f)](#主题预设)

**[在线演示](https://antiquality.github.io/masthead-project-page-template/)** &nbsp;&nbsp; **[使用这个模板](https://github.com/AntiQuality/masthead-project-page-template/generate)** &nbsp;&nbsp; **[真实案例：AgentAbstain（NeurIPS 2026 Oral）](https://agentabstain.github.io)**

<img src=".github/screenshots/demo.gif" alt="滚动浏览 Masthead 演示页：数字滚动递增、表格排序、柱子升起，最后切换到暗色模式" width="100%">

</div>

## 为什么选 Masthead

![Masthead 的亮色和暗色模式](.github/screenshots/hero.png)

- **一句话生成项目主页。** 自带的 [Agent Skill](skills/masthead/SKILL.md) 会读你的论文，问几个设计问题，然后搭好页面、检查一遍，并发布到 GitHub Pages。支持 Claude Code、Codex、Cursor、Gemini CLI 等 Agent。
- **像报纸头版，而不是幻灯片。** 大号报刊风格的标题字体、细线分隔和纸墨配色，让读者第一眼看到的就是论文标题。
- **内置亮色和暗色模式。** 默认跟随系统设置，顶栏的切换按钮会记住读者的选择。
- **结果一目了然。** 可排序的结果表格、纯 HTML 和 CSS 画的柱状图、三个关键数字，以及逐步对比各方法的案例分析版式。
- **加载快，无障碍。** Lighthouse 在手机和桌面端的性能、无障碍、最佳实践和 SEO 四项都是 100 分。不算字体和图片，整个页面 gzip 后约 17 KB。
- **搜索和分享开箱即用。** 内置 Google Scholar 的 `citation_*` 标签、带 1200×630 预览图的 Open Graph 和 Twitter 卡片，以及 schema.org 结构化数据。
- **纯静态文件，手改也方便。** 只有 HTML、CSS 和 JavaScript，没有构建步骤，没有依赖。`index.html` 里每个区块都是一个标注好的模块，可以整块复制或删除。

## 动效展示

动效的作用是把注意力引向结果，不是装饰。如果读者在系统里开启了“减弱动态效果”，下面这些动效都会关闭。

**图表滚入视野时，柱子会依次升起。鼠标悬停在图例上，会突出对应的系列。**

<img src=".github/screenshots/motion-chart.gif" alt="柱子升起到位，鼠标悬停在图例上后，其他系列淡出" width="100%">

**统计条第一次进入视野时，关键数字会从零滚动到最终值。**

<img src=".github/screenshots/motion-stats.gif" alt="统计条里的数字滚动到最终值" width="100%">

**点击任意列标题即可对结果表格排序。**

<img src=".github/screenshots/motion-table.gif" alt="点击表头，表格行重新排序" width="100%">

**一键切换亮色和暗色模式，并记住你的选择。**

<img src=".github/screenshots/motion-theme.gif" alt="页面从亮色切换到暗色再切回来" width="100%">

## 和其他模板的对比

| | Masthead | Nerfies 风格的模板 |
|---|---|---|
| 用 Agent 从论文直接生成页面 | 支持，自带 Agent Skill | 不支持 |
| 依赖 | 无（只用 Google Fonts） | Bulma、jQuery、Font Awesome、轮播插件 |
| 暗色模式 | 支持，带切换按钮 | 不支持 |
| 可排序的结果表格 | 支持 | 不支持 |
| 图表 | 内置，纯 HTML 和 CSS | 只能放图片 |
| 案例分析和对比卡片版式 | 支持 | 不支持 |
| 主题预设 | 4 套 | 无 |
| 许可证 | MIT | CC BY-SA 4.0 |

Nerfies 和它的衍生模板都很优秀，影响了一整代论文项目主页。Masthead 走的是另一种视觉风格，并用现代 CSS 取代了第三方库。

## 快速开始

### 用 AI Agent

安装 Masthead skill，然后让你的 Agent 做一个项目主页：

```bash
npx skills add AntiQuality/masthead-project-page-template
```

> 用 Masthead 给我的论文做一个项目主页。

Agent 会先读你的论文，给出一份页面大纲，问几个设计问题（标题强调哪个词、保留哪些模块、用哪套主题、要不要生成预览图），然后搭好页面，分别在亮色、暗色和手机宽度下检查一遍，等你确认后再发布到 GitHub Pages。这个 skill 可以在 Claude Code、Codex、Cursor、Gemini CLI 以及其他支持 [Agent Skills](https://agentskills.io) 的 Agent 里使用。

### 手动搭建

1. 点击 **Use this template**（或者 fork、下载这个仓库）。
2. 编辑 `index.html`。每个区块都有 `MODULE` 注释，不需要的直接删掉。
3. 在 `assets/css/tokens.css` 里修改颜色和字体，亮色和暗色模式都定义在这里。
4. 替换 `assets/media/` 里的占位图片、视频和 `social-preview.png`。
5. 给仓库开启 GitHub Pages：进入 Settings 的 Pages 页面，选择从 `main` 分支部署。

本地预览：在仓库目录下运行 `python3 -m http.server`，然后打开 `http://localhost:8000`。发布前跑一遍 `python3 skills/masthead/scripts/check_page.py index.html`，它会列出残留的占位文字、失效的章节链接和其他常见疏漏。

## 模块

| 模块 | 展示内容 | 主要 class |
|---|---|---|
| 顶栏 | 项目名、随滚动高亮当前章节的导航链接、暗色模式开关 | `.top` |
| Hero | 会议徽章、带强调词的标题、简介、资源按钮、作者 | `.hero` |
| 摘要 | 左边一句话引子，右边摘要正文 | `.abstract` |
| 统计条 | 三到六个关键数字，滚动到时从零递增 | `.stats` |
| 图片 | 通栏大图、视频或 YouTube 嵌入、并排图片 | `.fig`、`.fig-row`、`.embed` |
| 对比卡片 | 两个输入，以及两者之间唯一的改动 | `.pair` |
| 关键结果 | 三个大数字，每个配一行说明 | `.keys` |
| 结果表格 | 可排序的列、高亮最佳行、方法名下附引用 | `.tbl` |
| 柱状图 | 分组柱状、图例、悬停突出单个系列 | `.chart` |
| 案例分析 | 输入、难点说明、每个方法一列、结果分布条 | `.case` |
| 提示块 | 一句话结论 | `.callout` |
| 引用 | 带复制按钮的 BibTeX | `.citebox` |

![关键结果、可排序表格和柱状图](.github/screenshots/results.png)

![每个方法一列的案例分析](.github/screenshots/case-study.png)

## 手机端

导航会收成一行可以横向滑动的链接，并高亮当前所在的章节。卡片和案例分析的各列改为上下堆叠，图表和表格要么刚好放下，要么在自己的区域内横向滚动。

![Masthead 在手机上的亮色和暗色模式](.github/screenshots/mobile.png)

## 主题预设

`tokens.css` 定义了默认外观。想换一套，在 `<head>` 里紧接着它引入一个预设即可：

```html
<link rel="stylesheet" href="assets/css/themes/gazette.css">
```

| 预设 | 字体 | 强调色 |
|---|---|---|
| 默认 | Space Grotesk、Hanken Grotesk | 蓝 |
| `gazette` | Fraunces、Source Serif 4 | 酒红 |
| `lab` | IBM Plex Sans、IBM Plex Mono | 绿 |
| `mono` | Geist、Geist Mono | 朱红 |

每个预设都会加载自己的字体，并同时定义亮色和暗色模式。在演示页的地址后面加 `?theme=` 就能预览，例如 `index.html?theme=gazette`。

![四套主题预设](.github/screenshots/themes.png)

## 自定义

- **颜色和字体。** 全部在 `assets/css/tokens.css` 的 CSS 变量里：纸色和墨色、强调色、会议徽章色、状态色，以及四种图表系列色。
- **页面宽度。** 修改 `tokens.css` 里的 `--maxw`。
- **动效。** 对开启了“减弱动态效果”的读者，滚动渐显、数字递增和柱子升起都会关闭。在地址后面加 `?static` 可以查看没有动效的页面。
- **没有 JavaScript 也能看。** 禁用 JS 后内容不会丢，只是排序、主题切换和动效不再生效。

## 与 AI Agent 协作

已经把模板拉下来了？[`AGENTS.md`](AGENTS.md) 是给编程 Agent 看的规则手册：该改哪些文件、每个模块怎么用、文字风格有什么要求。[`skills/masthead`](skills/masthead/SKILL.md) 里的 skill 也遵循这份规则。

## 案例展示

采用 Masthead 风格的页面：

| 项目 | 会议 |
|---|---|
| [AgentAbstain: Do LLM Agents Know When Not to Act?](https://agentabstain.github.io) | NeurIPS 2026 Oral，Evaluations and Datasets Track |

Masthead 由 AgentAbstain 的项目主页整理而来，做成了可复用的模板。用 Masthead 做了页面？欢迎提 PR 加到这里。

## 致谢

Masthead 源自 [AgentAbstain](https://agentabstain.github.io) 的项目主页。[Vira Kasprova](https://www.linkedin.com/in/vira-kasprova/) 做了第一版，[Xun Liu](https://antiquality.github.io/) 在此基础上迭代成了这个模板。感谢整个 AgentAbstain 团队的反馈。

## 许可证

[MIT](LICENSE)。你可以把 Masthead 用在任何项目上，如果能在页脚链接回这个仓库，非常感谢！
