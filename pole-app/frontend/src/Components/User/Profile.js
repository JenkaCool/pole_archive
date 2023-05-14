import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import '../../css/User.css';

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/profile/');
      const data = await response.json();
      setProfileData(data)
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
      <h3>Профиль</h3>
      <div>
        <div><p>Логин:</p><p>{profileData.username}</p></div>
        <div><p>Роль:</p><p>{profileData.role}</p></div>
        <div><p>Email:</p><p>{profileData.email}</p></div>
        <div><p>Дата регистрации:</p><p>{profileData.date}</p></div>
      </div>
    </>
  );
}

export default Profile;