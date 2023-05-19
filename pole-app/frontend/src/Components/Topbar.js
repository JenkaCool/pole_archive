import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate, Outlet } from "react-router-dom";
import axios from 'axios';
import { useCookies, CookiesProvider } from "react-cookie";

import '../css/Topbar.css';

const Topbar = () => {
  const navigate = useNavigate();
  let [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "username"
  ]);

  const handleClick = event => {
    removeCookie("access_token");
    removeCookie("username");
    setUser(null);
    navigate("/");
  }

  if (cookies.username && user == null) {
    setUser(cookies.username);
    setCookie("username", cookies.username);
    console.log("Ok")
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
              {user ?
                <>
                  <Link to="/users"> Пользователи </Link>
                  <span id="userLogin">{user}</span>
                  <Link to="/profile"> Профиль </Link>
                  <button className="auth-button" onClick={handleClick}> Выход </button>
                </>
                :
                <>
                  <Link to="/login"><button className="auth-button"> Вход </button></Link>
                </>
              }
            </div>
        </div>
    </header>
  );
}

export default Topbar;