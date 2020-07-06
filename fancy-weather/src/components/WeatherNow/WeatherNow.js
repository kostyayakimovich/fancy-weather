import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const data = {
  feelText: {
    ru: "ощущается",
    en: "feels like",
    be: "адчуваецца"
  },
  windText: {
    ru: "ветер",
    en: "wind",
    be: "вецер"
  },
  humidityText: {
    ru: "влажность",
    en: "humidity",
    be: "вільготнасць"
  },
  windParam: {
    ru: "м/с",
    en: "m/s",
    be: "м/с"
  }
}

const WeatherNow = ({ weather = {}, isCels, isLang }) => {
  const { icon = "", tempC = "", tempF = "", feelC = "", feelF = "", wind = "", humidity = "", weatherText = "", ruWeather = "", beWeather = "" } = weather;
  const temp = isCels ? tempC : tempF;
  const feel = isCels ? feelC : feelF;

  const weatherTextNow = {
    ru: ruWeather,
    en: weatherText,
    be: beWeather,
  }

  return (
    <div className="weather-now">
      <div className="degree">
        <p className="count-degree">{Math.round(temp)}&deg;</p>
      </div>
      <div className="info-weather-now">
        <img className="icon-weather" src={icon} alt="iconWeather" />
        <div className="weather-param">
          <p className="weather-text">{weatherTextNow[isLang]}</p>
          <p className="feel-like">{data.feelText[isLang]}: {Math.round(feel)}&deg;</p>
          <p className="wind">{data.windText[isLang]}: {wind} {data.windParam[isLang]}</p>
          <p className="humidyty">{data.humidityText[isLang]}: {humidity}%</p>

        </div>
      </div>
    </div>
  );
};

WeatherNow.propTypes = {
  weather: PropTypes.shape({
    icon: PropTypes.string,
    tempC: PropTypes.number,
    tempF: PropTypes.number,
    feelC: PropTypes.number,
    feelF: PropTypes.number,
    wind: PropTypes.number,
    humidity: PropTypes.number,
    weatherText: PropTypes.string
  }),

};

export default WeatherNow;
