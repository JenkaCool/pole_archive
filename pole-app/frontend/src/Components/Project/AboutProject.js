import React from 'react'
import { Link } from "react-router-dom";

import bookImg from '../../imgs/open-book.png'
import booksImg from '../../imgs/two-books.png'


function AboutProject() {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <h1> Электронное хранилище архивных данных </h1>
      <img className="main-page-img" src={bookImg}/>
      <img className="main-page-img" src={booksImg}/>
    </div>
  );
}

export default AboutProject;