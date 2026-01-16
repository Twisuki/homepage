<script setup lang="ts">
interface MenuItem {
  label: string
  icon: string
  type: "a" | "menu" | "default"
  to?: string
  items?: MenuItem[]
  callback?: () => void
}

const menuItems: MenuItem[] = [
  {
    label: "Contact",
    icon: "tabler:mail",
    type: "menu",
    items: [
      { label: "Email", icon: "tabler:mail-opened", type: "a", to: "mailto:suyang233@hotmail.com" },
      { label: "Bilibili", icon: "tabler:brand-bilibili", type: "a", to: "https://space.bilibili.com/317707977" },
      { label: "X", icon: "tabler:brand-x", type: "a", to: "https://x.com/suyang_233" },
    ],
  },
  {
    label: "Repo",
    icon: "tabler:brand-github",
    type: "a",
    to: "https://github.com/Twisuki/homepage",
  },
  {
    label: "Theme",
    icon: "tabler:sun-high",
    type: "default",
  },
]
</script>

<template>
  <div class="menu-container">
    <BaseMenuButton
      v-for="(item, index) in menuItems"
      :key="index"
      :label="item.label"
      :icon="item.icon"
      :type="item.to ? 'a' : item.type"
      :to="item.to"
      :items="item.items"
      :callback="item.callback"
    />
  </div>
</template>

<style scoped>
.menu-container {
  position: absolute;
  right: 2rem;
  top: 2rem;
  display: flex;
  justify-content: right;
  gap: 1rem;
}
</style>
