import React from 'react'
import { Link } from "react-router-dom";

import bookImg from '../../imgs/open-book.png';
import coverImg from '../../imgs/cover.png';

import '../../css/Content.css';

function AboutProject() {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <div className="cover-div">
        <img className="cover-img" src={coverImg}/>
        <h1 className="cover-text">О проекте</h1>
      </div>
      <div className="quote">
        <blockquote>
          <p>
            Это веб-приложение создано для получения информации о
          </p>
          <p>
            «Польской ссылке в Олонецкую губернию в 1830-1914 гг.»,
          </p>
          <p>
            а также для её дополнения и редактирования.
          </p>
        </blockquote>
      </div>
      <img className="main-page-img" src={bookImg}/>
      <div className="quote">
        <blockquote>
          <p>
            Каждый человек рано или поздно начинает интересоваться прошлым
            своих родственников и предков. Как правило, такая информация
            передается из поколения в поколение.
            Однако из-за того, что
            человек может потерять связь с родственниками и его дальнейшая
            судьба остается неизвестной, например, в случае когда человек
            был отправлен в ссылку, бывает крайне проблематично восстановить
            полную информацию о конкретном человеке.
          </p>
        </blockquote>
      </div>
    </div>
  );
}

export default AboutProject;