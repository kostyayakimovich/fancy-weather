import React from 'react';

import './style.css';

const Location = ({ locationRu, locationBe, locationEn, isLang }) => {
  let locationZone;
  if (isLang === "ru") locationZone = locationRu;
  if (isLang === "en") locationZone = locationEn;
  if (isLang === "be") locationZone = locationBe;

  return (

    <div className="location">
      <h1 className="text-location">{locationZone}</h1>
    </div>

  );
};

export default Location;
