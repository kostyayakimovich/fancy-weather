import React from 'react';
import Replace from "../../assets/img/replace.png";
import "./style.css";
const apikeyLocation = 'e26cec2d0bb949';
const backgroundKey = "bdh2TlFy9TZ4xGp1_oIGeP7Wc0AUJZr8ueWWpjrfHpQ";
let countRotate = 0;
const changeBackground = async () => {
  countRotate += 180;
  document.getElementById("replace").style.transform = `rotate(${countRotate}deg)`;
  let month;
  let partDay;
  const date = new Date();
  let monthNumber = date.getMonth();
  if (monthNumber === 0 || monthNumber === 1 || monthNumber === 11) month = "winter";
  if (monthNumber === 2 || monthNumber === 3 || monthNumber === 4) month = "spring";
  if (monthNumber === 5 || monthNumber === 6 || monthNumber === 7) month = "summer";
  if (monthNumber === 8 || monthNumber === 9 || monthNumber === 10) month = "autumn";
  let hours = date.getHours();
  if (hours >= 5 && hours < 10) partDay = "morning";
  if (hours >= 10 && hours < 18) partDay = "day";
  if (hours >= 18 && hours < 23) partDay = "evening";
  if (hours >= 23 || hours < 5) partDay = "night";
  const urlLocation = `https://ipinfo.io/json?token=${apikeyLocation}`;
  const responseLocation = await fetch(urlLocation);
  const location = await responseLocation.json();
  const city = await location.city;
  const urlBackground = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${month}/${city}/${partDay}&client_id=${backgroundKey}`;
  const responseBackground = await fetch(urlBackground);
  const background = await responseBackground.json();
  let backgroundApp = background.urls.regular;
  document.getElementById("appContainer").style = `background-image:linear-gradient( rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.6) ), url("${backgroundApp};");`;
  document.body.style = `background-image:linear-gradient( rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 1.4) ), url("${backgroundApp};");`;
}
const ChangeBackgroundButton = () => {
  return (
    <div className="replace-box">
      <img className="replace" id="replace" src={Replace} alt="replace" onClick={changeBackground} />
    </div>
  );
};

export default ChangeBackgroundButton;