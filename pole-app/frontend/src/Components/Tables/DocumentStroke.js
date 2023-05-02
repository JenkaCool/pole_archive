import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../../css/Table.css';

const DocumentStroke = ({doc}) => {
  const route = useNavigate();

  const hClick = (link) => {
    route(link);
  };
  return (
    <tr key={doc.doc_id} onClick={() => route(`/documents/view/${doc.doc_id}`)}>
      <td>{doc.doc_id}</td>
      <td>{doc.doc_fund}</td>
      <td>{doc.doc_inventory}</td>
      <td>{doc.doc_storage_unit}</td>
      <td>{doc.doc_total_lists_num}</td>
      <td>{doc.doc_year}</td>
      <td>{doc.doc_additional_info}</td>
      <td>{doc.doc_url}</td>
      <td>{doc.doc_creator_id}</td>
      <td>{doc.doc_creating_date}</td>
      <td>{doc.doc_is_removed}</td>
      <td>{doc.doc_visible_mode}</td>
    </tr>
  );
}

export default DocumentStroke;