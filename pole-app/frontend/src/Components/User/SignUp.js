import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import md5 from 'md5';
import axios from 'axios';
import validator from 'validator';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import { useCookies } from "react-cookie";
import { HandySvg } from 'handy-svg'

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';
import emailImg from '../../imgs/mail-outline.svg';
import eyeImg from '../../imgs/eye.svg';
import eyeOffImg from '../../imgs/eye-off.svg';
import AccessDenied from '../AccessDenied';


const SignUp = () => {
  const [_, setUser] = useOutletContext();
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  const [ type, setType] = useState('password');
  const [ confirmType, setConfirmType] = useState('password');
  const [ passwordOpen, setPasswordOpen] = useState(false);
  const [ passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);

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

  const [register, setRegister] = useState(() => {
      return {
          username: "",
          role: "",
          email: "",
          password: "",
          password_confirm: "",
      }
  })

  const changeInputRegister = event => {
      event.persist()
      setRegister(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }

  const submitChackin = event => {
      event.preventDefault();
      if(!validator.isEmail(register.email)) {
          alert("You did not enter email")
      } else if(register.password !== register.password_confirm) {
          alert("Repeated password incorrectly")
      } else if(!validator.isStrongPassword(register.password, {minSymbols: 0})) {
          alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
      } else {
          axios( {
              method: 'post',
              url: "http://localhost:8888/api/signup/",
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
                  window.location.href = "http://localhost:8888/login/"
                  alert('User created!');
                  return res.json();
              } else {

                  alert("There has some error")
              }
          }).catch((err) => {
              if (!err?.response) {
                 alert("No Server Response");
              } else if (err.response?.status === 409) {
                 alert("Username Taken");
              } else {
                 alert("Registration Failed");
              }
              alert("An error occurred on the server")
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
          <form className="login-box" onSubmit={submitChackin}>
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