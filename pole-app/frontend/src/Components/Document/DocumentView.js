import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentView = () => {
  return (
    <>
      <h3>Информация о документе</h3>
      <div>
        <div>
          <h4> Документ </h4>
          <p> Год документа </p>
          <p> Фонд: </p>
          <p> Опись: </p>
          <p> Единица хранения: </p>
          <p>Общее количество листов: </p>
          <p> Дополнительная информация: </p>
          <p> Ссылка на электронный ресурс: </p>
        </div>
        <div>
          <p>Создатель:</p>
          <p>Дата:</p>
          <p>Тип доступа:</p>
        </div>
      </div>
      <Link to="/documents/edit"><button className="manage-button">Изменить документ</button></Link>
    </>
  );
}

export default DocumentView;