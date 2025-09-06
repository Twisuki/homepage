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
    title: "Projects",
    icon: "fa-solid fa-code-branch",
    items: [
      {
        title: "Homepage",
        link: "https://github.com/Twisuki/homepage",
        icon: "fa-solid fa-house"
      },
      {
        title: "Blog",
        link: "https://github.com/Twisuki/blog",
        icon: "fa-solid fa-blog"
      },
      {
        title: "Blog",
        link: "https://github.com/Twisuki/blog",
        icon: "fa-solid fa-blog"
      },
      {
        title: "Blog",
        link: "https://github.com/Twisuki/blog",
        icon: "fa-solid fa-blog"
      },
      {
        title: "Blog",
        link: "https://github.com/Twisuki/blog",
        icon: "fa-solid fa-blog"
      },
    ],
  },
  {
    title: "Contact",
    icon: "fa-regular fa-paper-plane",
    link: "https://github.com/Twisuki"
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
