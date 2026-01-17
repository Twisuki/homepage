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
</style>
