import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <header className="App-header">
        <div id="contacts" className="in-one-role">
            <ul class="language-button">RU(русский)
              <li></li>
              <li></li>
            </ul>
            <div className="link-area"><a className="topbar-link un"> О проекте </a></div>
            <div className="link-area"><a className="topbar-link un"> Контактная информация </a></div>
            <div className="link-area"><a className="topbar-link un"> Форум </a></div>
            <div className="link-area"><a className="topbar-link un"> Поиск </a></div>
        </div>
        <div id="links" className="in-one-role">
            <h4 className="topbar-title">Электронный архив</h4>
            <div id='navigation'>
                <a className="page-a"> Главная </a>
                <a className="page-a"> Архив </a>
                <a className="page-a"> Документы </a>
            </div>
            <div id='authorization'>
                <a className="page-a"> Профиль </a>
                <a className="page-a"><button className="auth-button"> Вход </button></a>
                <a className="page-a"><button className="auth-button"> Регистрация </button></a>
                <a className="page-a"><button className="auth-button"> Выход </button></a>
            </div>
        </div>
    </header>
  );
}

export { Topbar }