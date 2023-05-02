import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentView = () => {
  const {id} = useParams();
  const [documentData, setDocumentData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(`http://localhost:8888/api/documents/view/${id}`);
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
      <h3>Информация о документе</h3>
      <div>
        <div>
          <h4> Документ </h4>
          <p> Год документа: {documentData.doc_year}</p>
          <p> Фонд: {documentData.doc_fund}</p>
          <p> Опись: {documentData.doc_inventory}</p>
          <p> Единица хранения: {documentData.doc_storage_unit}</p>
          <p>Общее количество листов: {documentData.doc_total_lists_num}</p>
          <p> Дополнительная информация: {documentData.doc_additional_info}</p>
          <p> Ссылка на электронный ресурс: {documentData.doc_url}</p>
        </div>
        <div>
          <p>Создатель: {documentData.doc_creator_id}</p>
          <p>Дата: {documentData.doc_creating_date}</p>
          <p>Тип удаления:{documentData.doc_is_removed}</p>
          <p>Тип доступа: {documentData.doc_visible_mode}</p>
        </div>
      </div>
      <Link to="/documents/edit"><button className="manage-button">Изменить документ</button></Link>
    </>
  );
}

export default DocumentView;