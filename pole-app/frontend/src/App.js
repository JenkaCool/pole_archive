import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import Topbar from './Components/Topbar';
import Footer from './Components/Footer';
import MainPage from './Components/MainPage';
import ExileForm from './Components/Exile/ExileForm';
import DocumentForm from './Components/Document/DocumentForm';
import ExileView from './Components/Exile/ExileView';
import ExileAdd from './Components/Exile/ExileAdd';
import DocumentView from './Components/Document/DocumentView';
import ExileTable from './Components/Tables/ExileTable';
import DocumentTable from './Components/Tables/DocumentTable';
import Profile  from './Components/User/Profile';
import LogIn from './Components/User/LogIn';
import SignUp from './Components/User/SignUp';
import PageNotFound from './Components/PageNotFound';

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
                <Route path="login" element={<LogIn/>} />
                <Route path="signup" element={<SignUp/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="documents" element={<DocumentTable/>} />
                <Route path="exiles" element={<ExileTable/>} />
                <Route path="documents/add" element={<DocumentForm/>} />
                <Route path="exiles/add" element={<ExileAdd info={false}/>} />
                <Route path="documents/view/:id" element={<DocumentView/>} />
                <Route path="exiles/view/:id" element={<ExileView/>} />
                <Route path="documents/edit" element={<DocumentForm info={true}/>} />
                <Route path="exiles/edit" element={<ExileForm info={true}/>} />
                <Route path="404" element={<PageNotFound/>} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;