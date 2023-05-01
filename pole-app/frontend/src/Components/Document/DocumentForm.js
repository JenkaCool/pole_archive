import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const DocumentForm = ({info}) => {
  return (
    <>
      <h3> {info ? "Изменение информации о документе" : "Добавление документа" }</h3>
      <section>
	    <form onsubmit="alert('Поля удовлетворяют требованиям.');return false" className='form'>
		  <fieldset className="docParams">
            <p>Год документа:<em style={{color: 'red'}}>*</em></p>
            <input type="number" name="year" min="0" autofocus required />
            <p> Фонд: </p>
            <input type="text" name="fund" />
            <p> Опись: </p>
            <input type="text" name="inventory" />
            <p> Единица хранения: </p>
            <input type="text" name="storage_unit" />
            <p> Общее количество листов: </p>
            <input type="number" name="total_lists_num" min="0" value="0" />
            <p> Дополнительная информация: </p>
            <input type="text" name="additional_info" />
            <p> Ссылка на электронный ресурс: </p>
            <input type="text" name="url" />
		  </fieldset>
		  <button name="submit" type="submit" className="manage-button">Добавить запись</button>
		</form>
	  </section>
    </>
  );
}

export default DocumentForm;