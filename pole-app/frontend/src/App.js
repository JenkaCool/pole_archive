import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import Topbar from './Components/Topbar';
import Footer from './Components/Footer';
import MainPage from './Components/MainPage';
import ExilePage from './Components/Exile/ExilePage';
import DocumentPage from './Components/Document/DocumentPage';
import ExileAdd from './Components/Exile/ExileAdd';
import DocumentAdd from './Components/Document/DocumentAdd';
import ExileTable from './Components/Tables/ExileTable';
import DocumentTable from './Components/Tables/DocumentTable';
import Profile  from './Components/User/Profile';
import LogIn from './Components/User/LogIn';
import SignUp from './Components/User/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="Wrapper">
          <Topbar/>
          <div className="Content">
            <Routes>
              <Route index element={<div>No page is selected.</div> } />
                <Route path="/" element={<MainPage/> } />
                <Route path="log-in" element={<LogIn/>} />
                <Route path="sign-up" element={<SignUp/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="exile" element={<ExilePage/>} />
                <Route path="document" element={<DocumentPage/>} />
                <Route path="exile-add" element={<ExileAdd/>} />
                <Route path="document-add" element={<DocumentAdd/>} />
                <Route path="document-table" element={<DocumentTable/>} />
                <Route path="exile-table" element={<ExileTable/>} />
            </Routes>

          </div>
          <Footer/>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;