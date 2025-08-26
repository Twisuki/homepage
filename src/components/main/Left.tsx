"use client";

import React, { useState } from "react";
import Calendar from "@/components/main/left/Calendar";
import DateProgress from "@/components/main/left/DateProgress";


export default function Left() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-36 h-36 bg-blue-600 flex-col justify-center items-center">
      <div
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
        className="w-full h-full"
      >
        { isHovered ? <DateProgress /> : <Calendar/> }
      </div>

      <div>

      </div>
    </div>
  );
}
