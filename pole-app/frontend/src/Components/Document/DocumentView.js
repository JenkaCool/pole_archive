import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DocumentView = () => {
  const route = useNavigate();
  const {id} = useParams();

  const [documentData, setDocumentData] = useState([]);
  const [recordsData, setRecordsData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(`http://localhost:8888/api/documents/view/${id}`);
      const data = await response.json();
      setDocumentData(data.document);
      setRecordsData(data.records);
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
      <div className="info-form">
        <div className="info-block">
          <h4> Документ </h4>
          <div>
            <p> Год документа: </p>
            <p>{documentData.doc_year}</p>
          </div>
          <div>
            <p> Фонд: </p>
            <p>{documentData.doc_fund}</p>
          </div>
          <div>
            <p> Опись: </p>
            <p>{documentData.doc_inventory}</p>
          </div>
          <div>
            <p> Единица хранения: </p>
            <p>{documentData.doc_storage_unit}</p>
          </div>
          <div>
            <p>Общее количество листов: </p>
            <p>{documentData.doc_total_lists_num}</p>
          </div>
          <div>
            <p> Дополнительная информация: </p>
            <p>{documentData.doc_additional_info}</p>
          </div>
          <div>
            <p> Ссылка на электронный ресурс: </p>
            <p>{documentData.doc_url}</p>
          </div>
        </div>
        <div className="info-block">
          <p>Создатель: {documentData.doc_creator_id}</p>
          <p>Дата: {documentData.doc_creating_date}</p>
          <p>Тип удаления:{documentData.doc_is_removed}</p>
          <p>Тип доступа: {documentData.doc_visible_mode}</p>
        </div>
      </div>
      <Link to="/documents/edit"><button className="manage-button">Изменить документ</button></Link>
      <div>
        <h4> Список записей </h4>
        <Link to="/exiles/add"><button className="manage-button">Добавить запись</button></Link>
          {
            recordsData ?
            <div className="table">
              <p>Найдено записей: {recordsData.length}</p>
              <table>
                <thead>
                  <th>№ ссыльного</th>
                  <th>Номер листа в документе</th>
                  <th>Создатель</th>
                  <th>Дата</th>
                  <th>Тип удаления</th>
                  <th>Тип доступа</th>
                </thead>
                <tbody>
                  {recordsData.map(rec => (
                    <tr onClick={() => route(`/exiles/view/${rec.exl_id}`)}>
                      <td>{rec.exl_id}</td>
                      <td>{rec.rec_list_num}</td>
                      <td>{rec.rec_creator_id}</td>
                      <td>{rec.rec_creating_date}</td>
                      <td>{rec.rec_is_removed}</td>
                      <td>{rec.rec_visible_mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>:
            <p>Записей нет</p>
          }
      </div>
    </>
  );
}

export default DocumentView;