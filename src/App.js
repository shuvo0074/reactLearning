import { useState, useEffect, useCallback } from "react";

const Timer = ({ start, stop }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!start && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, seconds]);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={stop}>Stop</button>
    </div>
  );
};

const App = () => {
  const [start, setStart] = useState(false);

  const handleStart = useCallback(() => {
    console.log("start");
    setStart(true);
  }, []);

  const handleStop = useCallback(() => {
    console.log("end");
    setStart(false);
  }, []);

  return (
    <div>
      <h1>Timer App</h1>
      <button onClick={handleStart}>Start</button>
      <Timer start={start} stop={handleStop} />
    </div>
  );
};
export default App;
