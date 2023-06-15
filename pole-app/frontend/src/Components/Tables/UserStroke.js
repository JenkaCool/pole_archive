import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

import '../../css/Table.css';
import { removeOneUser } from '../../functions/ApiFunctions';

const UserStroke = ({row}) => {
  const route = useNavigate();

  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState([]);

  const handleRemove = (index) => {
    removeOneUser(index);
  };

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
      <td>{dayjs(userData.usr_registration_date).format("DD/MM/YYYY")}</td>
      <td>{count}</td>
      <td>
        <Link><button className="manage-button">Изменить</button></Link>
        <button className="manage-button" onClick={() => handleRemove(userData.usr_id)}>Удалить</button>
      </td>
    </tr>
  );
}

export default UserStroke;