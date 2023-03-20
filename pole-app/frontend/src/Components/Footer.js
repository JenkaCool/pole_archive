import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
        <div id="footer-information" className="in-one-role">
          ©ПетрГУ 2023
        </div>
    </footer>
  );
}

export { Footer }