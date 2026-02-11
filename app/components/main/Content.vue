<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div class="content-container">
    <div class="title">
      <Icon
        v-if="icon"
        class="icon"
        :name="icon"
      />
      <span>{{ title }}</span>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  font-size: 1.75rem;
}

.icon {
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 100%;
  height: 4px;
  border-radius: var(--rounded);
  background-color: var(--text-color);
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .content-container {
    gap: 0.875rem;
  }

  .title {
    font-size: 1.5rem;
    gap: 0.875rem;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
