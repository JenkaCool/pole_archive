import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../../css/Table.css';

const DocumentStroke = ({row}) => {
  const route = useNavigate();

  const hClick = (link) => {
    route(link);
  };
  return (
    <tr key={row.doc_id} onClick={() => route(`/documents/view/${row.doc_id}`)}>
      <td>{row.doc_id}</td>
      <td>{row.doc_fund}</td>
      <td>{row.doc_inventory}</td>
      <td>{row.doc_storage_unit}</td>
      <td>{row.doc_total_lists_num}</td>
      <td>{row.doc_year}</td>
      <td>{row.doc_additional_info}</td>
      <td>{row.doc_url}</td>
      <td>{row.doc_creator_id}</td>
      <td>{row.doc_creating_date}</td>
      <td>{row.doc_is_removed}</td>
      <td>{row.doc_visible_mode}</td>
    </tr>
  );
}

export default DocumentStroke;