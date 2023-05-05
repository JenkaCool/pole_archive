import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ExileView = () => {
  const {id} = useParams();
  const [exileData, setExileData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(`http://localhost:8888/api/exiles/view/${id}`);
      const data = await response.json();
      setExileData(data.exile)
      setIncomesData(data.incomes)
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
      <h3>Информация о ссыльном</h3>
      <div>
        <div>
          <h4>Основная информация о ссыльном</h4>
          <p> Фамилия, имя, отчество: {exileData.exl_full_name}</p>
          <p> Пол {exileData.exl_gender} </p>
          <p> Должность: {exileData.exl_rank}</p>
          <p> Губерния: {exileData.exl_province}</p>
        </div>
        <div>
		  <h4>Информация о распоряжении</h4>
          <p> Номер распоряжения: {exileData.exl_order_num}</p>
          <p> Дата распоряжения: {exileData.exl_order_date}</p>
          <p> По какому распоряжению: {exileData.exl_order_info}</p>
          <p> Распорядитель: {exileData.exl_steward}</p>
          <p> Причина: {exileData.exl_order_reason}</p>
          <p> С какого времени под надзором: {exileData.exl_supervision_start_date}</p>
          <p> Место, где учреждён надзор: {exileData.exl_supervision_place}</p>
          <p> Откуда сослан: {exileData.exl_departure_place}</p>
        </div>
          { exileData.exl_income_flag == 0 ?
            <></> :
            <div>
              <h4>Информация о получении содержания</h4>
              <ul>
                {incomesData.map(inc => (
                  <li>
                    {Number(inc.inc_amount) > 0 ?
                      <p> Количество денежных средств: {Number(inc.inc_amount)} {inc.inc_currency}</p> :
                      <></>
                    }
                    {inc.inc_period === null || inc.inc_period === undefined ?
                      <></> :
                      <p>Периодичность начисления: {inc.inc_period}</p>
                    }
                    <p>Причина начисления: {inc.inc_reason}</p>
                    {inc.inc_source === null || inc.inc_source === undefined ?
                      <></>:
                      <p>Источник денежных средств: {inc.inc_source}</p>
                    }
                  </li>
                ))}
              </ul>
            </div>
          }
        <div>
          <h4>Дополнительная информация о ссыльном</h4>
          <p>Семейное положение: {exileData.exl_mar_status}</p>
          <p> Информация о семье: {exileData.exl_family_info}</p>
          <p> Текущее состояние ссыльного: {exileData.exl_cur_state}</p>
          <p> Дополнительная информация о ссыльном: {exileData.exl_add_info}</p>
        </div>
        <div>
          <p>Создатель: {exileData.exl_creator_id}</p>
          <p>Дата: {exileData.exl_creating_date}</p>
          <p>Тип доступа: {exileData.exl_is_removed}</p>
          <p>Удаление: {exileData.exl_visible_mode}</p>
        </div>
      </div>
      <Link to="/exiles/edit"><button className="manage-button">Изменить запись</button></Link>
    </>
  );
}

export default ExileView;