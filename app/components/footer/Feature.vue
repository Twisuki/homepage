<script setup lang="ts">
import { ref } from 'vue';

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
const showDropdown = ref(false);
let hideTimeout:number | null = null;

const openLink = (link?: string) => {
  if (link) window.open(link);
}

const handleMouseEnter = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  showDropdown.value = true;
}

const handleMouseLeave = () => {
  hideTimeout = window.setTimeout(() => {
    showDropdown.value = false;
  }, 300);
}
</script>

<template>
  <div
      class="feature"
      @click="openLink(link)"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
  >
    <span class="feature__icon">
      <i :class=icon></i>
    </span>
    <span class="feature__title">{{ title }}</span>
    <div
        class="dropdown__container"
        v-if="items && showDropdown"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
      <div
          class="dropdown"
          v-for="(item, index) in items"
          :key="index"
          :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <span class="dropdown__icon">
          <i :class=item.icon></i>
        </span>
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
  cursor: pointer;
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
  overflow: hidden;
}

.dropdown {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  font-size: large;
  padding-left: 1rem;
  gap: 0.5rem;
  position: relative;
  opacity: 0;  /* 初始透明 */
  transform: translateX(20px);  /* 初始向右偏移 */
  animation: slideIn 0.3s ease-out forwards;  /* 应用动画 */
}

.dropdown:hover {
  background-color: var(--bg-card-hover);
  cursor: pointer;
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

.dropdown__icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 滑动 + 淡入动画 */
@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
