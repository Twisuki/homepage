<script setup lang="ts">

</script>

<template>
  <div class="hero-container">
    <CommonAvatar />
    <div class="title">
      <CommonWelcome />
      <CommonSubtitle />
    </div>
    <CommonInfo />
  </div>
</template>

<style scoped>
.hero-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* 小屏幕适配 (<640px) */
@media (max-width: 640px) {
  .hero-container {
    gap: 1.5rem;
  }

  .title {
    width: 100%;
  }
}

/* 中等移动端屏幕适配 (640px - 768px) */
@media (min-width: 640px) and (max-width: 768px) {
  .hero-container {
    gap: 1.75rem;
  }
}
</style>
