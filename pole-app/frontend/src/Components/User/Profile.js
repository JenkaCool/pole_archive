import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import '../../css/User.css';

import SITE_DOMAIN from '../../paths.js';

const Profile = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  const [userLogin, setUserLogin] = useState(false);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);

  function setData(data) {
    setUserLogin(true);
    setUserId(data.id);
    setUsername(data.username);
    setRole(data.role);
    setEmail(data.email);
    setData(data.date);
  }

  const makeAPICall = async () => {
    try {
      const response = await fetch(SITE_DOMAIN + "/api/profile/");
      const data = await response.json();
      setData(data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (cookies.username && cookies.username!="" && cookies.username!=undefined){
      makeAPICall();
    }
  }, [])

  if (!cookies.username || cookies.username=="" || cookies.username==undefined)
    return (
      <div>
        <h4 id="ErrorMessage"> Просмотр данного материала доступен только авторизированному пользователю.</h4>
      </div>
    );

  return (
    <>
      {userLogin ?
        <div>
          <h3>Профиль</h3>
          <div key={userId}>
            <div><p>Логин:</p><p>{username}</p></div>
            <div><p>Роль:</p><p>{role}</p></div>
            <div><p>Email:</p><p>{email}</p></div>
            <div><p>Дата регистрации:</p><p>{date}</p></div>
          </div>
        </div>
        :
        <p>Данные о пользователе не найдены</p>
      }
    </>
  );
}

export default Profile;