import React from 'react';
import "./style.css";
import InfoBlock from "../InfoBlock";
import MapLocation from "../MapLocation"

const MainContent = ({ weather, locationRu, locationBe, locationEn, weatherNextDays, lat, lon, isCels, isLang }) => {

  return (
    <main className="main">
      <InfoBlock isLang={isLang} weather={weather} isCels={isCels} locationEn={locationEn} locationRu={locationRu} locationBe={locationBe} weatherNextDays={weatherNextDays} />
      <MapLocation lat={lat} lon={lon} isLang={isLang} />
    </main>

  );
};

export default MainContent;
