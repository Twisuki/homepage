<script setup lang="ts">
interface Props {
  to?: string
}

defineProps<Props>()
</script>

<template>
  <a
    class="code"
    :href="to"
    target="_blank"
  >
    <slot />
  </a>
</template>

<style scoped>
.code {
  display: inline-block;
  padding: 0 0.75rem;
  margin: 0.125rem 0;
  cursor: pointer;
  border-radius: var(--rounded-sm);
  background-color: var(--bg-button);
  color: var(--text-color);
  text-decoration: none;

  &:hover {
    background-color: var(--bg-button-hover);
  }
}
</style>
