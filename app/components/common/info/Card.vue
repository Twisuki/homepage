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
</style>
