import React, { useState, useEffect } from "react";


interface Holiday {
  date: string;
  name: string;
  daysUntil: number;
}

interface HolidayData {
  date: string;
  name: string;
  isOffDay: boolean;
}

// 计算今年进度
function getYearProgress() {
  const today = Date.now();
  const firstDay = (new Date(new Date().getFullYear(), 0, 1)).getTime();
  return (today - firstDay) / (365 * 24 * 60 * 60 * 1000);
}

// 打印进度条
function Progress(props: { value: number }) {
  return (
    <div className="h-2 w-36 bg-green-700 rounded-full">
      <div
        className="h-full bg-green-400 transition-all duration-300"
        style={ { width: `${ props.value * 100 }%` } }
      ></div>
    </div>
  );
}

export default function DateProgress() {
  // 获取下个节日信息
  const [nextHoliday, setNextHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextHoliday = async() => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/holidays.json");
        if (!response.ok) {
          throw new Error("获取节假日信息出错");
        }

        const data = await response.json();
        const year = new Date().getFullYear().toString();
        const holidays: Record<string, HolidayData> = data[year];

        if (!holidays || Object.keys(holidays).length === 0) {
          setNextHoliday(null);
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let closestHoliday: Holiday | null = null;

        Object.entries(holidays).forEach(([dateString, holidayData]) => {
          const holidayDate = new Date(dateString);
          holidayDate.setHours(0, 0, 0, 0);

          if (holidayDate >= today) {
            const daysUntil = Math.ceil((holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

            if (!closestHoliday || daysUntil < closestHoliday.daysUntil) {
              closestHoliday = {
                date: dateString,
                name: holidayData.name,
                daysUntil: daysUntil
              };
            }
          }
        });

        setNextHoliday(closestHoliday);
      } catch (error) {
        console.error("获取节假日信息出错: ", error);
        setError(error instanceof Error ? error.message : "未知错误");
      } finally {
        setLoading(false);
      }
    }

    fetchNextHoliday();
  }, []);

  if (loading) return (
    <div className="w-36 h-36 flex items-center justify-center text-center text-white text-md">
      加载中 ...
    </div>
  );

  if (error) return (
    <div className="w-36 h-36 flex flex-col items-center justify-center text-center text-red-500 text-md">
      <div>错误!</div>
      <div>{ error }</div>
    </div>
  );

  return (
    <div className="w-36 h-36 flex flex-col items-center justify-center text-center text-white text-md">
      <div>下一个节日是:</div>
      <div>{ nextHoliday?.name }</div>
      <div>还有{ nextHoliday?.daysUntil }天</div>
      <div>{ new Date().getFullYear() }已过去{ `${ (getYearProgress() * 100).toFixed(2) }%` }</div>
      <Progress value={ getYearProgress() }/>
    </div>
  );
}
