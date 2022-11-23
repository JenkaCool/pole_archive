import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
/*
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch['/api']
    .then(response => response.json())
    .then(response => setData(response.message))
  }, [])

  <p>
     {!data ? "Loading..." : data}
  </p>
*/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          "hi"
        </p>
      </header>
    </div>
  );
}

export default App;
