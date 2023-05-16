import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ExileStroke from './ExileStroke';

const TableExile = () => {
  const [exileData, setExileData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8888/api/exiles/');
      const data = await response.json();
      const objectData = data;
      setExileData(objectData)
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
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      {exileData &&

      <div className="big-table table">
        <table>
          <thead>
            <th>№</th>
            <th>Ф.И.О.</th>
            <th>Пол</th>
            <th>Должность</th>
            <th>Губерния</th>
            <th>Номер распоряжения</th>
            <th>Дата распоряжения</th>
            <th>Описание распоряжения</th>
            <th>Распорядитель</th>
            <th>Причина ссылки</th>
            <th>Время начала надзора</th>
            <th>Место учреждения надзора</th>
            <th>Место отправки в ссылку</th>
            <th>Пособие</th>
            <th>Семейное положение</th>
            <th>Информация о семье</th>
            <th>Текущее состояние ссыльного</th>
            <th>Дополнительная информация о ссыльном</th>
            <th>ID создателя</th>
            <th>Дата создания</th>
            <th>Флаг удаления</th>
            <th>Режим доступа</th>
          </thead>
          <tbody>
            {exileData.map(exl => ( <ExileStroke row={exl} key={exl.exl_id}/>))}
          </tbody>
        </table>
      </div>
      }
    </>
  );
}

export default TableExile;