<script setup lang="ts">

</script>

<template>
  <div class="page-container">
    <DesktopSideSection />
    <DesktopMainSection />
    <DesktopMenuSection />
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: calc(10vh) 2rem 2rem;
  gap: 2rem;
  color: var(--text-color);
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .page-container {
    padding: 10vh 1.5rem 1.5rem;
    gap: 1.5rem;
  }
}
</style>
