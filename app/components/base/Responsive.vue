<script setup lang="ts">
interface Props {
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl"
}

const breakpointMap = new Map<string, number>([
  ["sm", 640],
  ["md", 768],
  ["lg", 1024],
  ["xl", 1280],
  ["2xl", 1536],
])

const props = withDefaults(defineProps<Props>(), {
  breakpoint: "md",
})

const isDesktop = ref(false)
let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia(`(min-width: ${breakpointMap.get(props.breakpoint) || 768 + 1}px)`)
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener("change", handleMediaChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", handleMediaChange)
})

const handleMediaChange = (e: MediaQueryListEvent) => {
  isDesktop.value = e.matches
}
</script>

<template>
  <slot
    v-if="isDesktop"
    name="desktop"
  />
  <slot
    v-else
    name="tablet"
  />
</template>
