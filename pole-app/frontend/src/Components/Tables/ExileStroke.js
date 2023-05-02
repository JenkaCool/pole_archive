import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ExileStroke = ({row}) => {
  const [documentData, setDocumentData] = useState([]);
  useEffect(() => {
    setDocumentData(row);
  }, [])


  return (
    <>
      { row && row.map((item) =>
        <tr>
          {item}
        </tr>
      )}
    </>
  );
}

export default ExileStroke;