<script setup lang="ts">
interface Props {
  title?: string
  content?: string
}

withDefaults(defineProps<Props>(), {
  title: "",
  content: "",
})
</script>

<template>
  <div class="feature">
    <span class="index" />
    <span class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </span>
    <span class="content">
      <slot name="content">
        <slot>
          {{ content }}
        </slot>
      </slot>
    </span>
  </div>
</template>

<style scoped>
.feature {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  font-size: 1rem;
}

.title {
  display: flex;
  align-items: center;
}

.index {
  position: absolute;
  width: 8px;
  height: 8px;
  left: 0;
  top: 0.5rem;
  background-color: var(--text-color);
  border-radius: var(--rounded-full);
}

.content {
  flex: 1;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .feature {
    gap: 0.4rem;
  }

  .title {
    height: 1.5rem;
    font-size: 1rem;
  }

  .index {
    width: 7px;
    height: 7px;
  }

  .content {
    font-size: 0.9rem;
  }
}
</style>
