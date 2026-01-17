<script setup lang="ts">
const semester = ref<Semester | null>(getSemester())

const PROGRESS_LENGTH = 16

const progress = (current: number, total: number) => {
  const filledLength = Math.round(PROGRESS_LENGTH * current / total)
  const emptyLength = PROGRESS_LENGTH - filledLength
  const bar = ">".repeat(filledLength) + "-".repeat(emptyLength)
  return `[${bar}] ${current}/${total}`
}
</script>

<template>
  <CommonInfoCard class="item">
    <template v-if="semester">
      <span>
        {{ semester.name }}
      </span>
      <span>
        {{ progress(semester.currentWeek, semester.weeks) }}
      </span>
    </template>
    <template v-else>
      {{ $t("info.progress.failed") }}
    </template>
  </CommonInfoCard>
</template>

<style scoped>
.item span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
</style>
