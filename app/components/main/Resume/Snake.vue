<script setup lang="ts">

</script>

<template>
  <div class="snake">
    <img
      v-if="$colorMode.value === 'dark'"
      src="https://raw.githubusercontent.com/Twisuki/Twisuki/output/github-contribution-grid-snake-dark.svg"
      alt="Github Snake"
    >
    <img
      v-else
      src="https://raw.githubusercontent.com/Twisuki/Twisuki/output/github-contribution-grid-snake.svg"
      alt="Github Snake"
    >
  </div>
</template>

<style scoped>
.snake {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snake img {
  width: 100%;
  height: auto;
  max-width: 100%;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .snake img {
    max-width: 100%;
  }
}
</style>
