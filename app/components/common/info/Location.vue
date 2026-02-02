<script setup lang="ts">

</script>

<template>
  <CommonInfoCard class="item">
    <span>
      <Icon name="tabler:map-pin" />
      {{ $t("info.location.city") }}
    </span>
    <span>
      <Icon name="tabler:building-bank" />
      {{ $t("info.location.school") }}
    </span>
  </CommonInfoCard>
</template>

<style scoped>
.item span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .item span {
    font-size: 1rem;
    gap: 0.4rem;
  }
}

/* 小屏幕适配 (<640px) */
@media (max-width: 640px) {
  .item span {
    font-size: 0.95rem;
    gap: 0.375rem;
  }
}
</style>
