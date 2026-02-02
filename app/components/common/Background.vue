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
  height: 100vh;
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
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  justify-content: center;
}

/* 小屏幕适配 - 调整背景图位置 */
@media (max-width: 768px) {
  .container::before {
    background-position: center center;
    background-size: cover;
  }
}

/* 移动端滚动条优化 */
@media (max-width: 768px) {
  .main {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
