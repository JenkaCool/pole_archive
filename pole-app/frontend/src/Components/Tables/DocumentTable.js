import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";



import DocumentStroke from './DocumentStroke';

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
      </div>

      <div className="big-table table">
        <table>
          <thead>
            <th>№</th>
            <th>Фонд</th>
            <th>Опись</th>
            <th>Единица хранения</th>
            <th>Общее количество листов</th>
            <th>Год документа</th>
            <th>Дополнительная информация</th>
            <th>Ссылка на электронный ресурс</th>
            <th>ID создателя</th>
            <th>Дата создания</th>
            <th>Флаг удаления</th>
            <th>Режим доступа</th>
          </thead>
          <tbody>
            {documentData.map(doc => ( <DocumentStroke row={doc} />))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DocumentTable;