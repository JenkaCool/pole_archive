import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import DocumentStroke from './DocumentStroke';
import AccessDenied from '../AccessDenied';


const DocumentTable = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);
  const [documentData, setDocumentData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch('/api/documents/');
      const data = await response.json();
      setDocumentData(data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (cookies.username && cookies.username!="" && cookies.username!=undefined){
      makeAPICall();
    }
  }, [])

  if (!cookies.username || cookies.username=="" || cookies.username==undefined)
    return (
      <AccessDenied />
    );

  return (
    <>
      <h3>Список документов</h3>
      <div id='tools'>
        <Link to="/documents/add"><button className="manage-button">Добавить новый документ</button></Link>
      </div>

      <div className={"big-table table"}>
        <table>
          <thead>
            <th>№</th>
            <th>Год документа</th>
            <th>Фонд</th>
            <th>Опись</th>
            <th>Единица хранения</th>
            <th>Общее количество листов</th>
            <th>Дополнительная информация</th>
            <th>Ссылка на электронный ресурс</th>
            <th>ID создателя</th>
            <th>Дата создания</th>
          </thead>
          <tbody>
            {documentData.map(doc => ( <DocumentStroke row={doc} key={doc.doc_id} />))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DocumentTable;