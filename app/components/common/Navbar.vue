<script setup lang="ts">
import type { Item } from "~/components/Desktop/MainSection.vue"

interface Props {
  navItems: Item[]
}

type UnderlineStatus = "toLeft" | "toRight" | "static"

const props = defineProps<Props>()
const emit = defineEmits(["switch"])

const leftIndex = ref(0)
const rightIndex = ref(0)
const underlineStatus = ref<UnderlineStatus>("static")

const handleClick = (target: number) => {
  const from = props.navItems.findIndex(item => item.isActived)

  emit("switch", target)

  underlineStatus.value = (() => {
    if (from < target) return "toLeft"
    if (from > target) return "toRight"
    return "static"
  })()

  leftIndex.value = from < target ? from : target
  rightIndex.value = from >= target ? from : target

  setTimeout(() => {
    leftIndex.value = target
    rightIndex.value = target

    setTimeout(() => {
      underlineStatus.value = "static"
    }, 200)
  }, 200)
}
</script>

<template>
  <div class="navbar">
    <div
      class="container"
      :style="{
        '--start-index': leftIndex,
        '--end-index': rightIndex,
      }"
    >
      <BaseCard
        v-for="(item, index) in navItems"
        :key="index"
        rounded="xl"
        class="item"
        @click="handleClick(index)"
      >
        {{ $t(`navbar.${item.name}`) }}
      </BaseCard>
    </div>
    <BaseCard
      rounded
      class="underline"
      :class="{
        'to-left': underlineStatus === 'toLeft',
        'to-right': underlineStatus === 'toRight',
      }"
    />
  </div>
</template>

<style scoped>
.navbar {
  width: 100%;
}

.container {
  --item-width: calc((100% - 2rem) / 3);
  --gap: 1rem;
  --start-index: 0;
  --end-index: 1;
  --position: calc((var(--item-width) + var(--gap)) * var(--start-index));
  --width: calc(
    calc(var(--item-width) * (var(--end-index) - var(--start-index) + 1)) +
      calc(var(--gap) * (var(--end-index) - var(--start-index)))
  );

  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.item {
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: var(--bg-button-active);
  }
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: var(--position);
  width: var(--width);
  height: 100%;
  background-color: var(--bg-button-active);
  border-radius: var(--rounded-xl);
  z-index: 0;
  transition:
    width var(--duration) ease,
    left var(--duration) ease;
}

.underline {
  position: relative;
  width: 100%;
  height: 4px;
  overflow: hidden;
}

.underline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background-color: var(--bg-button-active);
  border-radius: var(--rounded-xl);
}

.underline.to-right::before {
  animation: toRight calc(var(--duration) * 2) forwards;
}

.underline.to-left::before {
  animation: toLeft calc(var(--duration) * 2) forwards;
}

@keyframes toRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes toLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
