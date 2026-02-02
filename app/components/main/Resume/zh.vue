<script setup lang="ts">
import dayjs from "dayjs"

defineProps<{
  wakaInfo: WakaInfo | null | Error
}>()
</script>

<template>
  <MainResumeSnake
    class="mca-item"
    :style="{
      '--index': 2,
    }"
  />

  <MainResumeContent
    title="技能专长"
    icon="tabler:device-desktop-code"
    class="mca-item"
    :style="{
      '--index': 1000,
    }"
  >
    <MainResumeFeature title="前端开发:">
      精通
      <BaseCode to="https://vuejs.org/">
        Vue.js 3
      </BaseCode>
      , 深入理解其响应式原理, 虚拟 DOM 机制和开发模式.

      能熟练使用
      <BaseCode to="https://nuxt.com/">
        Nuxt 4
      </BaseCode>
      框架进行开发.

      熟悉
      <BaseCode to="https://react.dev/">
        React
      </BaseCode>
      和
      <BaseCode to="https://nextjs.org/">
        Next.js
      </BaseCode>
      , 具备跨框架开发能力.
    </MainResumeFeature>
    <MainResumeFeature title="编程语言:">
      熟练掌握
      <BaseCode to="https://www.typescriptlang.org/">
        TypeScript
      </BaseCode>
      /
      <BaseCode to="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript">
        JavaScript
      </BaseCode>
      , 理解 JS 底层机制和异步编程模型.

      同时熟练掌握
      <BaseCode to="https://www.python.org/">
        Python
      </BaseCode>
      , 与具备一定的后端开发和数据处理能力.
    </MainResumeFeature>
    <MainResumeFeature title="工程化:">
      熟悉
      <BaseCode to="https://vitejs.dev/">
        Vite
      </BaseCode>
      和
      <BaseCode to="https://webpack.js.org/">
        Webpack
      </BaseCode>
      等构建工具, 熟悉懒加载, 代码分割等优化用户体验的技术.

      习惯使用严格的
      <BaseCode to="https://eslint.org/">
        ESLint
      </BaseCode>
      设置, 保持代码整洁和一致性.
    </MainResumeFeature>
  </MainResumeContent>

  <MainResumeContent
    title="教育背景"
    icon="tabler:school"
    class="mca-item"
  >
    <MainResumeFeature>
      就读于湖南大学人工智能专业, 现在大{{
        ["一", "二", "三", "四"][dayjs().diff("2024-9-1", "year") - (dayjs().month() < 8 ? 1 : 0) + 1]
      }}.
    </MainResumeFeature>
    <MainResumeFeature>
      现就职于湖南大学易千网络文化工作室, 负责
      <BaseCode>湖南大学微生活</BaseCode>
      小程序和工作室其他项目的开发运维工作.
    </MainResumeFeature>
  </MainResumeContent>

  <MainResumeContent
    title="开发概况"
    icon="tabler:report-search"
    class="mca-item"
  >
    <MainResumeFeature>
      <template v-if="wakaInfo === null">
        加载中 ...
      </template>
      <template v-else-if="wakaInfo instanceof Error">
        加载失败
      </template>
      <template v-else>
        自开始正式从事编程工作以来, 总开发时长 <BaseCode>{{ wakaInfo?.time }}</BaseCode>,
        总代码行数 <BaseCode>{{ wakaInfo?.lines }}</BaseCode>,
        具有丰富的开发经验.
      </template>
    </MainResumeFeature>
  </MainResumeContent>
</template>

<style scoped>

</style>
