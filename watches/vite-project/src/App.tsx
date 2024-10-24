import React, { useState } from 'react';
import './App.css';
import Clock from './Clock';

interface ClockData {
  id: number;
  name: string;
  timezone: string;
}

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');
  const [clocks, setClocks] = useState<ClockData[]>([]);
  const [idCounter, setIdCounter] = useState<number>(0);

  const handleAddClock = () => {
    if (name && timezone) {
      setClocks([...clocks, { id: idCounter, name, timezone }]);
      setIdCounter(idCounter + 1);
      setName('');
      setTimezone('');
    }
  };

  const handleRemoveClock = (id: number) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <div>
      <h1>Timezones Clock</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Временная зона (например, Europe/Moscow)"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        />
        <button onClick={handleAddClock}>Добавить</button>
      </div>

      <div className="clock-list">
        {clocks.map((clock) => (
          <Clock
            key={clock.id}
            id={clock.id}
            name={clock.name}
            timezone={clock.timezone}
            onRemove={handleRemoveClock}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
