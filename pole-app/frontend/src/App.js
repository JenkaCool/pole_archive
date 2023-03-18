import React from "react";
import { useState, useEffect } from 'react';
import { a, Routes, Route, } from "react-router-dom";

import './App.css';
//import { Topbar } from './Components/Topbar';
//import { TableExile } from './Components/TableExile';
function App() {

  return (
    <div className="App">
       <header className="App-header">
            <div id="user-bar" className="in-one-role">
                <button class="button">RU(русский)</button>
                <a className="page-a"> О проекте </a>
                <a className="page-a"> Контактная информация </a>
                <a className="page-a"> Форум </a>
                <a className="page-a"> Поиск </a>
            </div>
            <br/>
            <div id="user-bar" className="in-one-role">
                <h4>Электронный архив</h4>
                <div id='navigation'>
                    <a className="page-a"> Главная </a>
                    <a className="page-a"> Архив </a>
                    <a className="page-a"> Документы </a>
                </div>
                <div id='authorization'>
                    <a className="page-a"> Вход </a>
                    <a className="page-a"> Регистрация </a>
                    <a className="page-a"> Профиль </a>
                    <button className="button"> Выход </button>
                </div>
            </div>
        </header>
      <div className="Content">
        <div id='tools'>
            <button><a className="button-add">Добавить новую запись</a></button>
        </div>
        <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
        <div className="big-table">
            <table>
                <thead>
                    <tr></tr>
                </thead>
                <tbody><tr></tr></tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default App;
