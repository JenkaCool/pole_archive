import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const TableExile = () => {
  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <div id='tools'>
        <a><button className="manage-button">Добавить новую запись</button></a>
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