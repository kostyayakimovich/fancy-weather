import React, { useEffect, useState } from "react";
import moment from 'moment'
import 'moment-timezone';
import "./style.css";


const getWeekDayRu = (date) => {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date];
};
const getMounthRu = (date) => {
  let mounths = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  return mounths[date];
};
const getWeekDayBe = (date) => {
  let days = ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'];
  return days[date];
};
const getMounthBe = (date) => {
  let mounths = ['студзень', 'люты', 'сакавик', 'красавик', 'май', 'червэнь', 'липень', 'жнивень', 'верасень', 'кастрычник', 'листапад', 'снежань'];
  return mounths[date];
};
const startTime = (lang, zone) => {
  let currentDay, currentMounth, time;
  let date = new Date();
  let day = date.getDay();
  let mounth = date.getMonth();
  if (lang === "en") {
    time = moment().tz(`${zone}`).format('dddd MMMM D, h:mm:ss');
  }
  if (lang === "ru") {
    currentDay = getWeekDayRu(day);
    currentMounth = getMounthRu(mounth);
    time = currentDay + " " + currentMounth + " " + moment().tz(`${zone}`).format('D') + ",  " + moment().tz(`${zone}`).format('h:mm:ss');
  }
  if (lang === "be") {
    currentDay = getWeekDayBe(day);
    currentMounth = getMounthBe(mounth);
    time = currentDay + " " + currentMounth + " " + moment().tz(`${zone}`).format('D') + ",  " + moment().tz(`${zone}`).format('h:mm:ss');
  }
  return time;
};

const CurrentDate = ({ isLang, weather = {} }) => {
  const { timezone = "" } = weather;

  const [currentTime, setCurrentTime] = useState('');


  useEffect(() => {

    let timer = setInterval(() => {
      setCurrentTime(startTime(isLang, timezone))
    }, 1000);
    return () => {
      clearInterval(timer)
    }

  }, [isLang, timezone])

  return (
    <div className="current-date">
      <h3 className="text-current-date"> {`${currentTime}`}</h3>
    </div>
  );
};

export default CurrentDate;
