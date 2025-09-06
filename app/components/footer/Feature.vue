<script setup lang="ts">
interface Feature {
  title: string;
  icon?: string;
  link?: string;
  items?: Array<{
    title: string;
    link: string;
    icon?: string;
  }>;
}

const props = defineProps<Feature>();

const openLink = (link?: string) => {
  if (link) window.open(link);
}
</script>

<template>
  <div class="feature" @click="openLink(link)">
    <i :class=icon class="feature__icon"></i>
    <span class="feature__title">{{ title }}</span>
    <div class="dropdown__container" v-if="items">
      <div class="dropdown" v-for="(item, index) in items" :key="index" v-bind="item">
        <i :class=item.icon class="dropdown__icon"></i>
        <span class="dropdown__title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-card);
  border-radius: var(--radius);
  gap: 0.5rem;
  position: relative;
}

.feature:hover {
  background-color: var(--bg-card-hover);
}

.feature__icon {
  font-size: xx-large;
}

.feature__title {
  font-size: x-large;
}

.dropdown__container {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  background-color: var(--bg-card);
  border-radius: 8px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: initial;
}

.dropdown {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 1rem;
  font-size: large;
  gap: 0.5rem;
  position: relative;
}

.dropdown::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1rem;
  width: calc(100% - 2rem);
  height: 1px;
  background-color: var(--bg-card);
}

.dropdown:last-child::after {
  display: none;
}
</style>
