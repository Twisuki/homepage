<script setup lang="ts">
import dayjs, { type Dayjs } from "dayjs"

const date = ref<Dayjs>(dayjs())

let timer: number | null = null

const holiday = ref<HolidayData | 0 | Error | null>(null)

const message = computed(() => {
  if (holiday.value === null) return $t("info.date.pending")
  if (holiday.value instanceof Error) return $t("info.date.failed")
  if (holiday.value)
    return $t("info.date.prefix") + holiday.value.name + $t("info.date.infix") + holiday.value.daysLeft + $t("info.date.suffix")
  return $t("info.date.null")
})

const updateHoliday = () => {
  getHoliday()
    .then(response => holiday.value = response)
    .catch(error => holiday.value = error)
}

onMounted(() => {
  timer = window.setInterval(() => {
    if (!date.value.isSame(dayjs(), "day")) updateHoliday()
    date.value = dayjs()
  }, 1000)

  updateHoliday()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <CommonInfoCard class="item">
    <span class="date">
      {{ date.format("YYYY-MM-DD") }}
      <span class="time">
        {{ date.format("HH:mm") }}
      </span>
    </span>
    <span class="holiday">
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
}

.date {
  font-size: 1.125rem;
}

.time {
  font-size: 1.5rem;
  font-weight: bold;
}

.holiday {
  font-size: 1rem;
}
</style>
