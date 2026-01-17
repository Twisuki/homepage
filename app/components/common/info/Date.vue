<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs"

const date = ref<Dayjs>(dayjs())

let timer: number | null = null

onMounted(() => {
  timer = window.setInterval(() => {
    date.value = dayjs()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const holiday = ref<HolidayData | 0 | Error | null>(null)
const message = computed(() => {
  if (holiday.value === null) return $t("info.date.pending")
  if (holiday.value instanceof Error) return $t("info.date.failed")
  if (holiday.value)
    return $t("info.date.prefix") + holiday.value.name + $t("info.date.infix") + holiday.value.daysLeft + $t("info.date.suffix")
  return $t("info.date.null")
})

onMounted(() => {
  getHolidayData()
    .then(response => holiday.value = response)
    .catch(error => holiday.value = error)
})
</script>

<template>
  <CommonInfoCard class="item">
    <span>
      {{ date.format("YYYY-MM-DD") }}
      <span class="time">
        {{ date.format("HH:mm") }}
      </span>
    </span>
    <span>
      {{ message }}
    </span>
  </CommonInfoCard>
</template>

<style scoped>
.item span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
}
</style>
