import { useEffect, useState } from "react";

export default function MotivationWidget() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (value) => String(value).padStart(2, "0");

  const startTimer = () => {
    if (seconds > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(25 * 60);
  };

  return (
    <div className="motivation-widget">
      <h3>Focus Timer</h3>

      <p>Work for 25 minutes without distractions.</p>

      <div className="timer">
        {formatTime(minutes)}:{formatTime(remainingSeconds)}
      </div>

      <div className="timer-buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={pauseTimer}>Pause</button>
        )}

        <button onClick={resetTimer}>Reset</button>
      </div>

      {seconds === 0 && (
        <p>🎉 Focus session complete! Take a short break.</p>
      )}
    </div>
  );
}