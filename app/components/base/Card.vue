<script setup lang="ts">
interface Props {
  rounded?: boolean | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
}

withDefaults(defineProps<Props>(), {
  flex: false,
  rounded: false,
})

const roundedMap = new Map([
  ["sm", "0.25rem"],
  ["md", "0.375rem"],
  ["lg", "0.5rem"],
  ["xl", "0.75rem"],
  ["2xl", "1rem"],
  ["3xl", "1.5rem"],
  ["full", "50%"],
])
</script>

<template>
  <div
    class="card"
    :style="{
      borderRadius: rounded
        ? rounded === true
          ? roundedMap.get('lg')
          : roundedMap.get(rounded)
        : undefined,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--bg-card);
}
</style>
