import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [msg, setMsg] = useState(false);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [minuteInputActive, setMinuteInputActive] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (second === 0) {
          if (minute !== 0) {
            setSecond(59);
            setMinute(minute - 1);
          } else {
            let newMinute = msg ? 24 : 4;
            setMinute(newMinute);
            setSecond(59);
            setMsg(!msg);
          }
        } else {
          setSecond(second - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, second, minute, msg]);

  const timeMinute = minute < 10 ? `0${minute}` : minute;
  const timerSecond = second < 10 ? `0${second}` : second;

  const handleStart = () => {
    if (!minuteInputActive) {
      setRunning(true);
    }
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setMinute(25);
    setSecond(0);
    setLaps([]);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10);
    setMinute(newTime);
    setSecond(0);
  };

  const handleBreakTime = () => {
    setMsg(!msg);
    if (msg) {
      setMinute(25);
    } else {
      setMinute(5);
    }
    setSecond(0);
  };

  const handleLap = () => {
    const formattedTime = `${timeMinute}:${timerSecond} (${msg ? "Break" : "Work"})`;
    setLaps((prevLaps) => [...prevLaps, formattedTime]);
  };
  

  return (
     <>
     <span className="header">Pomodoro Timer</span>
     <br /><br />
    <div className="timer-container">
      <div className="timer">
        {timeMinute}:{timerSecond}
      </div>
      <div className="timer-label">{msg ? "Break time" : "Work time"}</div>
      <div className="group">
        <div className="controls">
          {!running ? (
            <button onClick={handleStart}>
              Start <br /><br />
              <div className="controls">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={minute}
                  onChange={handleTimeChange}
                  onFocus={() => setMinuteInputActive(true)}
                  onBlur={() => setMinuteInputActive(false)}
                />
              </div>
            </button>
          ) : (
            <>
              <button onClick={handlePause}>Pause</button>
              <button onClick={handleBreakTime}>
                {msg ? "Go to Work" : "Go to Break"}
              </button>
              <button onClick={handleReset}>Reset</button>
              <button onClick={handleLap}>Lap</button>
            </>
          )}
        </div>
      </div>
      <br />

      <div className="laps">
        {laps.length > 0 && (
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <div className="erdemlabel">
        <a
          href="https://github.com/erdemonal11"
          target="_blank"
          className="erdemlabel"
        >
          erdemapps.
        </a>
      </div>
    </>
 
  );
}

export default App;
