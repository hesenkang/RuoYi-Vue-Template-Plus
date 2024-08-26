import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RuoYi-Vue-Template-Plus",
  description: "RuoYi-Vue-Template-Plus 是一个后台前端解决方案，基于RuoYi-Vue开发的项目增强模版，面向前后端开发者，实现页面布局、组件、基于数据动态配置，配置式生成页面，面向数据编程，大大提升CRUD的开发效率。它可以帮助你快速搭建企业级中后台产品原型。",
  // base: '/RuoYi-Vue-Template-Plus/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/examples' }
    ],

    sidebar: [
      {
        text: '介绍',
        link: '/examples'
      },
      {
        text: '组件',
        items: [
          { text: 'BasePage', link: '/components-base-page' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hesenkang/RuoYi-Vue-Template-Plus' }
    ]
  }
})
