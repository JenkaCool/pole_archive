import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import '../css/Alerts.css';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-container">
       <div className="modal-content">
         <h2>Ошибка доступа!</h2><hr />
         <p>Содержание страницы доступно только авторизированным пользователям.</p>
         <div className="modal-buttons">
           <Link to="/login"><label className="modal-content-btn left" for="modal-toggle">Выполнить вход</label></Link>
           <Link to="/"><label className="modal-content-btn right" for="modal-toggle">Перейти на главную</label></Link>
         </div>
       </div>
     </div>
  );
}

export default AccessDenied;