<script setup lang="ts">

</script>

<template>
  <div class="menu-container">
    <BaseMenuButton
      key="1"
      label="Theme"
      icon="tabler:mail"
      type="default"
    />
    <BaseMenuButton
      key="1"
      label="Theme"
      icon="tabler:brand-github"
      type="a"
      to="https://github.com/Twisuki/homepage"
    />
    <BaseMenuButton
      key="1"
      label="Theme"
      icon="tabler:sun-high"
      type="default"
    />
  </div>
</template>

<style scoped>
.menu-container {
  position: absolute;
  right: 2rem;
  top: 2rem;
  display: flex;
  justify-content: right;
  gap: 1rem;
}
</style>
