import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';
import emailImg from '../../imgs/mail-outline.svg';

const SignUp = () => {
  return (
    <section>
      <div className="form-box reg">
        <div className="form-value">
          <form className="login-box" action="" method="post">
            <h2>Регистрация</h2>
              <div className="input-box">
                <img className="user-icon" src={userImg} />
                <input type="text" name="reg_login" required></input>
                <label for="">Логин</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={emailImg} />
                <input type="email" name="reg_email" required></input>
                <label for="">Email</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={passwordImg} />
                <input type="password" name="reg_password" required></input>
                <label for="">Пароль</label>
              </div>
              <div className="input-box">
                <input type="password" name="reg_password_2" required></input>
                <label for="">Повторите пароль</label>
              </div>
              <button type="submit">Зарегистрироваться</button>
              <div className="register">
                <p>Есть аккаунт? <Link>Авторизироваться</Link></p>
              </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;