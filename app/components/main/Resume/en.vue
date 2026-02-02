<script setup lang="ts">
import dayjs from "dayjs"

defineProps<{
  wakaInfo: WakaInfo | null | Error
}>()
</script>

<template>
  <MainResumeSnake class="section" />

  <MainResumeContent
    title="Technical Skills"
    icon="tabler:device-desktop-code"
    class="section"
  >
    <MainResumeFeature title="Frontend:">
      Proficient in
      <BaseCode to="https://vuejs.org/">
        Vue.js 3
      </BaseCode>
      , with deep understanding of its reactivity system, virtual DOM mechanism, and development patterns.

      Skilled in using
      <BaseCode to="https://nuxt.com/">
        Nuxt 4
      </BaseCode>
      framework for development.

      Familiar with
      <BaseCode to="https://react.dev/">
        React
      </BaseCode>
      and
      <BaseCode to="https://nextjs.org/">
        Next.js
      </BaseCode>
      , capable of cross-framework development.
    </MainResumeFeature>
    <MainResumeFeature title="Languages:">
      Highly proficient in
      <BaseCode to="https://www.typescriptlang.org/">
        TypeScript
      </BaseCode>
      /
      <BaseCode to="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript">
        JavaScript
      </BaseCode>
      , with understanding of JavaScript's underlying mechanisms and asynchronous programming models.

      Also proficient in
      <BaseCode to="https://www.python.org/">
        Python
      </BaseCode>
      , with backend development and data processing capabilities.
    </MainResumeFeature>
    <MainResumeFeature title="Practices:">
      Familiar with build tools like
      <BaseCode to="https://vitejs.dev/">
        Vite
      </BaseCode>
      and
      <BaseCode to="https://webpack.js.org/">
        Webpack
      </BaseCode>
      , experienced with techniques like lazy loading and code splitting to optimize user experience.

      Accustomed to strict
      <BaseCode to="https://eslint.org/">
        ESLint
      </BaseCode>
      configurations to maintain clean and consistent code.
    </MainResumeFeature>
  </MainResumeContent>

  <MainResumeContent
    title="Education Background"
    icon="tabler:school"
    class="section"
  >
    <MainResumeFeature>
      Currently a {{
        ["first", "second", "third", "fourth"][dayjs().diff("2024-9-1", "year") - (dayjs().month() < 8 ? 1 : 0) + 1]
      }} - year student majoring in Artificial Intelligence at Hunan University
    </MainResumeFeature>
    <MainResumeFeature>
      Currently working at Hunan University's Yiqian Network Culture Studio, responsible for developing and maintaining the
      <BaseCode>HNU Micro Life</BaseCode>
      mini-program and other studio projects.
    </MainResumeFeature>
  </MainResumeContent>

  <MainResumeContent
    title="Development Overview"
    icon="tabler:report-search"
    class="section"
  >
    <MainResumeFeature>
      <template v-if="wakaInfo === null">
        Loading...
      </template>
      <template v-else-if="wakaInfo instanceof Error">
        Failed to load
      </template>
      <template v-else>
        Since officially starting programming work, total development time is
        <BaseCode>{{ wakaInfo.time || "..." }}</BaseCode>,
        with total lines of code at
        <BaseCode>{{ wakaInfo.lines || "..." }}</BaseCode>,
        demonstrating extensive development experience.
      </template>
    </MainResumeFeature>
  </MainResumeContent>
</template>

<style scoped>

</style>
