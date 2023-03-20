import React from "react";
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import Topbar from './Components/Topbar';
import Footer from './Components/Footer';
import ExileTable from './Components/Tables/ExileTable';
import DocumentTable from './Components/Tables/DocumentTable';
import ExilePage from './Components/Exile/ExilePage';
import DocumentPage from './Components/Document/DocumentPage';
import Profile  from './Components/User/Profile';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Topbar/>
        <div className="Wrapper">
          <Routes>
            <Route index element={<div>No page is selected.</div> } />
              <Route path="/" element={<ExileTable/> } />
              <Route path="exile" element={<ExilePage/>} />
              <Route path="document" element={<DocumentPage/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="document-table" element={<DocumentTable />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;