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

const progress = (day: number, weeks: number) => {
  const week = Math.ceil(day / 7)
  const days = weeks * 7
  const filledLength = Math.round(PROGRESS_LENGTH * day / days)
  const bar = ("=".repeat(filledLength) + ">").padEnd(PROGRESS_LENGTH, "-").slice(0, PROGRESS_LENGTH)
  return `[${bar}] ${week}/${weeks}`
}
</script>

<template>
  <CommonInfoCard class="item">
    <template v-if="semester">
      <span class="name">
        {{ semester.year }} {{ SEMESTER_TYPES_MAP.get(semester.type) }}
      </span>
      <span class="progress">
        {{ progress(semester.day, semester.weeks) }}
      </span>
    </template>
    <template v-else>
      {{ $t("info.progress.failed") }}
    </template>
  </CommonInfoCard>
</template>

<style scoped>
.item span {
  position: relative;
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
