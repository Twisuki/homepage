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
    <span class="title">
      <span class="index" />
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
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.title {
  display: flex;
  height: 1.75rem;
  align-items: center;
  font-size: 1.125rem;
  gap: 0.5rem;
}

.index {
  width: 8px;
  height: 8px;
  background-color: var(--text-color);
  border-radius: var(--rounded-full);
}

.content {
  flex: 1;
  font-size: 1rem;
}
</style>
