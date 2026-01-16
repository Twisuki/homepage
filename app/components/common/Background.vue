<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.container::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background-color: var(--bg);
  background-image: url("/shizuku.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  filter: blur(2px);
  pointer-events: none;

  transition: background-color var(--duration) ease;
}

.main {
  position: relative;
  display: flex;
  justify-content: center;
}
</style>
