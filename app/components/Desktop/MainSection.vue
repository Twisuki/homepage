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

const handleSwitch = (target: number) => {
  navItems.value.forEach((item, index) => {
    item.isActived = index === target
  })
}
</script>

<template>
  <div class="main-container">
    <div class="title">
      <CommonWelcome />
      <CommonSubtitle />
    </div>
    <CommonNavbar
      :nav-items="navItems"
      @switch="handleSwitch"
    />
    <CommonMain :nav-items="navItems" />
  </div>
</template>

<style scoped>
.main-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1.5rem;
}
</style>
