<script setup lang="ts">
</script>

<template>
  <div class="personal">
    <div class="avatar">
      <img src="/avatar.png" alt="Twisuki"/>
    </div>
    <div class="content">
      <div class="content__1">大家好这里是</div>
      <div class="content__2">Twisuki ~</div>
    </div>
  </div>
</template>

<style scoped>
.personal {
  height: 8rem;
  background-color: var(--bg-card);
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
}

.avatar {
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar img {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
}

.content {
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.content__1 {
  font-size: 1.75rem;
}

.content__2 {
  font-size: 2rem;
}
</style>
