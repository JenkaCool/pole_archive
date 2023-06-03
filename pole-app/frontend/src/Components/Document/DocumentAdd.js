import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import validator from 'validator';

import AccessDenied from '../AccessDenied';
import addOneDocument from '../../functions/ApiFunctions';

const DocumentAdd = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username", "user_id"]);

  const [userId, setUserId] = useState(null);

  const [document, setDocument] = useState(() => {
    return {
      year: 0,
      fund: "",
      inventory: "",
      storage_unit: "",
      total_lists_num: 0,
      additional_info: "",
      url: "",
      creator_id: "",
      visible_mode: "",
    }
  })

  const handleChange = event => {
      event.persist()
      setDocument(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }

  const handleSubmit = event => {
      event.preventDefault();
      if (document && document!="", document!=undefined){
        if (cookies.user_id && cookies.user_id!="", cookies.user_id!=undefined) {
            addOneDocument(document, cookies.user_id);
          } else {
            alert("Для отправки данных сперва нужно войти в учётную запись");
          }
      } else {
        alert("Данные для отправки отсутствуют");
      }
  }

  if (!cookies.username || cookies.username=="" || cookies.username==undefined)
    return (
      <AccessDenied />
    );

  return (
    <>
      <h3> Добавление документа </h3>
      <section>
	    <form onSubmit={handleSubmit} className='form'>
		  <fieldset className="docParams">
            <p>Год документа:<em style={{color: 'red'}}>*</em></p>
            <input type="number" name="year" min="0" value={document.year} onChange={handleChange} autofocus required />
            <p> Фонд: </p>
            <input type="text" name="fund" value={document.fund} onChange={handleChange} />
            <p> Опись: </p>
            <input type="text" name="inventory" value={document.inventory} onChange={handleChange} />
            <p> Единица хранения: </p>
            <input type="text" name="storage_unit" value={document.storage_unit} onChange={handleChange} />
            <p> Общее количество листов: </p>
            <input type="number" name="total_lists_num" min="0" value="0" value={document.total_lists_num} onChange={handleChange} />
            <p> Дополнительная информация: </p>
            <input type="text" name="additional_info" value={document.additional_info} onChange={handleChange} />
            <p> Ссылка на электронный ресурс: </p>
            <input type="text" name="url" value={document.url} onChange={handleChange} />
            <p> Создатель: </p>
            <input type="number" name="creator_id" value={document.creator_id} onChange={handleChange}/>
            <p> Отображение: </p>
            <input type="number" name="visible_mode" value={document.visible_mode} onChange={handleChange}/>
		  </fieldset>
		  <button name="submit" type="submit" className="manage-button">Добавить запись</button>
		</form>
		<button className="manage-button">Очистить</button>
	  </section>
    </>
  );
}

export default DocumentAdd;