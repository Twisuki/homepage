<script setup lang="ts">
type CardStatus = "current" | "entering" | "leaving"

let displayed = 0

const cardStatus = ref<CardStatus[]>(["current", "entering", "leaving"])

let timer: number | null = null

const CARD_CHANGE_INTERVAL = 5000

const changeCard = (): void => {
  displayed = (displayed + 1) % 3
  cardStatus.value[displayed] = "current"
  cardStatus.value[(displayed + 1) % 3] = "entering"
  cardStatus.value[(displayed + 2) % 3] = "leaving"
}

const setTimer = () => {
  if (!timer) {
    timer = window.setInterval(changeCard, CARD_CHANGE_INTERVAL)
  }
}

const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleClick = changeCard

const handleMousEnter = clearTimer

const handleMouseLeave = setTimer

onMounted(() => {
  setTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>

<template>
  <div
    class="container"
    @click="handleClick"
    @mouseenter="handleMousEnter"
    @mouseleave="handleMouseLeave"
  >
    <CommonInfoLocation
      class="card-item"
      :class="{
        current: cardStatus[0] === 'current',
        entering: cardStatus[0] === 'entering',
        leaving: cardStatus[0] === 'leaving',
      }"
    />
    <CommonInfoProgress
      class="card-item"
      :class="{
        current: cardStatus[1] === 'current',
        entering: cardStatus[1] === 'entering',
        leaving: cardStatus[1] === 'leaving',
      }"
    />
    <CommonInfoDate
      class="card-item"
      :class="{
        current: cardStatus[2] === 'current',
        entering: cardStatus[2] === 'entering',
        leaving: cardStatus[2] === 'leaving',
      }"
    />
  </div>
</template>

<style scoped>
.container {
  width: 15rem;
  height: 4rem;
  perspective: 1000px;
  position: relative;
}

.card-item {
  position: absolute;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.current {
  transform: rotateX(0deg);
  transition:
    transform var(--duration-long) ease,
    opacity var(--duration-long) ease;
  z-index: 2;
}

.leaving {
  transform: translateY(-50%) rotateX(90deg);
  transition:
    transform var(--duration-long) ease,
    opacity var(--duration-long) ease var(--duration-long);
  opacity: 0;
  z-index: 1;
}

.entering {
  transform: translateY(50%) rotateX(-90deg);
  opacity: 0;
  z-index: 1;
}
</style>
