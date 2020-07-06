import React from 'react';
import "./style.css";

const ButtonsTempMeasure = ({ onClickTemp, isCels }) => {
  const classFar = isCels ? "fahrenheit" : "fahrenheit active-temp";
  const classCels = isCels ? "celsius active-temp" : "celsius"
  return (
    <div className="temp-measure-box">
      <p className={classFar} id="fahrenheit" onClick={() => onClickTemp(false)}>&deg;F</p>
      <p className={classCels} id="celsius" onClick={() => onClickTemp(true)}>&deg;C</p>
    </div>
  );
};

export default ButtonsTempMeasure;