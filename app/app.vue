<script setup lang="ts">
const title = "苏阳 ♡ | 主页"
const description = "一只喜欢到处贴贴的小猫娘~ / 前端工程师 / 全栈爱好者"

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
})
</script>

<template>
  <CommonBackground>
    <BaseResponsive>
      <template #desktop>
        <Desktop />
      </template>
      <template #tablet>
        <Table />
      </template>
    </BaseResponsive>
  </CommonBackground>
</template>
