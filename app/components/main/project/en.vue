<script setup lang="ts">

</script>

<template>
  <MainContent
    title="HNU Micro Life MiniProgram"
    icon="tabler:hexagon-number-1"
  >
    <MainFeature>
      Hunan University Microlife Mini Program is a one-stop information service platform for Hunan University students, serving tens of thousands of users with features including class schedule viewing, grade inquiry, and various campus-related services.
    </MainFeature>
    <MainFeature title="Tech Stack:">
      React, Taro, SCSS
    </MainFeature>
    <MainFeature title="My Responsibilities:">
      Responsible for optimizing legacy code and developing new features, including refactoring the course schedule module, optimizing the experiment module display, adding today's to-do functionality, and other UX improvements.
    </MainFeature>
    <MainFeature title="Key Challenges:">
      Legacy code difficult to maintain, diverse user requirements hard to satisfy, and WeChat Mini Program API limitations.
    </MainFeature>
  </MainContent>
  <MainContent
    title="HMO Club Official Website"
    icon="tabler:hexagon-number-2"
  >
    <MainFeature>
      The official site for Hunan University's Minecraft club, also serving as a joint platform for university Minecraft clubs, hosting club activities and content showcase.
      <BaseCode to="https://www.hmomc.cn">
        Go
      </BaseCode>
      <BaseCode to="https://github.com/Twisuki/HMOIndex">
        Repo
      </BaseCode>
    </MainFeature>
    <MainFeature title="Tech Stack: ">
      Nuxt, Nuxt Content(CMS), Vue
    </MainFeature>
    <MainFeature title="My Responsibilities: ">
      - Led the entire website architecture design and development, implementing content management with Nuxt Content.
      <br>
      - Implemented image lazy loading, responsive layout, and multi-device adaptation to enhance user experience.
    </MainFeature>
    <MainFeature title="Key Challenges: ">
      Optimizing the loading performance of numerous images under limited bandwidth conditions, improving first screen loading speed.
    </MainFeature>
  </MainContent>
  <MainContent
    title="HNU Exam Paper Archive"
    icon="tabler:hexagon-number-3"
  >
    <MainFeature>
      Hunan University exam paper resource download platform, providing search, categorization, upload, and download functions.
      <BaseCode to="https://github.com/qnxg/hnu-doc-frontend">
        Repo
      </BaseCode>
    </MainFeature>
    <MainFeature title="Tech Stack: ">
      Next, React, TailwindCSS, shadcn/ui, Axios
    </MainFeature>
    <MainFeature title="My Responsibilities: ">
      - Implemented server-side rendering based on Next SSR, optimizing loading speed and SEO.
      <br>
      - Built component library using shadcn/ui, unifying UI standards.
      <br>
      - Implemented core features including search, filtering, list display, upload/download, as well as user authentication and permission management.
    </MainFeature>
    <MainFeature title="Key Challenges: ">
      Resolved the hydration mismatch issue caused by shadcn/ui components recalculating IDs during hydration.
    </MainFeature>
  </MainContent>
</template>

<style scoped>

</style>
