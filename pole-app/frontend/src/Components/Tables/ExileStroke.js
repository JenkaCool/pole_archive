import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../../css/Table.css';

const ExileStroke = ({row}) => {
  const route = useNavigate();

  const [exileData, setExileData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);
  const id = null

  useEffect(() => {
    setExileData(row.exile);
    setIncomesData(row.incomes);
  }, [row])

  return (
    <tr onClick={() => route(`/archive/view/${exileData.exl_id}`)}>
      <td>{exileData.exl_id}</td>
      <td>{exileData.exl_full_name}</td>
      <td>{exileData.exl_gender}</td>
      <td>{exileData.exl_rank}</td>
      <td>{exileData.exl_province}</td>
      <td>{exileData.exl_order_num}</td>
      <td>{exileData.exl_order_date}</td>
      <td>{exileData.exl_order_info}</td>
      <td>{exileData.exl_steward}</td>
      <td>{exileData.exl_order_reason}</td>
      <td>{exileData.exl_supervision_start_date}</td>
      <td>{exileData.exl_supervision_place}</td>
      <td>{exileData.exl_departure_place}</td>
      <td>{exileData.exl_income_flag == 0 ? <p>-</p>:
        <ul>

        {incomesData.map(inc => (
            <li key={inc.inc_id}>
              {Number(inc.inc_amount) > 0 ?  <p>{Number(inc.inc_amount)} {inc.inc_currency}</p> : <></>}
              <p>{inc.inc_period}</p>
              <p>{inc.inc_reason}</p>
              <p>{inc.inc_source}</p>
            </li>
          ))}
        </ul>}
      </td>
      <td>{exileData.exl_mar_status}</td>
      <td>{exileData.exl_family_info}</td>
      <td>{exileData.exl_cur_state}</td>
      <td>{exileData.exl_add_info}</td>
    </tr>
  );
}

export default ExileStroke;