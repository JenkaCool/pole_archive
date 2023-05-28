import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../../css/Table.css';


const UserStroke = ({row}) => {
  const route = useNavigate();

  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    setUserData(row.user);
    setCount(row.records_count);
  }, [row])

  return (
    <tr>
      <td>{userData.usr_id}</td>
      <td>{userData.usr_username}</td>
      <td>{userData.usr_role}</td>
      <td>{userData.usr_email}</td>
      <td>{userData.usr_registration_date}</td>
      <td>{count}</td>
      <td><button className="manage-button">Изменить</button><button className="manage-button">Удалить</button></td>
    </tr>
  );
}

export default UserStroke;