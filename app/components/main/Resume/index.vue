<script setup lang="ts">
const wakaInfo = ref<WakaInfo | null | Error>(null)

onMounted(() => {
  getWakaInfo()
    .then(response => wakaInfo.value = response)
    .catch(error => wakaInfo.value = error)
})
</script>

<template>
  <div class="resume">
    <BaseLanguage>
      <template #zh>
        <MainResumeZh :waka-info="wakaInfo" />
      </template>
      <template #en>
        <MainResumeEn :waka-info="wakaInfo" />
      </template>
    </BaseLanguage>
  </div>
</template>

<style scoped>

</style>
