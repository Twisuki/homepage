<script setup lang="ts">
const displayed = ref<number>(0)

const handleClick = () => {
  displayed.value = (displayed.value + 1) % 3
}
</script>

<template>
  <BaseCard
    rounded
    class="container"
    @click="handleClick"
  >
    <CommonInfoLocation v-show="displayed === 0" />
    <CommonInfoProgress v-show="displayed === 1" />
    <CommonInfoDate v-show="displayed === 2" />
  </BaseCard>
</template>

<style scoped>
.container {
  width: 15rem;
  height: 4rem;
}
</style>
