<script setup lang="ts">
import type { Item } from "~/components/Desktop/MainSection.vue"

interface Props {
  navItems: Item[]
  direction: "left" | "right"
}

const props = defineProps<Props>()

const activeIndex = computed(() => props.navItems.findIndex(item => item.isActived))

// 定义组件映射
const componentMap = {
  resume: resolveComponent("MainResume"),
  projects: resolveComponent("MainProject"),
  friends: resolveComponent("MainFriends"),
} as const

// 获取当前激活的组件
const activeComponent = computed(() => {
  const item = props.navItems[activeIndex.value]
  return item ? componentMap[item.name as keyof typeof componentMap] : null
})

// 根据导航方向计算动画类名
const transitionName = computed(() => {
  return props.direction === "left" ? "to-left" : "to-right"
})
</script>

<template>
  <BaseCard
    rounded="xl"
    class="container"
  >
    <Transition
      :name="transitionName"
      mode="out-in"
    >
      <component
        :is="activeComponent"
        :key="activeIndex"
        class="content"
      />
    </Transition>
  </BaseCard>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  position: relative;
  min-height: 400px;
}

.content {
  width: 100%;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style>
/* Vue Transition 动画 */

.to-left-enter-active,
.to-left-leave-active {
  transition: all var(--duration) ease;
}

.to-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.to-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.to-left-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.to-right-enter-active,
.to-right-leave-active {
  transition: all var(--duration) ease;
}

.to-right-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.to-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.to-right-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
