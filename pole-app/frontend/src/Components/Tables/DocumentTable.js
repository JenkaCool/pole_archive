import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentTable = () => {
  return (
    <>
      <h3>Список документов</h3>
      <div id='tools'>
        <Link to="/document-add"><button className="manage-button">Добавить новую запись</button></Link>
        <Link to="/document"><button className="manage-button">Посмотреть запись</button></Link>
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