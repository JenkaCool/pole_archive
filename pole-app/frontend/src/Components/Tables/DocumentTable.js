import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentTable = () => {
  const [documentData, setDocumentData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/documents/');
      const data = await response.json();
      setDocumentData(data)
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
      <h3>Список документов</h3>
      <div id='tools'>
        <Link to="/documents/add"><button className="manage-button">Добавить новый документ</button></Link>
        <Link to="/documents/view"><button className="manage-button">Посмотреть документ</button></Link>
        <Link to="/exiles/add"><button className="manage-button">Добавить запись</button></Link>
      </div>

        {documentData.map(doc => (
          <div key={doc.doc_id}>
            <p>{doc.doc_fund}</p>
            <p>{doc.doc_storage_unit}</p>
            <p>{doc.doc_total_lists_num}</p>
            <p>{doc.doc_url}</p>
            <p>{doc.doc_additional_info}</p>
            <p>{doc.doc_year}</p>
            <p>{doc.doc_id}</p>
            <p>{doc.doc_inventory}</p>
            <p>{doc.doc_creator_id}</p>
            <p>{doc.doc_creating_date}</p>
            <p>{doc.doc_visible_mode}</p>
            <p>{doc.doc_is_removed}</p>
          </div>
        ))}

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