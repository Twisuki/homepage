<script setup lang="ts">
import Holiday from "~/components/time/Holiday.vue"
import { formattedTime, formattedDate } from "~/components/time/FormattedTime"
</script>

<template>
  <div class="time">
    <div class="time__1">
      {{ formattedTime }}
    </div>
    <div class="time__2">
      {{ formattedDate }}
    </div>
    <div class="holiday">
      <Holiday />
    </div>
  </div>
  <div class="time--hovered" />
</template>

<style scoped>
.time {
  width: 10rem;
  height: 10rem;
  background-color: var(--bg-card);
  border-radius: var(--radius);
}

.time__1 {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1.5rem;
}

.time__2 {
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
}

.holiday {
  font-size: 0.75rem;
  text-align: center;
  margin-top: 0.5rem;
}

.time--hovered {
  display: none;
}
</style>
