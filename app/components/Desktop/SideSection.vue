<script setup lang="ts">

</script>

<template>
  <div class="side-container">
    <CommonAvatar />
    <CommonInfo />
    <CommonBlog />
  </div>
</template>

<style scoped>
.side-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .side-container {
    gap: 1.5rem;
    flex: 0 0 auto;
    min-width: 15rem;
  }
}
</style>
