import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AsteroidForm.css"


function AsteroidForm (props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <form>
      <h1>Trouver une comète proche de la Terre</h1>
      <fieldset>
        <label>Date de début</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)}/><br/>
        <label>Date de fin</label>
        <DatePicker selected={endDate} onChange={date => setEndDate(date)}/>
      </fieldset>
      <input type="button" value="Rechercher" onClick={() => props.submit(startDate, endDate)}/>
    </form>
  );
}

export default AsteroidForm;
