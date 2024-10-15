import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const getFormattedTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    return { days, hours, minutes, seconds };
  };
  const { days, hours, minutes, seconds } = getFormattedTime(time);
  return (
    <div className="flex justify-center space-x-3">
      <div className="">
        <h3 className="text-28 text-light_green">0{days}</h3>
        <p className="text-xs text-[#AFB3AE] ">Days</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{hours}</h3>
        <p className="text-xs text-[#AFB3AE] ">Hours</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{minutes}</h3>
        <p className="text-xs text-[#AFB3AE] ">Min</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{seconds}</h3>
        <p className="text-xs text-[#AFB3AE]">Sec</p>
      </div>

    </div>
  );
};

export default Timer;
