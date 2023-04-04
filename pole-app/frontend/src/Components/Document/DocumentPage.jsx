import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DocumentPage = () => {
  return (
    <>
      <h3>Документ</h3>
      <Link to="/exile-add"><button className="manage-button">Добавить новую запись</button></Link>
    </>
  );
}

export default DocumentPage;