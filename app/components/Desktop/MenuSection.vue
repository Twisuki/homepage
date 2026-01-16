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
  { label: "Email", icon: "tabler:at", type: "a", to: "mailto:suyang233@hotmail.com" },
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
      label="主题"
      :icon="colorMode.value === 'light' ? 'tabler:sun-high' : 'tabler:moon'"
      type="default"
      :callback="toggleTheme"
    />
    <BaseMenuButton
      label="仓库"
      icon="tabler:brand-github"
      type="a"
      to="https://github.com/Twisuki/homepage"
    />
    <BaseMenuButton
      label="联系方式"
      icon="tabler:mail"
      type="menu"
      :items="contactItmes"
    />
  </div>
</template>

<style scoped>
.menu-container {
  position: fixed;
  right: 2rem;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .menu-container {
    flex-direction: row-reverse;
  }
}
</style>
