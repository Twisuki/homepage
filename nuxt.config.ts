// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "@nuxt/eslint-config",
    "@nuxtjs/i18n",
    "@nuxt/icon",
  ],
  ssr: true,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  colorMode: {
    preference: "system",
    fallback: "light",
    storage: "localStorage",
  },
  compatibilityDate: "2026-01-16",
  i18n: {
    defaultLocale: "zh",
    locales: [
      { code: "zh", iso: "zh-CN", name: "中文", file: "zh.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
  },
})
