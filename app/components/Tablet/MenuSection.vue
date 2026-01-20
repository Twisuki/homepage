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
const { locale, locales, setLocale } = useI18n()

const contactItmes: MenuItem[] = [
  { label: $t("menu.mail"), icon: "tabler:at", type: "a", to: "mailto:suyang233@hotmail.com" },
  { label: $t("menu.github"), icon: "tabler:brand-github", type: "a", to: "https://github.com/Twisuki" },
  { label: $t("menu.bilibili"), icon: "tabler:brand-bilibili", type: "a", to: "https://space.bilibili.com/317707977" },
  { label: $t("menu.x"), icon: "tabler:brand-x", type: "a", to: "https://x.com/suyang_233" },
]

const toggleTheme = () => {
  if (colorMode.value === "light") colorMode.value = "dark"
  else colorMode.value = "light"
}

const switchLanguage = () => {
  const languages = locales.value.filter(item => item.code !== locale.value)
  if (languages.length > 0 && languages[0]) setLocale(languages[0].code)
}
</script>

<template>
  <div class="menu-container">
    <BaseMenuButton
      :label="$t('menu.language')"
      icon="tabler:language"
      type="default"
      :callback="switchLanguage"
    />
    <BaseMenuButton
      :label="$t('menu.theme')"
      :icon="colorMode.value === 'light' ? 'tabler:sun-high' : 'tabler:moon'"
      type="default"
      :callback="toggleTheme"
    />
    <BaseMenuButton
      :label="$t('menu.repo')"
      icon="tabler:brand-github"
      type="a"
      to="https://github.com/Twisuki/homepage"
    />
    <BaseMenuButton
      :label="$t('menu.contact')"
      icon="tabler:mail"
      active-icon="tabler:mail-opened"
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
