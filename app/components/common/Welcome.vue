<script setup lang="ts">
import { reactive, onMounted } from "vue"

interface Message {
  prefix: string
  name: string
  suffix: string
}

const messages: Message[] = Array(2).fill(null).map((_, index) => ({
  prefix: $t(`welcome.hello_${index + 1}.prefix`),
  name: $t(`welcome.hello_${index + 1}.name`),
  suffix: $t(`welcome.hello_${index + 1}.suffix`),
}))

const displayed = reactive<Message[]>(
  messages.map(() => ({ prefix: "", name: "", suffix: "" })),
)

const CHAR_DELAY = 100

const typePart = async (index: number, key: "prefix" | "name" | "suffix", text: string) => {
  if (!text || !displayed[index]) return
  const target = displayed[index]
  target[key] = ""
  for (const char of text) {
    target[key] += char
    await sleep(CHAR_DELAY)
  }
}

const typeMessage = async (index: number) => {
  const msg = messages[index]
  if (!msg) return
  await typePart(index, "prefix", String(msg.prefix))
  await typePart(index, "name", String(msg.name))
  await typePart(index, "suffix", String(msg.suffix))
}

onMounted(() => {
  typeMessage(0)
  typeMessage(1)
})
</script>

<template>
  <BaseCard
    rounded="xl"
    class="container"
  >
    <p class="title title-1">
      {{ displayed[0]?.prefix }}
      <span>{{ displayed[0]?.name }}</span>
      {{ displayed[0]?.suffix }}
    </p>
    <BaseResponsive>
      <template #desktop>
        <p class="title title-2">
          {{ displayed[1]?.prefix }}
          <span>{{ displayed[1]?.name }}</span>
          {{ displayed[1]?.suffix }}
        </p>
      </template>
    </BaseResponsive>
  </BaseCard>
</template>

<style scoped>
.container {
  width: 100%;
  height: 6rem;
  background-color: var(--bg-card);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  cursor: default;
}

.title-1 {
  font-size: 2rem;
}

.title-2 {
  font-size: 1.5rem;
}

.title span {
  font-weight: bold;
}

/* 中等屏幕适配 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 100%;
    height: 5.5rem;
    padding: 0 1.5rem;
  }

  .title-1 {
    font-size: 1.75rem;
  }

  .title-2 {
    font-size: 1.25rem;
  }
}
</style>
