import React, { useState, useEffect } from "react";


interface DayBlockProps {
  index: string | number | null;
  active: boolean;
}
function DayBlock(props: DayBlockProps) {
  return (
    <span className={ `flex items-center justify-center ${props.active ? "bg-gray-600" : ""}` }>
      {props.index}
    </span>
  );
}

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return() => clearInterval(timer);
  });

  const year = date.getFullYear().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // 日期
  const days: (number | null)[] = [];
  const today= date.getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dayOfFirstDay = firstDayOfMonth.getDay();

  // 前置空格
  for (let i = 0; i < dayOfFirstDay; i++) {
    days.push(null);
  }

  // 填充天数
  for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
    days.push(i);
  }

  return (
    <div className="w-36 h-36 py-1 text-white text-center">
      <div className="text-md">
        {year}-{month}-{today}&nbsp;&nbsp;{hours}:{minutes}
      </div>
      <div className="grid grid-cols-7 text-xs">
        {Array.of("日", "一", "二", "三", "四", "五", "六").map((item, index) => (
          <DayBlock index={item} active={false} key={index} />
        ))}
        {days.map((day, index) => (
          <DayBlock index={day} active={day === today} key={index} />
        ))}
      </div>
    </div>
  );
}
