import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useCookies, CookiesProvider } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";

import './App.css';

import Topbar from './Components/Topbar';
import Footer from './Components/Footer';

function App() {
  const navigate = useNavigate();

  let [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "username"
  ]);

  if (user == null && cookies.username) {
    setUser(cookies.username);
    setCookie("username", cookies.username);
  }

  return (
    <div className="App">
        <div className="Wrapper">
          <Topbar/>
          <div className="Content">
          <CookiesProvider>
            <Outlet context={[user, setUser]} />
          </CookiesProvider>
          </div>
          <Footer/>
        </div>
    </div>
  );
}

export default App;