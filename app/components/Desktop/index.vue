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
</style>
