import React, { useEffect, useState } from "react";

type TimerProps = {
  duration: number;
}

const Timer = ({duration } : TimerProps) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
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
  }, []);

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
        <h3 className="text-28 text-light_green">{String(days).padStart(2, '0')}</h3>
        <p className="text-xs text-[#AFB3AE] ">Days</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{String(hours).padStart(2, '0')}</h3>
        <p className="text-xs text-[#AFB3AE] ">Hours</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{String(minutes).padStart(2, '0')}</h3>
        <p className="text-xs text-[#AFB3AE] ">Min</p>
      </div>
      <span className="text-28 text-light_green"> : </span>
      <div className="">
        <h3 className="text-28 text-light_green">{String(seconds).padStart(2, '0')}</h3>
        <p className="text-xs text-[#AFB3AE]">Sec</p>
      </div>

    </div>
  );
};

export default Timer;
