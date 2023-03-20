import React from "react";
import { useState, useEffect } from 'react';
import { a, Routes, Route, } from "react-router-dom";

import './App.css';
import { Topbar } from './Components/Topbar';
import { Footer } from './Components/Footer';
import { TableExile } from './Components/Tables/ExileTable';
function App() {

  return (
    <div className="App">
      <Topbar/>
      <div className="Wrapper">
        <TableExile/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
