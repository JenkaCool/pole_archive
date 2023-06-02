import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ExileStroke from './ExileStroke';
import Search from '../Search/Search';

const TableExile = () => {
  const [exileData, setExileData] = useState([]);
  const [scrollL, setScrollL] = useState(false);
  const [scrollR, setScrollR] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch('/api/archive/');
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


  const handleScroll = event => {
    if (event.target.scrollLeft === 0) {
      setScrollR(true);
      setScrollL(false);
    } else
      if (event.target.scrollWidth - event.target.scrollLeft === event.target.clientWidth) {
        setScrollR(false);
        setScrollL(true);
      } else {
        setScrollR(true);
        setScrollL(true);
      }

    //setScroll(event.target.scrollLeft > (event.target.scrollWidth / 2));
  };

  const handleChange = (value) => {
    setFilteredData(value)
  }
  return (
    <>
      <h3>Список записей о польских ссыльных в Олонецкой губернии</h3>
      <Search/>
      {exileData &&
      <div className={"big-table table" + (scrollL ? " scroll-left"  : '' ) + (scrollR ? " scroll-right"  : '' )}>
        <table onScroll={handleScroll}>
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