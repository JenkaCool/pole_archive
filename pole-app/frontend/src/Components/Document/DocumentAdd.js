import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';

const DocumentAdd = () => {
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

  function getCurrentDate(separator='-'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    month = month < 10 ? '0' + month : month;
    let result = year + '-' + month + '-' + date + ' ' + time;
    return result
  }

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
      if(!document.year) {
          alert("You did not enter year")
      } else {
          axios( {
              method: 'post',
              url: "/api/documents/add/",
              headers: {
                'Content-type': 'application/json'
              },
              data: {
                year: document.year,
                fund: document.fund,
                inventory: document.inventory,
                storage_unit: document.storage_unit,
                total_lists_num: isNaN(document.total_lists_num) ? document.total_lists_num : 0,
                additional_info: document.additional_info,
                url: document.url,
                creator_id: 0,
                date: getCurrentDate(),
                visible_mode: 0,
              }
          }).then(res => {

              if (res.data === true) {
                  window.location.href = "/documents/"
                  alert('Document added!');
              } else {
                  console.log("Ok")
                  alert("There is already a document with this year")
              }
          }).catch((err) => {
              if (!err?.response) {
                 alert("No Server Response");
              } else if (err.response?.status === 409) {
                 alert("Username Taken");
              } else {
                 alert("Registration Failed");
              }
              alert("An error occurred on the server")
          })
      }
  }
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