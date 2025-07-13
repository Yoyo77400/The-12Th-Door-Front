"use client";
import { useEffect, useState } from "react";

// 🔁 Fixer la date cible à 2h plus tard dès le début
const target = new Date(Date.now() + 7 * 60 * 60 * 1000);

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeRemaining() {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      hours: String(Math.max(0, hours)).padStart(2, "0"),
      minutes: String(Math.max(0, minutes)).padStart(2, "0"),
      seconds: String(Math.max(0, seconds)).padStart(2, "0"),
    };
  }

  return (
    <span className="ml-1 text-white">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}

export default Countdown;
