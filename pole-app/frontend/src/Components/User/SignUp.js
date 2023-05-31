import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import md5 from 'md5';
import axios from 'axios';
import validator from 'validator';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { useCookies } from "react-cookie";
import { HandySvg } from 'handy-svg'

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';
import emailImg from '../../imgs/mail-outline.svg';
import eyeImg from '../../imgs/eye.svg';
import eyeOffImg from '../../imgs/eye-off.svg';
import AccessDenied from '../AccessDenied';

import { DOMEN_SITE, DOMEN_SERVER } from '../../config/const.js';

const SignUp = () => {
  const [_, setUser] = useOutletContext();
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  const [ type, setType] = useState('password');
  const [ confirmType, setConfirmType] = useState('password');
  const [ passwordOpen, setPasswordOpen] = useState(false);
  const [ passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);
  const [register, setRegister] = useState(() => {
      return {
          username: "",
          role: "",
          email: "",
          password: "",
          password_confirm: "",
      }
  })

  const changeType = event => {
    if (type==="password")
    {
      setType('text');
      setPasswordOpen(true);
    } else {
      setType('password');
      setPasswordOpen(false);
    }
  }

  const changeConfirmType = event => {
    if (confirmType==="password")
    {
      setConfirmType('text');
      setPasswordConfirmOpen(true);
    } else {
      setConfirmType('password');
      setPasswordConfirmOpen(false);
    }
  }

  const changeInputRegister = event => {
      event.persist()
      setRegister(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }

  const submitCheck = event => {
      event.preventDefault();
      if(!validator.isEmail(register.email)) {
          alert("Эмейл не введён")
      } else if(register.password !== register.password_confirm) {
          alert("Введённые пароли не совпадают")
      } else if(!validator.isStrongPassword(register.password, {minSymbols: 0})) {
          alert("Пароль должен состоять не менее чем из 8 символов и содержать одну строчную, заглавную букву и цифру")
      } else {
          axios( {
              method: 'post',
              url: DOMEN_SERVER + "/signup/",
              headers: {
                'Content-type': 'application/json'
              },
              data: {
                username: register.username,
                role: register.role,
                email: register.email,
                password: md5(register.password),
                date: getCurrentDate(),
              }
          }).then(res => {

              if (res.status === 200) {
                  window.location.href = DOMEN_SITE + "/login/"
                  alert('Пользователь создан!');
                  return res.json();
              } else {
                  alert("Произошла ошибка при создании")
              }
          }).catch((err) => {
              if (!err?.response) {
                 alert("Нет ответа от сервера");
              } else if (err.response?.status === 409) {
                 alert("Логин занят");
              } else {
                 alert("Возникла ошибка при регистрации");
              }
              alert("Возникла ошибка на сервере")
          })
      }
  }

  function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    month = month < 10 ? '0' + month : month;
    let result = year + '-' + month + '-' + date + ' ' + time;
    return result
  }

  if (!cookies.username || cookies.username=="" || cookies.username==undefined)
    return (
      <AccessDenied />
    );

  return (
    <section>
      <div className="form-box reg">
        <div className="form-value">
          <form className="login-box" onSubmit={submitCheck}>
            <h2>Новая учётная запись</h2>
              <div className="input-box">
                <img className="user-icon" src={userImg} />
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={register.username}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Логин</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={userImg} />
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={register.role}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Роль</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={emailImg} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={register.email}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Email</label>
              </div>
              <div className="input-box">
                {passwordOpen ?
                <HandySvg className="user-icon-touchable" src={eyeOffImg} onClick={() => changeType()}/>
                :
                <HandySvg className="user-icon-touchable" src={eyeImg} onClick={() => changeType()}/>
                }
                <input
                  type={type}
                  id="password"
                  name="password"
                  value={register.password}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Пароль</label>
              </div>
              <div className="input-box">
                { passwordConfirmOpen ?
                <HandySvg className="user-icon-touchable" src={eyeOffImg} onClick={() => changeConfirmType()}/>
                :
                <HandySvg className="user-icon-touchable" src={eyeImg} onClick={() => changeConfirmType()}/>
                }
                <input
                  type={confirmType}
                  id="password_confirm"
                  name="password_confirm"
                  value={register.password_confirm}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Повторите пароль</label>
              </div>
              <button type="submit">Зарегистрировать</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;