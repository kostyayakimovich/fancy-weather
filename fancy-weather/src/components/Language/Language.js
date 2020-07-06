import React from 'react';
import "./style.css";

const Language = ({ onClickLang, isLang }) => {
  const classRu = isLang === "ru" ? "ru active-lang" : "ru";
  const classEn = isLang === "en" ? "en active-lang" : "en";
  const classBe = isLang === "be" ? "be active-lang" : "be";

  return (
    <div className="language-box">
      <p className={classRu} onClick={() => onClickLang("ru")}>RU</p>
      <p className={classEn} onClick={() => onClickLang("en")}>EN</p>
      <p className={classBe} onClick={() => onClickLang("be")}>BE</p>
    </div>
  );
};

export default Language;