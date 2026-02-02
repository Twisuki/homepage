<script setup lang="ts">
export interface Item {
  name: string
  isActived: boolean
}

const navItems = ref<Item[]>([
  { name: "resume", isActived: true },
  { name: "projects", isActived: false },
  { name: "friends", isActived: false },
])

// 切换方向：left 表示向左导航（索引增大），right 表示向右导航（索引减小）
const switchDirection = ref<"left" | "right">("left")

const handleSwitch = (target: number) => {
  const currentIndex = navItems.value.findIndex(item => item.isActived)

  // 计算方向
  if (target > currentIndex) {
    switchDirection.value = "left"
  }
  else if (target < currentIndex) {
    switchDirection.value = "right"
  }

  // 更新激活状态
  navItems.value.forEach((item, index) => {
    item.isActived = index === target
  })
}
</script>

<template>
  <div class="main-container">
    <CommonNavbar
      :nav-items="navItems"
      @switch="handleSwitch"
    />
    <CommonMain
      :nav-items="navItems"
      :direction="switchDirection"
    />
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 小屏幕适配 (<640px) */
@media (max-width: 640px) {
  .main-container {
    gap: 1.5rem;
  }
}

/* 中等移动端屏幕适配 (640px - 768px) */
@media (min-width: 640px) and (max-width: 768px) {
  .main-container {
    gap: 1.75rem;
  }
}
</style>
