<script setup lang="ts">
const articles = ref<Article[] | null>(null)

const BLOG = "https://blog.twis.uk"

const handleClick = (url: string) => {
  window.open(url, "_blank")
}

onMounted(() => {
  getBlogArticles(5)
    .then(response => articles.value = response)
})
</script>

<template>
  <BaseCard
    rounded
    class="container"
  >
    <div class="article-wapper">
      <template v-if="articles">
        <div
          v-for="article in articles"
          :key="article.title"
          class="article"
          @click="handleClick(article.url)"
        >
          {{ article.title }}
          <span>{{ article.date }}</span>
        </div>
      </template>
      <div
        v-else
        class="article"
      >
        加载中...
      </div>
    </div>
    <div class="bottom">
      <a
        class="button"
        :href="BLOG"
        target="_blank"
      >
        Blog 主站
      </a>
    </div>
  </BaseCard>
</template>

<style scoped>
.container {
  width: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-wapper {
  position: relative;
  width: 12rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-wapper::before {
  content: "";
  position: absolute;
  left: -0.5rem;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: #ffffff;
}

.article {
  position: relative;
  width: 12rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  border-radius: var(--rounded);
  cursor: pointer;

  &:hover {
    background-color: var(--bg-card);
  }

  span {
    font-size: 0.875rem;
  }
}

.article::before {
  content: "";
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translate(1px, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: var(--rounded-full);
  background-color: #ffffff;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  width: 8rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--rounded);
  background-color: var(--bg-button);

  &:hover {
    background-color: var(--bg-button-hover);
  }

  &:active {
    background-color: var(--bg-button-active);
  }
}
</style>
