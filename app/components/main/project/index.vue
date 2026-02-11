<script setup lang="ts">

</script>

<template>
  <MainContent
    title="湖南大学微生活小程序"
    icon="tabler:hexagon-number-1"
  >
    <MainFeature>
      湖南大学微生活小程序是湖南大学学生的一站式信息化服务平台, 服务于向内万级用户, 提供课表查看, 成绩查询, 校园相关服务等众多功能.
    </MainFeature>
    <MainFeature title="相关技术:">
      React, Taro, SCSS
    </MainFeature>
    <MainFeature title="我的职责:">
      负责优化老代码以及一些新功能的开发, 包括课表模块重构, 实验模块显示优化, 加入今日待办功能以及其他 UX 方面更新.
    </MainFeature>
    <MainFeature title="核心难点:">
      老代码不易维护, 用户需求众口难调, 微信小程序环境 API 限制等.
    </MainFeature>
  </MainContent>
  <MainContent
    title="湖南大学岳麓幻境社社团官网"
    icon="tabler:hexagon-number-2"
  >
    <MainFeature>
      湖南大学的 MC 社团官方站点, 也是湖南大学高校 MC 社团的联合平台, 承载社团活动和内容展示.
      <BaseCode to="https://www.hmomc.cn">
        网站
      </BaseCode>
      <BaseCode to="https://github.com/Twisuki/HMOIndex">
        仓库
      </BaseCode>
    </MainFeature>
    <MainFeature title="相关技术: ">
      Nuxt, Nuxt Content(CMS), Vue
    </MainFeature>
    <MainFeature title="我的职责: ">
      - 负责了整个官网的架构设计与开发, 使用 Nuxt Content 实现内容管理.
      <br>
      - 实现图片懒加载, 响应式布局, 多端适配提升用户体验.
    </MainFeature>
    <MainFeature title="核心难点: ">
      优化大量图片在小带宽情况下的加载性能, 提升首屏速度
    </MainFeature>
  </MainContent>
  <MainContent
    title="湖南大学试卷库"
    icon="tabler:hexagon-number-3"
  >
    <MainFeature>
      湖南大学试卷资源下载平台, 提供搜索, 分类, 上传, 下载等功能.
      <BaseCode to="https://github.com/qnxg/hnu-doc-frontend">
        仓库
      </BaseCode>
    </MainFeature>
    <MainFeature title="相关技术: ">
      Next, React, TailwindCSS, shadcn/ui, Axios
    </MainFeature>
    <MainFeature title="我的职责: ">
      - 基于 Next SSR 实现服务端渲染, 优化加载速度和 SEO.
      <br>
      - 使用 shadcn/ui 构建组件库, 统一 UI 规范.
      <br>
      - 实现了搜索, 筛选, 列表展示, 上传下载等核心功能, 以及用户认证和权限管理.
    </MainFeature>
    <MainFeature title="核心难点: ">
      解决了 shadcn/ui 组件在水合时重新计算 id 造成的不匹配问题.
    </MainFeature>
  </MainContent>
</template>

<style scoped>

</style>
