<script setup lang="ts">

</script>

<template>
  <div class="page-container">
    <TabletHeroSection />
    <TabletMainSection />
    <TabletMenuSection />
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1024px;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 4rem;
  gap: 2rem;
  color: var(--text-color);
}

/* 小屏幕适配 (<640px) */
@media (max-width: 640px) {
  .page-container {
    padding: 4vh 1rem 1rem;
    gap: 1.5rem;
    flex-direction: column;
  }
}

/* 中等移动端屏幕适配 (640px - 768px) */
@media (min-width: 640px) and (max-width: 768px) {
  .page-container {
    padding: 5vh 1.5rem 1.5rem;
    gap: 1.75rem;
    flex-direction: column;
  }
}
</style>
