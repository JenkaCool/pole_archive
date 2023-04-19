import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ExileAddOne from '../Exile/ExileAddOne';


const ExileAdd = ({active, setActive}) => {
  return (
    <>
      <h3>Добавить ссыльного</h3>
      <section>
	    <form onsubmit="alert('Поля удовлетворяют требованиям.');return false" class='form'>
          <fieldset class="commonForm">
		    <p>
		        <label for="creatorName">Имя создателя записи:<em style={{color: 'red'}}>*</em></label>
			    <br/>
			    <input type="text" id="creatorName" autofocus required />
            </p>
		  </fieldset>

		  <fieldset class="commonForm">
		    <p>
			    <label>Год документа:<em style={{color: 'red'}}>*</em></label>
				<select id="docVars">
				  <option>1873</option>
				  <option>1874</option>
				</select>
				<br/><br/>
				<label for="docIndo">Добавить новый документ</label>
				<input type="checkbox" id="scales" name="docInfo" onchange="return pen()"/>
                <fieldset id="formDocInfo">
				  <legend><b>Новый документ</b></legend>
				  <p> Фонд: </p>
				  <input type="text" id="fund"/>
				  <p> Опись: </p>
				  <input type="text" id="inventory"/>
				  <p> Единица хранения: </p>
				  <input type="text" id="storageUnit"/>
				  <p>Общее количество листов:<em style={{color: 'red'}}>*</em></p>
				  <input type="text" id="totalListsNum" autofocus required />
				  <p> Год: </p>
				  <input type="text" id="orderYear"/>
				  <p> Ссылка: </p>
				  <input type="text" id="orderLink"/>
				  </fieldset>
		    </p>
		  </fieldset>

		  <fieldset class="commonForm">
		    <p>
			    <p>Номер листа в документе:<em style={{color: 'red'}}>*</em></p>
				<input type="text" id="listNum" autofocus required />
			</p>
		  </fieldset>


		  <fieldset class="commonForm">
			<legend><b>Основная информация о ссыльном</b></legend>
			<p>Фамилия, имя, отчество:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="fullName" autofocus required />
			<p> Чин: </p>
			<input type="text" id="rank"/>
			<p> Должность: </p>
			<input type="text" id="title"/>
			<p> Губерния: </p>
			<input type="text" id="province"/>
		  </fieldset>

		  <fieldset class="commonForm">
		    <legend><b>Информация о распоряжении</b></legend>
			<p> Номер распоряжения: </p>
			<input type="text" id="orderNum"/>
			<p> Дата распоряжения: <span></span><input type="date" id="orderDate"/> </p>
			<p> По какому распоряжению: </p>
			<input type="text" id="orderInfo"/>
			<p> Распорядитель: </p>
			<input type="text" id="steward"/>
			<p>Причина:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="orderReason" autofocus required />
			<p>С какого времени под надзором:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="supervisionStartDate" autofocus required />
			<p> Место, где учреждён надзор: </p>
			<input type="text" id="supervisionPlace"/>
			<p> Откуда сослан: </p>
			<input type="text" id="departurePlace"/>
		  </fieldset>

		  <fieldset class="commonForm">
			<legend><b>Информация о получении содержания</b></legend>
			<p> Количество денежных средств: </p>
			<input type="text" id="amount"/>
			<p>На что получает средства:<em style={{color: 'red'}}>*</em></p>
			<input type="text" id="getsReason" autofocus required />
			<p> Периодичность начисления: </p>
			<input type="text" id="period"/>
		  </fieldset>

		  <fieldset class="commonForm">
			<legend><b>Дополнительная информация о ссыльном</b></legend>
			<p>
			    <label>Семейное положение:<em  style={{color: 'red'}}>*</em></label> <br/>
				<input class="marStatus" type="radio" name="marStatusState" value="1" checked /> Неизвестно <br/>
				<input class="marStatus" type="radio" name="marStatusState" value="2" /> Женат / замужем <br/>
				<input class="marStatus" type="radio" name="marStatusState" value="3" /> Не женат / не замужем  <br/>
				<input class="marStatus" type="radio" name="marStatusState" value="4" /> Разведён / разведена  <br/>
				<input class="marStatus" type="radio" name="marStatusState" value="5" /> Состоит гражданском браке  <br/>
			</p>

			<p> Информация о семье: </p>
			<input type="text" id="familyInfo"/>
			<p> Текущее состояние ссыльного: </p>
			<input type="text" id="curState"/>
			<p> Дополнительная информация о ссыльном: </p>
			<input type="text" id="addInfo"/>
		  </fieldset>
		  <button name="submit" type="submit" class="manage-button">Добавить запись</button>
		</form>
	  </section>
    </>
  );
}

export default ExileAdd;