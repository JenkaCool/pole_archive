import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';
import md5 from 'md5';

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';
import emailImg from '../../imgs/mail-outline.svg';

const SignUp = () => {
  const salt = genSaltSync(12);

  function hashPassword(password: string, salt): string {
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }
  
  const [register, setRegister] = useState(() => {
      return {
          username: "",
          role: "",
          email: "",
          password: "",
          password2: "",
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

    const changePasswordRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: md5(event.target.value),
            }
        })
    }

  const submitChackin = event => {
      event.preventDefault();
      if(!validator.isEmail(register.email)) {
          alert("You did not enter email")
      } else if(register.password !== register.password2) {
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
                salt: salt,
                password: hashPassword(register.password, salt),
                date: getCurrentDate(),
              }
          }).then(res => {

              if (res.data === true) {
                  window.location.href = "http://localhost:8888/login/"
                  alert('User created!');
              } else {
                  console.log("Ok")
                  alert("There is already a user with this email")
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

  return (
    <section>
      <div className="form-box reg">
        <div className="form-value">
          <form className="login-box" onSubmit={submitChackin}>
            <h2>Регистрация</h2>
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
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={register.role}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Role</label>
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
                <img className="user-icon" src={passwordImg} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={register.password}
                  onChange={changeInputRegister}
                  required>
                </input>
                <label for="">Пароль</label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={register.password2}
                  onChange={changeInputRegister}
                  required>
                </input>
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