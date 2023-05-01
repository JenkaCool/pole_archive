import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';


const LogIn = () => {
  return (
    <>
      <div>
        <div>
          <form className="login-box" action="" method="post">
            <h2>Вход</h2>
              <div className="input-box">
                <input type="text" name="aut_login" required/>
                <label for="">Логин</label>
              </div>
              <div className="input-box">
                <img src={userImg} />
                <input type="password" name="aut_password" required/>
                <label for="">Пароль</label>
              </div>
              <div className="forget">
                <img src={passwordImg} />
                <label for=""><input type="checkbox">Запомнить меня</input></label>
                <Link>Забыл пароль</Link>
              </div>
              <input type="submit" value="Submit"></input>
              <div className="register">
                <p>Нет аккаунта? <Link>Зарегистрироваться</Link></p>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;