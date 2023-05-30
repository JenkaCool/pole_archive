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
    removeCookie("username");
    removeCookie("access_token");
    setUser(null);
    navigate("/exiles/");
    window.location.reload();
  }

  if (cookies.username && user == null) {
    setUser(cookies.username);
    setCookie("username", cookies.username);
    console.log("Ok")
  }


  return (
    <header className="App-header sticky">
        <div id="contacts" className="in-one-row">
            <ul class="language-button">RU(русский)
              <li></li>
              <li></li>
            </ul>
            <Link to="/exiles/forum/" className="topbar-link"><div className="link-area"><span className="un"> Форум </span></div></Link>
            <Link to="/exiles/help/" className="topbar-link"><div className="link-area"><span className="un"> Помощь </span></div></Link>
            <Link to="/exiles/search/" className="topbar-link"><div className="link-area"><span className="un"> Поиск </span></div></Link>
        </div>
        <div id="links" className="in-one-row">
            <h4 className="topbar-title">Электронный архив</h4>
            <div id='navigation'>
                <Link to="/exiles/">Главная</Link>
                <Link to="/exiles/archive/">Архив</Link>
                <Link to="/exiles/documents/">Документы</Link>
            </div>
            <div id='authorization'>
              {user ?
                <>
                  <Link to="/exiles/history/"> История</Link>
                  <Link to="/exiles/users/"> Пользователи</Link>
                  <Link to="/exiles/profile/"> {user} </Link>
                  <button className="auth-button" onClick={handleClick}>Выход</button>
                </>
                :
                <>
                  <Link to="/exiles/login/"><button className="auth-button"> Вход </button></Link>
                </>
              }
            </div>
        </div>
    </header>
  );
}

export default Topbar;