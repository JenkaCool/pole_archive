import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';


const LogIn = () => {
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form className="login-box" action="" method="post">
            <h2>Вход</h2>
              <div className="input-box">
                <img className="user-icon" src={userImg} />
                <input type="text" name="aut_login" required></input>
                <label for="">Логин</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={passwordImg} />
                <input type="password" name="aut_password" required></input>
                <label for="">Пароль</label>
              </div>
              <div className="forget">
                <Link>Забыли пароль?</Link>
              </div>
              <button type="submit">Войти</button>
              <div className="remember">
                <label for=""><input type="checkbox"></input></label>
                <label for="">Запомнить меня</label>
              </div>
              <div className="register">
                <p>Нет аккаунта? <Link>Зарегистрироваться</Link></p>
              </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LogIn;