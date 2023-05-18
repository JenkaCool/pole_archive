import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import '../../css/User.css';

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/profile/');
      const data = await response.json();
      setProfileData(data.token)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])


  return (
    <>
      {profileData ?
        <div>
          <h3>Профиль</h3>
          <div key={profileData.user_id}>
            <div><p>Логин:</p><p>{profileData.username}</p></div>
            <div><p>Роль:</p><p>{profileData.role}</p></div>
            <div><p>Email:</p><p>{profileData.email}</p></div>
            <div><p>Дата регистрации:</p><p></p></div>
          </div>
        </div>
        :
        <p>Сперва нужно авторизироваться</p>
      }
    </>
  );
}

export default Profile;