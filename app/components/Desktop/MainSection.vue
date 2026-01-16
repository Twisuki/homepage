<script setup lang="ts">

</script>

<template>
  <div class="main-container">
    <div class="title">
      <CommonWelcome />
      <CommonSubtitle />
    </div>
    <CommonNavbar />
    <CommonMain />
  </div>
</template>

<style scoped>
.main-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1.5rem;
}
</style>
