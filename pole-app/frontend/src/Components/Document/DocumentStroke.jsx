import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentStroke = ({doc}) => {
  return (
    <tr>
      <th>{doc.doc_fund}</th>
      <th>{doc.doc_inventory}</th>
      <th>{doc.doc_storage_unit}</th>
      <th>{doc.doc_total_list_num}</th>
      <th>{doc.doc_year}</th>
      <th>{doc.doc_additional_info}</th>
      <th>{doc.doc_url}</th>
      <th>{doc.doc_creator_id}</th>
      <th>{doc.doc_creating_date}</th>
    </tr>
  );
}

export default DocumentStroke;