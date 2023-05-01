import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExileAddOne from '../Exile/ExileAddOne';

const TableExile = () => {
  const [modalActive, setModalActive] = useState(true)
  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <div id='tools'>
        <Link to="/exiles/view"><button className="manage-button">Посмотреть запись</button></Link>
      </div>

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