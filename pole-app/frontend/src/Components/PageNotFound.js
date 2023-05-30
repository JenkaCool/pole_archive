import React from 'react'
import { Link } from "react-router-dom";

import '../css/PageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <h1> Ох, нет! </h1>
      <h2> #404 (Страница не найдена) </h2>
      <br></br>
      <p> Произошла ошибка! Не волнуйтесь, мы уже поручили эту задачу нашему лучшему роботу. </p>
      <br></br>
      <p> Попробуйте перейти по другим ссылкам: </p>
      <ul>
        <li>
          <Link to="/" className="modal-btn"> Главная страница  </Link>
        </li>
      </ul>
    </div>
  );
}

export default PageNotFound;