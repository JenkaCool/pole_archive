import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentTable = () => {
  return (
    <>
      <h3>Список документов</h3>
      <div id='tools'>
        <Link to="/documents/add"><button className="manage-button">Добавить новый документ</button></Link>
        <Link to="/documents/view"><button className="manage-button">Посмотреть документ</button></Link>
        <Link to="/exiles/add"><button className="manage-button">Добавить запись</button></Link>

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

export default DocumentTable;