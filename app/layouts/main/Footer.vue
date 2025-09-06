<script setup lang="ts">
import Feature from "~/components/footer/Feature.vue";

interface Feature {
  title: string;
  icon?: string;
  link?: string;
  items?: Array<{
    title: string;
    link: string;
    icon?: string;
  }>;
}

const featureList: Feature[] = [
  {
    title: "我的项目",
    icon: "fa-solid fa-code-branch",
    items: [
      {
        title: "个人主页",
        link: "https://twis.uk",
        icon: "fa-solid fa-house"
      },
      {
        title: "苏喵博客",
        link: "https://blog.twis.uk",
        icon: "fa-solid fa-blog"
      },
      {
        title: "学生手册",
        link: "https://app.twis.uk",
        icon: "fa-solid fa-book"
      },
      {
        title: "弦月档案",
        link: "https://hxy.twis.uk",
        icon: "fa-solid fa-box-archive"
      },
    ],
  },
  {
    title: "联系方式",
    icon: "fa-regular fa-paper-plane",
    items: [
      {
        title: "邮箱",
        link: "mailto://suyang233@hotmail.com",
        icon: "fa-solid fa-envelope"
      },
      {
        title: "B站",
        link: "https://space.bilibili.com/317707977",
        icon: "fa-brands fa-bilibili"
      },
      {
        title: "Twitter",
        link: "https://x.com/suyang_233",
        icon: "fa-brands fa-x-twitter"
      }
    ],
  },
  {
    title: "Github",
    icon: "fa-brands fa-github",
    link: "https://github.com/Twisuki"
  },
];
</script>

<template>
  <div class="footer">
    <Feature v-for="feature in featureList" v-bind="feature" class="feature"/>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature {
  flex: 1;
}
</style>
