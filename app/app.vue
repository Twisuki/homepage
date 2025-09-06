<script setup lang="ts">
import Main from "~/layouts/Main.vue";
import Background from "~/components/base/Background.vue";
</script>

<template>
  <Background />
  <NuxtLayout class="page">
    <Main/>
  </NuxtLayout>
</template>

<style scoped>
.page {
  z-index: 100;
}
</style>
