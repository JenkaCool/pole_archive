import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import '../../css/Table.css';

const DocumentStroke = ({row}) => {
  const route = useNavigate();

  const [documentData, setDocumentData] = useState([]);

  useEffect(() => {
    setDocumentData(row);
  }, [row])

  return (
    <tr onClick={() => route(`/documents/view/${documentData.doc_id}`)}>
      <td>{documentData.doc_id}</td>
      <td>{documentData.doc_year}</td>
      <td>{documentData.doc_fund}</td>
      <td>{documentData.doc_inventory}</td>
      <td>{documentData.doc_storage_unit}</td>
      <td>{documentData.doc_total_lists_num}</td>
      <td>{documentData.doc_additional_info}</td>
      <td>{documentData.doc_url}</td>
      <td>{documentData.doc_creator_id}</td>
      <td>{dayjs(documentData.doc_creating_date).format("DD/MM/YYYY")}</td>
    </tr>
  );
}

export default DocumentStroke;