import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { DOMEN_SITE, DOMEN_SERVER } from '../../config/const.js';

const ExileView = () => {
  const {id} = useParams();
  const [exileData, setExileData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch(DOMEN_SERVER + `/exiles/view/${id}`);
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
      <div className="info-form">
        <div className="info-block">
          <h4>Основная информация о ссыльном</h4>
          <div>
            <p>Ф.И.О.: </p>
            <p>{exileData.exl_full_name}</p>
          </div>
          <div>
            <p>Пол: </p>
            <p>{exileData.exl_gender}</p>
          </div>
          <div>
            <p> Должность: </p>
            <p>{exileData.exl_rank}</p>
          </div>
          <div>
            <p> Губерния: </p>
            <p>{exileData.exl_province}</p>
          </div>
        </div>
        <div className="info-block">
		  <h4>Информация о распоряжении</h4>
		  <div>
            <p>Номер распоряжения: </p>
            <p>{exileData.exl_order_num}</p>
          </div>
          <div>
            <p> Дата распоряжения: </p>
            <p>{exileData.exl_order_date}</p>
          </div>
          <div>
            <p>По какому распоряжению: </p>
            <p>{exileData.exl_order_info}</p>
          </div>
          <div>
            <p>Распорядитель: </p>
            <p>{exileData.exl_steward}</p>
          </div>
          <div>
            <p>Причина: </p>
            <p>{exileData.exl_order_reason}</p>
          </div>
          <div>
            <p> С какого времени под надзором: </p>
            <p>{exileData.exl_supervision_start_date}</p>
          </div>
          <div>
            <p> Место, где учреждён надзор:</p>
            <p>{exileData.exl_supervision_place}</p>
          </div>
          <div>
            <p> Откуда сослан: </p>
            <p>{exileData.exl_departure_place}</p>
          </div>
        </div>
          { exileData.exl_income_flag == 0 ?
            <></> :
            <div className="info-block">
              <h4>Информация о получении содержания</h4>
                {incomesData.map(inc => (
                  <div className="list-item" key={inc.inc_id}>
                    {Number(inc.inc_amount) > 0 ?
                      <div>
                        <p> Количество денежных средств: </p>
                        <p>{Number(inc.inc_amount)} {inc.inc_currency}</p>
                      </div>
                      :
                      <></>
                    }
                    {inc.inc_period === null || inc.inc_period === undefined ?
                      <></>
                      :
                      <div>
                        <p>Периодичность начисления: </p>
                        <p>{inc.inc_period}</p>
                      </div>
                    }
                    <div>
                      <p>Причина начисления: </p>
                      <p>{inc.inc_reason}</p>
                    </div>
                    {inc.inc_source === null || inc.inc_source === undefined ?
                      <></>
                      :
                      <div>
                        <p>Источник денежных средств: </p>
                        <p>{inc.inc_source}</p>
                      </div>
                    }
                </div>
                ))}
            </div>
          }
        <div className="info-block">
          <h4>Дополнительная информация о ссыльном</h4>
          <div>
            <p>Семейное положение: </p>
            <p>{exileData.exl_mar_status}</p>
          </div>
          <div>
            <p>Информация о семье: </p>
            <p>{exileData.exl_family_info}</p>
          </div>
          <div>
            <p>Текущее состояние ссыльного: </p>
            <p>{exileData.exl_cur_state}</p>
          </div>
          <div>
            <p>Дополнительная информация о ссыльном: </p>
            <p>{exileData.exl_add_info}</p>
          </div>
        </div>
        <div className="info-block">
          <div>
            <p>Создатель: </p>
            <p>{exileData.exl_creator_id}</p>
          </div>
          <div>
            <p>Дата: </p>
            <p>{exileData.exl_creating_date}</p>
          </div>
          <div>
            <p>Удаление: </p>
            <p>{exileData.exl_is_removed}</p>
          </div>
          <div>
            <p>Тип доступа: </p>
            <p>{exileData.exl_visible_mode}</p>
          </div>
        </div>
      </div>
      <Link to="/exiles/edit"><button className="manage-button">Изменить запись</button></Link>
    </>
  );
}

export default ExileView;