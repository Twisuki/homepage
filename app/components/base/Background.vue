<script setup lang="ts">

</script>

<template>
  <div class="background" />
</template>

<style scoped>
.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("/shizuku.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  z-index: var(--z-bg);
}

.background:before {
  content: '';
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-cover);
}
</style>
