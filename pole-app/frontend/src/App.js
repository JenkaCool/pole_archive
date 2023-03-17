import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch("/api").then(
    response => response.json()
    ).then(
      response => {setData(response.message)
      }
    )
  }, [])

  return (
    <div className="App">
        <header className="App-header">
            <div id="user-bar" className="in-one-role">
                <button><a class="button">Вход</a></button>
                <button><a class="button">Регистрация</a></button>
                <button><a class="button">Профиль</a></button>
            </div>
            <br/>
            <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
            <div id='navigation'>
                <button><a class="button">Список записей</a></button>
                <button><a class="button">Список документов</a></button>
            </div>
        </header>
        <div id='tools'>
            <button><a class="button-add">Добавить новую запись</a></button>
        </div>
        <div class="big-table">;
            <table>
                <thead>
                    <tr></tr>
                </thead>
                <tbody><tr></tr></tbody>
            </table>
        </div>
    </div>
  );
}

export default App;
