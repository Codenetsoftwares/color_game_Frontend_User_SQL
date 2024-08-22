import React, { useState, useEffect } from 'react';

const Timer = ({ startTime, endTime }) => {
    console.log('====>>>> time',startTime  )
    const calculateTimeLeft = () => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();
    
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return { days: '--', hours: '--', minutes: '--', seconds: '--', message: 'Invalid time' };
        }
    
        if (now < start) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, message: 'Not started yet' };
        }
    
        const timeLeft = end - now;
    
        if (timeLeft <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, message: 'Ended' };
        }
    
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
    
        return { days, hours, minutes, seconds, message: '' };
      };
    

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearInterval(timer);
      }, [startTime, endTime]);
  return (
    <div>
    {timeLeft.message ? (
      <span>{timeLeft.message}</span>
    ) : (
      <span>
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    )}
  </div>
  )
}

export default Timer