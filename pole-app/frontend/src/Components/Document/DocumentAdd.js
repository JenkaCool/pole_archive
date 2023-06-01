import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import APIService from '../APIService'

const DocumentAdd = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const fund = event.target.fund;
    const inventory = event.target.inventory;
    const storage_unit = event.target.storage_unit;
    const total_lists_num = event.target.total_lists_num;
    const additional_info = event.target.additional_info;
    const url = event.target.url;
    const creator_id = event.target.creator_id;
    const visible_mode = event.target.visible_mode;

    setInputs(values => ({...values, [fund]: fund, [inventory]: inventory, [storage_unit]: storage_unit, [total_lists_num]: total_lists_num, [additional_info]: additional_info, [url]: url, [creator_id]: creator_id, [visible_mode]: visible_mode}));

    console.log(inputs);
  }

  const insertDocument = () => {
    if (inputs) {
      APIService.InsertDocument({inputs})
      .then((response) => props.insertedDocument(response))
      .catch(error => console.log('error',error))
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      insertDocument()
      setInputs('')
  }
  return (
    <>
      <h3>Добавление документа</h3>
      <section>
	    <form onSubmit={handleSubmit} className='form'>
		  <fieldset className="docParams">
            <p>Год документа:<em style={{color: 'red'}}>*</em></p>
            <input type="number" name="year" min="0" autofocus required />
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
		<button className="manage-button">DocumentAdd.jsОчистить</button>
	  </section>
    </>
  );
}

export default DocumentAdd;