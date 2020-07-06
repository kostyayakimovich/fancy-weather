import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const WeatherOnThreeDays = ({ weatherNextDays = {}, isCels, isLang }) => {
  const { infoForIconFirstDay = "", infoForIconSecondDay = "", infoForIconThirdDay = "", tempFirstDay = "", tempSecondDay = "", tempThirdDay = "" } = weatherNextDays;
  const convertFar = (tempDayCels) => Math.round((tempDayCels * 1.8) + 32);
  const temp1 = isCels ? tempFirstDay : convertFar(tempFirstDay);
  const temp2 = isCels ? tempSecondDay : convertFar(tempSecondDay);
  const temp3 = isCels ? tempThirdDay : convertFar(tempThirdDay);
  const [firstDayIcon, setFirstDayIcon] = useState();
  const [secondDayIcon, setSecondDayIcon] = useState();
  const [thirdDayIcon, setThirdDayIcon] = useState();

  useEffect(() => {

    if (infoForIconFirstDay) {
      import(`../../assets/img/iconWeather/${infoForIconFirstDay}.svg`).then(image => setFirstDayIcon(image.default));
    }
    if (infoForIconSecondDay) {
      import(`../../assets/img/iconWeather/${infoForIconSecondDay}.svg`).then(image => setSecondDayIcon(image.default));
    }
    if (infoForIconThirdDay) {
      import(`../../assets/img/iconWeather/${infoForIconThirdDay}.svg`).then(image => setThirdDayIcon(image.default));
    }
  }, [infoForIconFirstDay, infoForIconSecondDay, infoForIconThirdDay])
  let date = new Date();
  const getWeekDay = (numberDay) => {
    if (numberDay === 7) numberDay = 0;
    if (numberDay === 8) numberDay = 1;
    if (numberDay === 9) numberDay = 2;
    let days = [];
    if (isLang === "en") days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (isLang === "ru") days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    if (isLang === "be") days = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];

    return days[numberDay];
  };
  let day = date.getDay();

  return (

    <div className="weather-on-three-days">
      <div className="weather-day">
        <p className="day">{getWeekDay(day + 1)}</p>
        <div className="day-info">
          {firstDayIcon && <img className="icon-day" src={firstDayIcon} alt="iconFirst" />}
          <p className="temp-day">{temp1}&deg;</p>
        </div>
      </div>
      <div className="weather-day">
        <p className="day">{getWeekDay(day + 2)}</p>
        <div className="day-info">
          {secondDayIcon && <img className="icon-day" src={secondDayIcon} alt="iconSecond" />}
          <p className="temp-day">{temp2}&deg;</p>
        </div>
      </div>
      <div className="weather-day">
        <p className="day">{getWeekDay(day + 3)}</p>
        <div className="day-info">
          {thirdDayIcon && <img className="icon-day" src={thirdDayIcon} alt="iconThird" />}
          <p className="temp-day">{temp3}&deg;</p>
        </div>
      </div>
    </div>
  );

};
WeatherOnThreeDays.propTypes = {
  weatherNextDays: PropTypes.shape({
    infoForIconFirstDay: PropTypes.string,
    infoForIconSecondDay: PropTypes.string,
    infoForIconThirdDay: PropTypes.string,
    tempFirstDay: PropTypes.number,
    tempSecondDay: PropTypes.number,
    tempThirdDay: PropTypes.number
  }),
};
export default WeatherOnThreeDays;