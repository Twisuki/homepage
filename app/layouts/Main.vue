<script setup lang="ts">
import Personal from "~/layouts/main/Personal.vue";
import Time from "~/layouts/main/Time.vue";
import Footer from "~/layouts/main/Footer.vue";
</script>

<template>
  <div class="main">
    <div class="header">
      <Personal/>
      <Time/>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
.main {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: var(--z-main);
}

.header {
  width: 100%;
  display: flex;
  gap: 1rem;
}
</style>
