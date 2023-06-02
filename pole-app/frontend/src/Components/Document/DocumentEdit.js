import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIService from '../APIService'

const DocumentEdit = ({info}) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(() => {
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
      setInputs(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }

  const insertDocument = () => {
    console.log("edit")
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      insertDocument()
      setInputs('')
  }

  return (
    <>
      <h3> Изменение информации о документе </h3>
      <section>
	    <form onSubmit={handleSubmit} className='form'>
		  <fieldset className="docParams">
            <p>Год документа:<em style={{color: 'red'}}>*</em></p>
            <input type="number" id="year" name="year" min="0" onChange={handleChange} autofocus required />
            <p> Фонд: </p>
            <input type="text" name="fund" onChange={handleChange}/>
            <p> Опись: </p>
            <input type="text" name="inventory" onChange={handleChange}/>
            <p> Единица хранения: </p>
            <input type="text" name="storage_unit" onChange={handleChange}/>
            <p> Общее количество листов: </p>
            <input type="number" name="total_lists_num" min="0" value="0" onChange={handleChange}/>
            <p> Дополнительная информация: </p>
            <input type="text" name="additional_info" onChange={handleChange}/>
            <p> Ссылка на электронный ресурс: </p>
            <input type="text" name="url" onChange={handleChange}/>
            <p> Создатель: </p>
            <input type="number" name="creator_id" onChange={handleChange}/>
            <p> Отображение: </p>
            <input type="number" name="visible_mode" onChange={handleChange}/>
		  </fieldset>
		  <button name="submit" type="submit" className="manage-button">Добавить запись</button>
		</form>
		<button className="manage-button">Очистить</button>
	  </section>
    </>
  );
}

export default DocumentEdit;