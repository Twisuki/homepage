<script setup lang="ts">
import type { Item } from "~/components/Desktop/MainSection.vue"

interface Props {
  navItems: Item[]
}

const props = defineProps<Props>()
const activeItem = computed(() => props.navItems.find(item => item.isActived)?.name)
</script>

<template>
  <div class="container">
    <MainResume v-if="activeItem === 'resume'" />
    <MainProject v-if="activeItem === 'projects'" />
    <MainFriends v-if="activeItem === 'friends'" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 2rem;
  background-color: var(--bg-card);
}
</style>
