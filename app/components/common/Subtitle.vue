<script setup lang="ts">
const message = Array(2).fill(null).map((_, index) => $t(`subtitle.title_${index + 1}`)).join(" | ")

const displayed = ref<string>("")

const CHAR_DELAY = 50

const typeMessage = async () => {
  displayed.value = ""
  for (const char of message) {
    displayed.value += char
    await sleep(CHAR_DELAY)
  }
}
onMounted(() => {
  typeMessage()
})
</script>

<template>
  <BaseCard
    rounded="xl"
    class="container"
  >
    {{ displayed }}
  </BaseCard>
</template>

<style scoped>
.container {
  width: 100%;
  height: 4rem;
  font-size: 1.5rem;
  text-align: center;
  line-height: 4rem;
  cursor: default;
}
</style>
