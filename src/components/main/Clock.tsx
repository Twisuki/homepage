"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setBlink((prev => !prev))
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <>
      {hours}
      <span className={blink ? "opacity-100" : "opacity-0"}>:</span>
      {minutes}
    </>
  );
}

function DateClock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const years = date.getFullYear();
  const mounths = (date.getMonth() + 1).toString().padStart(2, "0");
  const days = date.getDate().toString().padStart(2, "0");
  const weeks = date.getDay();
  const weekName = Array.of("日", "一", "二", "三", "四", "五", "六")[weeks];

  return (
    <>
      {years}-{mounths}-{days} 周{weekName}
    </>
  );
}

export default function Clock() {
  return (
    <div className="w-36 h-36 bg-blue-600 flex-col justify-center items-center">
      <div className="">
        <div className="text-white text-2xl text-center">
          <DigitalClock />
        </div>
        <div className="text-white text-md text-center">
          <DateClock />
        </div>
      </div>

      <div>

      </div>
    </div>
  );
}
