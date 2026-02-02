<script setup lang="ts">

</script>

<template>
  <BaseCard
    rounded
    class="warpper"
  >
    <slot />
  </BaseCard>
</template>

<style scoped>
.warpper {
  width: 15rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .warpper {
    width: 13rem;
    height: 3.5rem;
  }
}
</style>
