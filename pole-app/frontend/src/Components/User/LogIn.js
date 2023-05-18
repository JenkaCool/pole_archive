import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import md5 from 'md5';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useCookies } from "react-cookie";

import '../../css/User.css';
import userImg from '../../imgs/person-circle-outline.svg';
import passwordImg from '../../imgs/lock-closed-outline.svg';


const LogIn = () => {
  const [_, setUser] = useOutletContext();

  const [fail, setFail] = useState(null);
  const [cookies, setCookie] = useCookies(["access_token", "username"]);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(() => {
      return {
          username: "",
          password: ""
      }
  })

  const handleChange = event => {
      event.persist()
      setInputs(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }
  const handleChangePassword = event => {
      event.persist()
      setInputs(prev => {
          return {
              ...prev,
              [event.target.name]: md5(event.target.value),
          }
      })
  }

  const handleSubmit = event => {
      event.preventDefault();
      console.log(inputs)
      if(!inputs.username) {
          alert("You did not enter username")
      } else if(!inputs.password) {
          alert("You did not enter password")
      } else {
          axios( {
              method: 'post',
              url: "http://localhost:8888/api/login/",
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data: JSON.stringify({
                username: inputs.username,
                password: inputs.password,
              })
          })
          .then(response => {
              if (response.status === 200) {
                alert('User founded!');
              } else {
                  alert("Username or password incorrect");
              }
              return response.data;
          }).then(data => {
              console.log("Ok");
              console.log(data);
              if ("access_token" in data) {
                setFail(false);
                setCookie("access_token", data.access_token);
                setCookie("username", inputs.username);
                console.log(data.access_token);
                setUser(inputs.username);
                navigate("/");
              } else {
                setFail(true);
              }
          }).catch((err) => {
              if (!err?.response) {
                 alert("No Server Response");
              } else if (err.response?.status === 409) {
                 alert("Username Taken");
              } else {
                 alert("Authorization Failed");
              }
              alert("An error occurred on the server")
          })
      }
  }

  if (cookies.username)
    return (
      <div>
        <h2 id="ErrorMessage">You should logout first!</h2>
      </div>
    );

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit} className="login-box" >
            <h2>Вход</h2>
              <div className="input-box">
                <img className="user-icon" src={userImg} />
                <input type="username" name="username" onChange={handleChange} required></input>
                <label for="">Логин</label>
              </div>
              <div className="input-box">
                <img className="user-icon" src={passwordImg} />
                <input type="password" name="password" onChange={handleChangePassword} required></input>
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default LogIn;