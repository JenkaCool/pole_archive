import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import UserStroke from './UserStroke';
import AccessDenied from '../AccessDenied';

const TableUser = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  const [userData, setUserData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/users/');
      const data = await response.json();
      const objectData = data;
      setUserData(objectData)
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
      <AccessDenied />
    );

  return (
    <>
      <h3>Список пользователей</h3>
      <Link to="/signup"><button className="manage-button"> Добавить пользователя </button></Link>
      {userData &&
      <div className="table">
        <table>
          <thead>
            <th>ID</th>
            <th>Имя</th>
            <th>Роль</th>
            <th>Email</th>
            <th>Дата регистрации</th>
            <th>Количество созданных записей</th>
            <th>Действия</th>
          </thead>
          <tbody>
            {userData.map(usr => ( <UserStroke row={usr} key={usr.user.usr_id}/>))}
          </tbody>
        </table>
      </div>
      }
    </>
  );
}

export default TableUser;