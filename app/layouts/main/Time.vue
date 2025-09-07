<script setup lang="ts">
import Holiday from "~/components/time/Holiday.vue"
</script>

<template>
  <div class="time">
    <span class="holiday"><Holiday /></span>
  </div>
</template>

<style scoped>
.time {
  width: 10rem;
  height: 10rem;
  background-color: var(--bg-card);
  border-radius: var(--radius);
}

.holiday {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
