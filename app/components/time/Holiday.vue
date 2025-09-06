<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface HolidayApiData {
  date: string;
  name: string;
  isOffDay: boolean;
}

interface HolidayData {
  date: Date;
  name: string;
}

const msg = ref<string>("加载中");
const HOLIDAY_API = "/api/holiday/v1/holidays/";

// 获取下一个节假日信息
const getNextHoliday = (data: {[key: string]: HolidayApiData}): HolidayData | null => {
  const holidays: HolidayData[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value.isOffDay) {
      holidays.push({
        date: new Date(value.date),
        name: value.name,
      });
    }
  }

  // 升序排列
  holidays.sort((a, b) => a.date.getTime() - b.date.getTime());

  // 查找下一个节假日
  const today = new Date();
  for (const holiday of holidays) {
    if (holiday.date > today) {
      return holiday;
    }
  }
  return null;
}

// 格式化信息显示
const formatHolidayMsg = (holiday: HolidayData | null): string => {
  if (holiday) {
    const today = new Date();
    const days = (holiday.date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);
    return `距离${holiday.name}还有${Math.ceil(days)}天`;
  } else {
    return "今年的假日过完了T_T";
  }
}

// 获取数据
const getHolidayData = async () => {
  try {
    const year = new Date().getFullYear();
    const res = await fetch(`${HOLIDAY_API}${year}`);
    const data = await res.json();

    const nextHoliday = getNextHoliday(data);
    msg.value = formatHolidayMsg(nextHoliday);
  } catch (error) {
    console.error("获取节假日信息失败:", error);
    msg.value = "获取节假日信息失败, 请稍后重试";
  }
}

onMounted(() => {
  getHolidayData();
})
</script>

<template>
  <span>{{ msg }}</span>
</template>

<style scoped>

</style>
