import { ref, onMounted, onBeforeUnmount, computed } from "vue"

const currentTime = ref(new Date())

export const formattedTime = computed(() => {
  const date = currentTime.value
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
})

export const formattedDate = computed(() => {
  const date = currentTime.value
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
  const weekday = weekdays[date.getDay()]
  return `${year}-${month}-${day} 周${weekday}`
})

const updateTime = () => {
  currentTime.value = new Date()
}

let timer: number | null = null
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
