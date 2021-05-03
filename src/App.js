import './App.css';
import StationItem from './components/StationItem';
import AsteroidForm from './components/AsteroidForm';
import React, { useState } from "react";

function App() {
  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  const submit = (start_date, end_date) => {
    console.log(start_date)
    setStart(start_date)
    setEnd(end_date)
  }
  return (
    <div className="App">
      <AsteroidForm submit={submit} />
      <StationItem start={start} end={end} />
    </div>
  );
}

export default App;
