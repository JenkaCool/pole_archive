import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import getCurrentDate from '../../functions/dateFunctions'

const ExileAdd = ({active, setActive}) => {
  const [record, setRecord] = useState(() => {
    return {
      list_num: 0,
    }
  })
  const [exile, setExile] = useState(() => {
    return {
      full_name: "",
      gender: "",
      rank: "",
      province: "",
      order_num: "",
      order_date: "",
      order_info: "",
      steward: "",
      order_reason: "",
      supervision_start_date: "",
      supervision_place: "",
      departure_place: "",
      income_flag: 0,
      mar_status: "",
      _family_info: "",
      cur_state: "",
      add_info: "",
      creating_date: "",
      visible_mode: "",
    }
  })

  const [incomes, setIncomes] = useState(() => {
    return {
      incomes: "",
    }
  })

  const handleChange = event => {
      event.persist()
      setExile(prev => {
          return {
              ...prev,
              [event.target.name]: event.target.value,
          }
      })
  }

  const postRecord = () => {

  }

  const postExile = () => {

  }

  const postIncomes = () => {

  }


  const handleSubmit = event => {
      event.preventDefault();
      if(!document.year) {
          alert("Год не введён")
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
      <h3>Добавить ссыльного</h3>
      <section>
	    <form onsubmit="alert('Поля удовлетворяют требованиям.');return false" className='form'>

		  <fieldset className="commonForm">
		    <div className="card">
              <div className="card-fields">
			    <h2><b>Документ</b></h2>
			    <div><p> Год: </p><p>  </p></div>
				<div><p> Фонд: </p><p>  </p></div>
				<div><p> Опись: </p><p>  </p></div>
				<div><p> Единица хранения: </p><p>  </p></div>
                <div><p> Общее количество листов: </p><p>  </p></div>
                <div><p> Ссылка: </p><p>  </p></div>
		        <div>
			      <p>Номер листа в документе:<em style={{color: 'red'}}>*</em></p>
				  <input type="text" id="list_num" name="list_num" autofocus required />
			    </div>
		      </div>
		    </div>
		  </fieldset>

		  <fieldset className="commonForm">
			<legend><b>Основная информация о ссыльном</b></legend>
			<p>Фамилия, имя, отчество:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="full_name"name="full_name"autofocus required />
			<div>
			    <label>Пол:<em  style={{color: 'red'}}>*</em></label> <br/>
				<input type="radio" className="gender" name="gender" value="1" checked /> Мужской <br/>
				<input type="radio" className="gender" name="gender" value="2" /> Женский <br/>
				<input type="radio" className="gender" name="gender" value="3" /> Не указано <br/>
			</div>
			<p> Должность: </p>
			<input type="text" id="rank" name="rank"/>
			<p> Губерния: </p>
			<input type="text" id="province" name="province"/>
		  </fieldset>

		  <fieldset className="commonForm">
		    <legend><b>Информация о распоряжении</b></legend>
			<p> Номер распоряжения: </p>
			<input type="text" id="order_num" name="order_num"/>
			<p> Дата распоряжения: <span></span><input type="date" id="orderDate"/> </p>
			<p> По какому распоряжению: </p>
			<input type="text" id="order_info" name="order_info"/>
			<p> Распорядитель: </p>
			<input type="text" id="steward" name="steward"/>
			<p>Причина:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="order_reason" name="order_reason" autofocus required />
			<p>С какого времени под надзором:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="supervision_start_date" name="supervision_start_date" autofocus required />
			<p> Место, где учреждён надзор: </p>
			<input type="text" id="supervision_place" name="supervision_place"/>
			<p> Откуда сослан: </p>
			<input type="text" id="departure_place" name="departure_place"/>
		  </fieldset>

		  <fieldset className="commonForm">
			<legend><b>Информация о получении содержания</b></legend>
			<p> Количество денежных средств: </p>
			<input type="text" id="amount" name="amount"/>
			<p>На что получает средства:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="reason" name="reason" autofocus required />
			<p> Периодичность начисления: </p>
			<input type="text" id="period" name="period"/>
		  </fieldset>

		  <fieldset className="commonForm">
			<legend><b>Дополнительная информация о ссыльном</b></legend>
			<p>
			    <label>Семейное положение:<em  style={{color: 'red'}}>*</em></label> <br/>
				<input type="radio" className="mar_status" name="mar_status" value="1" checked /> Неизвестно <br/>
				<input type="radio" className="mar_status" name="mar_status" value="2" /> Женат / замужем <br/>
				<input type="radio" className="mar_status" name="mar_status" value="3" /> Не женат / не замужем  <br/>
				<input type="radio" className="mar_status" name="mar_status" value="4" /> Разведён / разведена  <br/>
				<input type="radio" className="mar_status" name="mar_status" value="5" /> Состоит гражданском браке  <br/>
			</p>

			<p> Информация о семье: </p>
			<input type="text" id="familyInfo"/>
			<p> Текущее состояние ссыльного: </p>
			<input type="text" id="curState"/>
			<p> Дополнительная информация о ссыльном: </p>
			<input type="text" id="addInfo"/>
		  </fieldset>
		  <button name="submit" type="submit" className="manage-button">Добавить запись</button>
		</form>
	  </section>
    </>
  );
}

export default ExileAdd;