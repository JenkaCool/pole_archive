import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App';
import AboutProject from './Components/Project/AboutProject';
import ExileEdit from './Components/Exile/ExileEdit';
import DocumentEdit from './Components/Document/DocumentEdit';
import ExileView from './Components/Exile/ExileView';
import DocumentAdd from './Components/Document/DocumentAdd';
import ExileAdd from './Components/Exile/ExileAdd';
import DocumentView from './Components/Document/DocumentView';
import ExileTable from './Components/Tables/ExileTable';
import DocumentTable from './Components/Tables/DocumentTable';
import UserTable from './Components/Tables/UserTable';
import Profile  from './Components/User/Profile';
import LogIn from './Components/User/LogIn';
import SignUp from './Components/User/SignUp';
import PageNotFound from './Components/PageNotFound';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AboutProject/> } />
          <Route exact path="login" element={<LogIn/>} />
          <Route exact path="signup" element={<SignUp/>} />
          <Route exact path="profile" element={<Profile/>} />
          <Route exact path="documents" element={<DocumentTable/>} />
          <Route exact path="archive" element={<ExileTable/>} />
          <Route exact path="users" element={<UserTable/>} />
          <Route exact path="documents/add" element={<DocumentAdd/>} />
          <Route exact path="archive/add" element={<ExileAdd/>} />
          <Route exact path="documents/view/:id" element={<DocumentView/>} />
          <Route exact path="archive/view/:id" element={<ExileView/>} />
          <Route exact path="documents/edit" element={<DocumentEdit/>} />
          <Route exact path="archive/edit" element={<ExileEdit/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();