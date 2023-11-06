import logo from './logo.svg';
import './App.css';
import { useMemo, useState } from 'react';

const ExpensiveCalculation = ({ number }) => {
  const calculateFactorial = (n) => {
    if (n < 0) {
      return -1;
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * calculateFactorial(n - 1);
  };

  const factorial = useMemo(() => {
    console.log("Calculating factorial",number);
    return calculateFactorial(number);
  }, [number]);

  return (
    <p>
      {number}! = {factorial}
    </p>
  );
};


function App() {
  const [number, setNumber] = useState(0);

  const handleChange = (e) => {
    setNumber(e.target.value);
  };


  return (
    <div className="App">
      <header className="App-header">
        <input type="number" value={number} onChange={handleChange} />
        <ExpensiveCalculation number={number} />
      </header>
    </div>
  );
}

export default App;
