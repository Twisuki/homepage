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

</style>
