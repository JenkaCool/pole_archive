import React from 'react'
import { Link } from "react-router-dom";

import '../css/PageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-content not-found center-page-align inside-padding">
      <h1> Oh, no! </h1>
      <h2> #404 (Page not found) </h2>
      <br></br>
      <p> An error has occurred! Don't worry, we've already assigned this task to our best robot. </p>
      <br></br>
      <p> In the meantime, try these links: </p>
      <ul>
        <li>
          <Link to="/" className="page-link"> Main page  </Link>
        </li>
      </ul>
    </div>
  );
}

export default PageNotFound;