import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../../css/Table.css';

const ExileStroke = ({row}) => {
  const route = useNavigate();

  const [exileData, setExileData] = useState([]);
  useEffect(() => {
    setExileData(row);
  }, [])

  return (
    <tr key={row.exl_id} onClick={() => route(`/exiles/view/${row.exl_id}`)}>
      <td>{row.exl_id}</td>
      <td>{row.exl_full_name}</td>
      <td>{row.exl_gender}</td>
      <td>{row.exl_rank}</td>
      <td>{row.exl_province}</td>
      <td>{row.exl_order_num}</td>
      <td>{row.exl_order_date}</td>
      <td>{row.exl_order_info}</td>
      <td>{row.exl_steward}</td>
      <td>{row.exl_order_reason}</td>
      <td>{row.exl_supervision_start_date}</td>
      <td>{row.exl_supervision_place}</td>
      <td>{row.exl_departure_place}</td>
      <td>{row.exl_income_flag}</td>
      <td>{row.exl_mar_status}</td>
      <td>{row.exl_family_info}</td>
      <td>{row.exl_cur_state}</td>
      <td>{row.exl_add_info}</td>
      <td>{row.exl_creator_id}</td>
      <td>{row.exl_creating_date}</td>
      <td>{row.exl_is_removed}</td>
      <td>{row.exl_visible_mode}</td>
    </tr>
  );
}

export default ExileStroke;