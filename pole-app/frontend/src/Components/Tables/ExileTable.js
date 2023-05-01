import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExileAddOne from '../Exile/ExileAddOne';
import axios from 'axios';

const TableExile = () => {
  const [exileData, setExileData] = useState([]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:500/exiles')
    .then(response => response.json())
    .then(response => setExileData(response.data))
    .catch(error => console.log(error))
  },[])

  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <div id='tools'>
        <Link to="/exiles/view"><button className="manage-button">Посмотреть запись</button></Link>
      </div>
      {console.log(exileData)}
      {exileData && <p>{exileData}</p>}

      <div className="big-table">
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody><tr></tr></tbody>
        </table>
      </div>
    </>
  );
}

export default TableExile;