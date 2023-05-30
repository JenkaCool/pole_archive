import React from 'react'
import { Link } from "react-router-dom";

import bookImg from '../../imgs/open-book.png'
import booksImg from '../../imgs/two-books.png'
import coverImg from '../../imgs/cover.png'


function AboutProject() {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <div className="cover-div">
        <img className="cover-img" src={coverImg}/>
        <h1 className="cover-text">О проекте</h1>
      </div>
      <img className="main-page-img" src={bookImg}/>
      <img className="main-page-img" src={booksImg}/>
    </div>
  );
}

export default AboutProject;