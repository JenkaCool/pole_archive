import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import DocumentStroke from './DocumentStroke';
import AccessDenied from '../AccessDenied';

import { SITE_DOMAIN } from '../../paths.js';

const DocumentTable = () => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);
  const [scrollL, setScrollL] = useState(false);
  const [scrollR, setScrollR] = useState(true);
  const [documentData, setDocumentData] = useState([]);
  const makeAPICall = async () => {
    try {
      const response = await fetch(SITE_DOMAIN + "/api/documents/");
      const data = await response.json();
      setDocumentData(data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (cookies.username && cookies.username!="" && cookies.username!=undefined){
      makeAPICall();
    }
  }, [])

  if (!cookies.username || cookies.username=="" || cookies.username==undefined)
    return (
      <AccessDenied />
    );

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

  return (
    <>
      <h3>Список документов</h3>
      <div id='tools'>
        <Link to="/documents/add"><button className="manage-button">Добавить новый документ</button></Link>
      </div>

      <div className={"big-table table" + (scrollL ? " scroll-left"  : '' ) + (scrollR ? " scroll-right"  : '' )}>
        <table>
          <thead>
            <th>№</th>
            <th>Фонд</th>
            <th>Опись</th>
            <th>Единица хранения</th>
            <th>Общее количество листов</th>
            <th>Год документа</th>
            <th>Дополнительная информация</th>
            <th>Ссылка на электронный ресурс</th>
            <th>ID создателя</th>
            <th>Дата создания</th>
            <th>Флаг удаления</th>
            <th>Режим доступа</th>
          </thead>
          <tbody>
            {documentData.map(doc => ( <DocumentStroke row={doc} key={doc.doc_id} />))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DocumentTable;