import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import getData from "./getData";

const App = () => {
  const [searchValue, setSearch] = useState();
  const [locationEn, setLocationEn] = useState();
  const [locationRu, setLocationRu] = useState();
  const [locationBe, setLocationBe] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weather, setWeather] = useState();
  const [weatherNextDays, setWeatherNextDays] = useState();
  const [background, setBackground] = useState();
  const [isCels, setIsCels] = useState(true);
  const [isLang, setIsLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setMessage] = useState('');

  const fetchLocation = async (city) => {
    setIsLoading(true)
    const { weather, weatherNextDays, lat, lon, background, ruWeatherNow, beWeatherNow, locationRuWord, locationBeWord, message } = await getData(city);
    setIsLoading(false);

    let iconWeatherNow = weather.current.condition.icon;
    let weatherText = weather.current.condition.text;
    let ruWeather = ruWeatherNow;
    let beWeather = beWeatherNow;
    let tempC = weather.current.temp_c;
    let tempF = weather.current.temp_f;
    let feelC = weather.current.feelslike_c;
    let feelF = weather.current.feelslike_f;
    let wind = Math.round(weather.current.wind_mph / 2, 237);
    let humidity = weather.current.humidity;
    let timezone = weather.location.tz_id;
    const weatherNow = {
      icon: iconWeatherNow,
      weatherText: weatherText,
      ruWeather: ruWeather,
      beWeather: beWeather,
      tempC: tempC,
      tempF: tempF,
      feelC: feelC,
      feelF: feelF,
      wind: wind,
      humidity: humidity,
      timezone: timezone
    };

    let infoForIconFirstDay = weatherNextDays[1].weather_code.value;
    let infoForIconSecondDay = weatherNextDays[2].weather_code.value;
    let infoForIconThirdDay = weatherNextDays[3].weather_code.value;
    let minTemp1 = weatherNextDays[1].temp[0].min.value;
    let maxTemp1 = weatherNextDays[1].temp[1].max.value;
    let tempFirstDay = Math.round((maxTemp1 + minTemp1) / 2);
    let minTemp2 = weatherNextDays[2].temp[0].min.value;
    let maxTemp2 = weatherNextDays[2].temp[1].max.value;
    let tempSecondDay = Math.round((maxTemp2 + minTemp2) / 2);
    let minTemp3 = weatherNextDays[3].temp[0].min.value;
    let maxTemp3 = weatherNextDays[3].temp[1].max.value;
    let tempThirdDay = Math.round((maxTemp3 + minTemp3) / 2);
    const weatherNextThreeDays = {
      infoForIconFirstDay: infoForIconFirstDay,
      infoForIconSecondDay: infoForIconSecondDay,
      infoForIconThirdDay: infoForIconThirdDay,
      tempFirstDay: tempFirstDay,
      tempSecondDay: tempSecondDay,
      tempThirdDay: tempThirdDay
    };

    let backgroundApp = background.urls.regular;
    document.getElementById("appContainer").style = `background-image:linear-gradient( rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.6) ), url("${backgroundApp};");`;
    document.body.style = `background-image:linear-gradient( rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 1.4) ), url("${backgroundApp};");`;
    setBackground(backgroundApp);
    setWeather(weatherNow);
    setWeatherNextDays(weatherNextThreeDays);
    setLocationEn(weather.location.name + ", " + weather.location.country);
    setLocationBe(locationBeWord);
    setLocationRu(locationRuWord)
    setMessage(message);
    setLon(lon);
    setLat(lat);
  };

  useEffect(() => {
    fetchLocation()
  }, []);

  useEffect(() => {
    if (searchValue) {
      fetchLocation(searchValue)
    }
  }, [searchValue]);


  return (
    <>
      <div className="app-container" id="appContainer">
        {isLoading ? <div className="conainer-loader" id="containerLoader"><div className="loader"></div></div> : <><Header setSearch={setSearch} onClickTemp={setIsCels} isCels={isCels} onClickLang={setIsLang} isLang={isLang} />
          {isMessage && <p className="message" id="message">{isMessage}</p>}
          <MainContent isLang={isLang} background={background} isCels={isCels} locationEn={locationEn} locationRu={locationRu} locationBe={locationBe} weather={weather} weatherNextDays={weatherNextDays} lon={lon} lat={lat} /></>}


      </div></>
  );
};

export default App;
