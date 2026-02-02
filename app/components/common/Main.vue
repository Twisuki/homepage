<script setup lang="ts">
import type { Item } from "~/components/Desktop/MainSection.vue"

interface Props {
  navItems: Item[]
}

export type Status = "leftIn" | "rightIn" | "leftOut" | "rightOut" | "shown" | "hidden"

const props = defineProps<Props>()
const activeIndex = computed(() => props.navItems.findIndex(item => item.isActived))

const status = ref<Status[]>(
  props.navItems.map(item => item.isActived ? "shown" : "hidden"),
)

watch(activeIndex, (newVal, oldVal) => {
  if (newVal === oldVal) return

  if (newVal > oldVal) {
    status.value[oldVal] = "leftOut"
    status.value[newVal] = "rightIn"
  }
  else {
    status.value[oldVal] = "rightOut"
    status.value[newVal] = "leftIn"
  }

  setTimeout(() => {
    status.value[oldVal] = "hidden"
    status.value[newVal] = "shown"
  }, 400)
})
</script>

<template>
  <BaseCard
    ref="containerRef"
    rounded="xl"
    class="container"
  >
    <MainResume
      class="content mca-contaienr"
      :class="{
        'shown': status[0] === 'shown',
        'hidden': status[0] === 'hidden',
        'left-out': status[0] === 'leftOut',
        'right-out': status[0] === 'rightOut',
        'left-in': status[0] === 'leftIn',
        'right-in': status[0] === 'rightIn',
      }"
      :style="{ '--z-index': (activeIndex + 2) % 3 }"
    />
    <MainProject
      class="content mca-contaienr"
      :class="{
        'shown': status[1] === 'shown',
        'hidden': status[1] === 'hidden',
        'left-out': status[1] === 'leftOut',
        'right-out': status[1] === 'rightOut',
        'left-in': status[1] === 'leftIn',
        'right-in': status[1] === 'rightIn',
      }"
      :style="{ '--z-index': (activeIndex + 1) % 3 }"
    />
    <MainFriends
      class="content mca-contaienr"
      :class="{
        'shown': status[2] === 'shown',
        'hidden': status[2] === 'hidden',
        'left-out': status[2] === 'leftOut',
        'right-out': status[2] === 'rightOut',
        'left-in': status[2] === 'leftIn',
        'right-in': status[2] === 'rightIn',
      }"
      :style="{ '--z-index': (activeIndex) % 3 }"
    />
  </BaseCard>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 1rem;
  overflow: hidden;
}

.content {
  top: 0;
  left: 0;
  width: 100%;
  --z-index: 1;

  z-index: var(--z-index);
}
</style>
