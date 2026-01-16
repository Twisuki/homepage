<script setup lang="ts">
interface MenuItem {
  label: string
  icon: string
  type: "a" | "menu" | "default"
  to?: string
  items?: MenuItem[]
  callback?: () => void
}

const colorMode = useColorMode()

const contactItmes: MenuItem[] = [
  { label: "Email", icon: "tabler:mail-opened", type: "a", to: "mailto:suyang233@hotmail.com" },
  { label: "Bilibili", icon: "tabler:brand-bilibili", type: "a", to: "https://space.bilibili.com/317707977" },
  { label: "X", icon: "tabler:brand-x", type: "a", to: "https://x.com/suyang_233" },
]

const toggleTheme = () => {
  if (colorMode.value === "light") colorMode.value = "dark"
  else colorMode.value = "light"
}
</script>

<template>
  <div class="menu-container">
    <BaseMenuButton
      label="Contact"
      icon="tabler:mail-opened"
      type="menu"
      :items="contactItmes"
    />
    <BaseMenuButton
      label="Repo"
      icon="tabler:brand-github"
      type="a"
      to="https://github.com/Twisuki/homepage"
    />
    <BaseMenuButton
      label="Theme"
      :icon="colorMode.value === 'light' ? 'tabler:sun-high' : 'tabler:moon'"
      type="default"
      :callback="toggleTheme"
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
