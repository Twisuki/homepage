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
    <CommonNavbar
      :nav-items="navItems"
      @switch="handleSwitch"
    />
    <CommonMain :nav-items="navItems" />
  </div>
</template>

<style scoped>

</style>
