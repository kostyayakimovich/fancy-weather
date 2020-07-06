import React from 'react';
import "./style.css";
import Location from "../Location";
import CurrentDate from "../CurrentDate";
import WeatherNow from "../WeatherNow";
import WeatherOnThreeDays from "../WeatherOnThreeDays";

const InfoBlock = ({ locationRu, locationBe, locationEn, weather, weatherNextDays, isCels, isLang }) => {

  return (

    <div className="info-block">
      <Location locationEn={locationEn} locationRu={locationRu} locationBe={locationBe} isLang={isLang} />
      <CurrentDate isLang={isLang} locationEn={locationEn} weather={weather} />
      <WeatherNow weather={weather} isCels={isCels} isLang={isLang} />
      <WeatherOnThreeDays weatherNextDays={weatherNextDays} isCels={isCels} isLang={isLang} />
    </div>
  );
};

export default InfoBlock;