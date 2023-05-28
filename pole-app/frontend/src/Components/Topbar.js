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
    navigate("/");
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
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Форум </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Статистика </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Помощь </span></div></Link>
            <Link to="/" className="topbar-link"><div className="link-area"><span className="un"> Поиск </span></div></Link>
        </div>
        <div id="links" className="in-one-row">
            <h4 className="topbar-title">Электронный архив</h4>
            <div id='navigation'>
                <Link to="/">Главная</Link>
                <Link to="/exiles">Архив</Link>
                <Link to="/documents">Документы</Link>
            </div>
            <div id='authorization'>
              {user ?
                <>
                  <Link to="/history"> История</Link>
                  <Link to="/users"> Пользователи</Link>
                  <Link to="/profile"> {user} </Link>
                  <button className="auth-button" onClick={handleClick}>Выход</button>
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