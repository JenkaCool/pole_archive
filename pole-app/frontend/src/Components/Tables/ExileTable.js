import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ExileStroke from './ExileStroke';
import Search from '../Search/Search';

const TableExile = () => {
  const [exileData, setExileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch('/api/archive/');
      const data = await response.json();
      const objectData = data;
      setExileData(objectData);
      setFilteredData(objectData)
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleChange = (value) => {
    setFilteredData(value)
  }

  const filterExiles = (value) => {
    setFilteredData(exileData.filter(exile => { return exile.exile.exl_full_name.toLowerCase().includes(value.toLowerCase()) }))
  }

  useEffect(() => {
    makeAPICall();
  }, [])


  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <Search handleFiltering={filterExiles}/>
      {exileData &&
      <div className={"big-table table"}>
        <table>
          <thead className="stiсky-header">
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
          </thead>
          <tbody>
            {filteredData ? filteredData.map(exl => ( <ExileStroke row={exl} key={exl.exl_id}/>)) : <tr>Записи не найдены</tr>}
          </tbody>
        </table>
      </div>
      }
    </>
  );
}

export default TableExile;