<script setup lang="ts">
const semester = ref<Semester | null>(getSemester())

const PROGRESS_LENGTH = 16

const SEMESTER_TYPES_MAP = new Map([
  ["autumn", $t("info.progress.autumn")],
  ["winter", $t("info.progress.winter")],
  ["spring", $t("info.progress.spring")],
  ["summer1", $t("info.progress.summer1")],
  ["holiday", $t("info.progress.holiday")],
  ["summer2", $t("info.progress.summer2")],
])

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
      <span class="name">
        {{ semester.year }} {{ SEMESTER_TYPES_MAP.get(semester.type) }}
      </span>
      <span class="progress">
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
}

.name {
  font-size: 0.875rem;
}

.progress {
  font-size: 1rem;
  font-weight: bold;
}
</style>
