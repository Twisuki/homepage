export interface ScheduleItem {
  start: string
  end: string
}

export interface ClassItem {
  name: string
  location?: string
  week: number[]
  day: number
  schedule: number[]
}

export const scheduleList: ScheduleItem[] = [
  { start: "08:00", end: "08:45" },
  { start: "08:55", end: "09:40" },
  { start: "10:00", end: "10:45" },
  { start: "10:55", end: "11:40" },
  { start: "14:30", end: "15:15" },
  { start: "15:15", end: "16:00" },
  { start: "16:10", end: "16:55" },
  { start: "16:55", end: "17:40" },
  { start: "19:00", end: "19:45" },
  { start: "19:55", end: "20:40" },
  { start: "20:50", end: "21:35" },
  { start: "21:35", end: "22:20" },
]

export const classList: ClassItem[] = [
  {
    name: "数学",
    location: "研B204",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 1,
    schedule: [1, 2],
  },
  {
    name: "体育",
    location: "",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 1,
    schedule: [5, 6],
  },
  {
    name: "计组",
    location: "综205",
    week: [1, 3, 5, 7, 9, 11, 13, 15],
    day: 2,
    schedule: [1, 2],
  },
  {
    name: "数电",
    location: "综109",
    week: [2, 4, 6, 8, 10, 12, 14, 16],
    day: 2,
    schedule: [1, 2],
  },
  {
    name: "马原",
    location: "综501",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 2,
    schedule: [3, 4],
  },
  {
    name: "实训",
    location: "C2 104",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 2,
    schedule: [5, 6, 7],
  },
  {
    name: "控制原理",
    location: "综203",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    day: 3,
    schedule: [5, 6],
  },
  {
    name: "计组",
    location: "研B202",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 4,
    schedule: [3, 4],
  },
  {
    name: "工训",
    location: "",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 4,
    schedule: [5, 6, 7],
  },
  {
    name: "控制原理",
    location: "综203",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    day: 5,
    schedule: [1, 2],
  },
  {
    name: "数电",
    location: "综203",
    week: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    day: 5,
    schedule: [3, 4],
  },
  {
    name: "形策",
    location: "综205",
    week: [11, 12],
    day: 3,
    schedule: [7, 8],
  },

  // 通识
  {
    name: "通识 经学",
    location: "研A207",
    week: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    day: 1,
    schedule: [9, 10, 11],
  },
  {
    name: "通识 气候",
    location: "二201",
    week: [3, 7],
    day: 2,
    schedule: [9, 10],
  },
  {
    name: "通识 新媒体",
    location: "复307",
    week: [3],
    day: 5,
    schedule: [7, 8],
  },
]
