import winter1 from "../src/assets/img/seasons/winter1.jpg"
import spring1 from "../src/assets/img/seasons/spring1.jpg"
import summer1 from "../src/assets/img/seasons/summer1.jpg"
import autumn1 from "../src/assets/img/seasons/autumn1.jpg"

const apikeyLocation = 'e26cec2d0bb949';
const apikeyWeather = '182866b20b6447b388591830202105';
const climacell = "W6kCwx8dEiIG0zQUZPGHF76PhbWNEITv";
const backgroundKey = "bdh2TlFy9TZ4xGp1_oIGeP7Wc0AUJZr8ueWWpjrfHpQ";
const translateKey = "trnsl.1.1.20200506T125103Z.32345ea450e0122e.3df4ee4ef4b7a06dd5ffa36a2db98bf482b1e54e";


const fetchLocation = () => {
  let message = "";
  const getWeather = async (city) => {

    const urlWeather = `https://api.weatherapi.com/v1/forecast.json?key=${apikeyWeather}&q=${city}&days=3`;
    const responseWeather = await fetch(urlWeather);
    const data = await responseWeather.json();

    if (data.error && data.error.code === 1006) {
      message = "city ​​not found";
      const urlLocation = `https://ipinfo.io/json?token=${apikeyLocation}`;
      const responseLocation = await fetch(urlLocation);
      const location = await responseLocation.json();
      city = await location.city;
      return await getWeather(city);
    }
    return { ...data, message };
  }
  return getWeather;
}

export default async (searchCity) => {

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


  let city;

  if (searchCity) city = searchCity;
  else {
    const urlLocation = `https://ipinfo.io/json?token=${apikeyLocation}`;
    const responseLocation = await fetch(urlLocation);
    const location = await responseLocation.json();
    city = await location.city;
  }
  //это по заданию)
  console.log(`request for background: ${month}, ${partDay}, ${city}`);
  const weather = await fetchLocation()(city);

  const { location, current, message } = weather;
  const lat = location.lat;
  const lon = location.lon;
  const weatherWords = current.condition.text;
  const wordLocation = `${location.name} , ${location.country}`;

  const urlWordLocationRu = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${wordLocation}&lang=en-ru`;
  const responseWordLocationRu = await fetch(urlWordLocationRu);
  const ruWordLocation = await responseWordLocationRu.json();
  const locationRuWord = ruWordLocation.text[0];

  const urlWordLocationBe = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${wordLocation}&lang=en-be`;
  const responseWordLocationBe = await fetch(urlWordLocationBe);
  const beWordLocation = await responseWordLocationBe.json();
  const locationBeWord = beWordLocation.text[0];

  const urlWordRu = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${weatherWords}&lang=en-ru`;
  const responseWordRu = await fetch(urlWordRu);
  const ruWord = await responseWordRu.json();
  const ruWeatherNow = ruWord.text[0];

  const urlWordBe = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${weatherWords}&lang=en-be`;
  const responseWordBe = await fetch(urlWordBe);
  const beWord = await responseWordBe.json();
  const beWeatherNow = beWord.text[0];

  const urlWeatherNextDays = `https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${lon}&unit_system=si&start_time=now&fields=feels_like%2Ctemp%2Chumidity%2Cwind_speed%2Cweather_code&apikey=${climacell}`
  const responseWeatherNextDays = await fetch(urlWeatherNextDays);
  const weatherNextDays = await responseWeatherNextDays.json();

  let background;
  const urlBackground = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${month}/${city}/${partDay}&client_id=${backgroundKey}`;
  try {
    const responseBackground = await fetch(urlBackground);
    background = await responseBackground.json();
  } catch (err) {

    if (month === "winter") background = winter1;
    if (month === "spring") background = spring1;
    if (month === "summer") background = summer1;
    if (month === "autumn") background = autumn1;
  }
  return { weather, weatherNextDays, lat, lon, background, ruWeatherNow, beWeatherNow, locationBeWord, locationRuWord, message };
};