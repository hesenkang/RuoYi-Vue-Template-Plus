---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Template-Plus"
  text: "实现页面布局、组件、基于数据动态配置"
  tagline: 基于数据动态配置生成页面，面向数据编程
  actions:
    # - theme: brand
    #   text: Markdown Examples
    #   link: /markdown-examples
    - theme: alt
      text: 指南
      link: /examples
    - theme: alt
      text: GitHub
      link: https://github.com/hesenkang/RuoYi-Vue-Template-Plus

features:
  # - title: Feature A
  #   details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  # - title: Feature B
  #   details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  # - title: Feature C
  #   details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>