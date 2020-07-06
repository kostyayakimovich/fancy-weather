import React from 'react';
import "./style.css";
import ChangeBackgroundButton from "../ChangeBackgroundButton";
import Language from "../Language";
import ButtonsTempMeasure from "../ButtonsTempMeasure";
import Search from "../Search";

const Header = ({ onClickTemp, isCels, onClickLang, isLang, setSearch }) => {
  return (

    <header className="header">
      <div className="left-header-content"> <ChangeBackgroundButton />
        <Language onClickLang={onClickLang} isLang={isLang} />
        <ButtonsTempMeasure onClickTemp={onClickTemp} isCels={isCels} /></div>
      <div className="right-header-content">
        <Search isLang={isLang} setSearch={setSearch} /></div>
    </header>

  );
};

export default Header;







