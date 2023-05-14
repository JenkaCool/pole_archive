import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const Topbar = () => {
  const handleClick = event => {
      event.preventDefault();
      axios.get("http://localhost:8888/api/logout/");
  }
  return (
    <header className="App-header">
        <div id="contacts" className="in-one-role">
            <ul class="language-button">RU(русский)
              <li></li>
              <li></li>
            </ul>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> О проекте </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Контактная информация </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Форум </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Поиск </span></div></Link>
        </div>
        <div id="links" className="in-one-role">
            <h4 className="topbar-title">Электронный архив</h4>
            <div id='navigation'>
                <Link to="/"> Главная </Link>
                <Link to="/exiles"> Архив </Link>
                <Link to="/documents"> Документы </Link>
            </div>
            <div id='authorization'>
                <Link to="/profile"> Профиль </Link>
                <Link to="/login"><button className="auth-button"> Вход </button></Link>
                <Link to="/signup"><button className="auth-button"> Регистрация </button></Link>
                <button className="auth-button" onClick={handleClick}> Выход </button>
            </div>
        </div>
    </header>
  );
}

export default Topbar;