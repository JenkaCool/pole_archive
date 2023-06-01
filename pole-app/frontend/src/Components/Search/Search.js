import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import '../../css/Search.css';
import searchImg from '../../imgs/search.svg'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
/*
  const filteredData = rows.filter(row => {
    return row.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  const setData = (value) => {
    if (!rows || rows==="" || rows=== undefined || rows=== null){
      setSearchValue("")
    } else {
      setSearchValue(value)
    }
    if (!searchValue || searchValue==="" || searchValue=== undefined || searchValue=== null){
      onChange(rows)
    } else {
      onChange(searchValue)
    }
  }
*/
  return (
    <div className="search">
      <form className=" ib-cont">
        <input
          type="search"
          placeholder="Поиск..."
          className="search-input ib-m ib-el"
          onChange={(event) => console.log(event.target.value)}
          autofocus required />
        <button type="submit" className="search-button ib-m ib-el"><img src={searchImg} alt="Go" className="search-img"/></button>
      </form>
    </div>
)}

export default Search;