<script setup lang="ts">
const displayed = ref<number>(0)

let timer: number | null = null

const CARD_CHANGE_INTERVAL = 5000

const handleClick = () => {
  displayed.value = (displayed.value + 1) % 3
}

const handleMousEnter = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleMouseLeave = () => {
  if (!timer) {
    timer = window.setInterval(() => {
      displayed.value = (displayed.value + 1) % 3
    }, CARD_CHANGE_INTERVAL)
  }
}

onMounted(() => {
  timer = window.setInterval(() => {
    displayed.value = (displayed.value + 1) % 3
  }, CARD_CHANGE_INTERVAL)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <BaseCard
    rounded
    class="container"
    @click="handleClick"
    @mouseenter="handleMousEnter"
    @mouseleave="handleMouseLeave"
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
