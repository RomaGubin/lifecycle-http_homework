import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import './App.css';

interface ClockProps {
  id: number;
  name: string;
  timezone: string;
  onRemove: (id: number) => void;
}

const Clock: React.FC<ClockProps> = ({ id, name, timezone, onRemove }) => {
  const [time, setTime] = useState<string>(getCurrentTime());

  function getCurrentTime() {
    return moment().tz(timezone).format('HH:mm:ss');
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div className="clock">
      <h3>{name}</h3>
      <p>{time}</p>
      <button onClick={() => onRemove(id)}>Удалить</button>
    </div>
  );
};

export default Clock;
