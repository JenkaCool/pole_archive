import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExileAddOne from '../Exile/ExileAddOne';

const TableExile = () => {
  const [exileData, setExileData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/exiles/');
      const data = await response.json();
      setExileData(data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])

  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <div id='tools'>
        <Link to="/exiles/view"><button className="manage-button">Посмотреть запись</button></Link>
      </div>

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