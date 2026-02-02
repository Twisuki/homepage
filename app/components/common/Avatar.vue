<script setup lang="ts">

</script>

<template>
  <div class="avatar">
    <img
      src="/avatar.png"
      alt="Avatar"
    >
  </div>
</template>

<style scoped>
.avatar {
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 12rem;
  height: 12rem;
  border-radius: var(--rounded-full);
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .avatar {
    width: 13rem;
    height: 13rem;
  }

  img {
    width: 10rem;
    height: 10rem;
  }
}
</style>
