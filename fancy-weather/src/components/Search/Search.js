import React, { useState, useEffect } from 'react';
import SpeechRecognition from 'react-speech-recognition';
import Microphone from "../../assets/img/microphone.png";
import "./style.css";

const Search = ({ isLang, setSearch, startListening, stopListening, transcript, recognition, listening, ...props }) => {
  let [microphoneActive, setMicrActive] = useState(false);
  const [value, setValue] = useState("");

  let inputText;
  let textButton;
  if (isLang === "ru") { inputText = "Поиск города"; textButton = "Поиск"; }
  if (isLang === "en") { inputText = "Search city"; textButton = "Search"; }
  if (isLang === "be") { inputText = "Пошук горада"; textButton = "Пошук"; }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      setSearch(value);
    }
  }
  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  useEffect(() => {
    setMicrActive(listening);
  }, [listening]);



  useEffect(() => {

    if (microphoneActive) {
      if (isLang === "en") recognition.lang = "en-US";
      else if (isLang === "ru") recognition.lang = "ru-RU";
      else if (isLang === "be") recognition.lang = "ru-RU";
      startListening();

    }
    else {
      console.log('stop')
      stopListening();
      setSearch(transcript);
    }
  }, [microphoneActive, startListening, stopListening, recognition, isLang, setSearch, transcript])

  const onMicrophoneClick = () => setMicrActive(!microphoneActive);

  const change = (event) => {
    setValue(event.target.value);

  };

  return (
    <div className="search-box">
      <input className="input-search" value={value}
        onChange={change} id="inputSearch" type="text" onKeyDown={onKeyDown} placeholder={inputText} />
      <div className="microphone">
        {microphoneActive ? <p className="blink" id="blink" onClick={onMicrophoneClick}>Speak</p> : <img className="img-microphone" id="imgMicr" onClick={onMicrophoneClick} src={Microphone} alt="microphone" />}
      </div>
      <button className="search-button" onClick={() => setSearch(value)}>{textButton}</button>
    </div>
  );
};

const options = {
  autoStart: false,
  continuous: false
}

export default SpeechRecognition(options)(Search);