import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import dayjs from 'dayjs';

import '../../css/User.css';

const Profile = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  const [userLogin, setUserLogin] = useState(false);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [date, setDate] = useState(null);

  function setData(data) {
    setUserId(data.usr_id);
    setUsername(data.usr_username);
    setRole(data.usr_role);
    setEmail(data.usr_email);
    setDate(dayjs(data.usr_registration_date).format("DD/MM/YYYY"));
  }

  const makeAPICall = async () => {
    try {
      const response = await fetch('/api/profile/');
      const data = await response.json();
      setData(data)
          setUserLogin(true);
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
        <>
          <h3>Профиль</h3>
          <div className="card">

            <div key={userId} className="card-fields">
              <h2>Информация о профиле</h2>
              <div><p>Логин:</p><p>{username}</p></div>
              <div><p>Роль:</p><p>{role}</p></div>
              <div><p>Email:</p><p>{email}</p></div>
              <div><p>Дата регистрации:</p><p>{date}</p></div>
            </div>
          </div>
        </>
        :
        <p>Данные о пользователе не найдены</p>
      }
    </>
  );
}

export default Profile;