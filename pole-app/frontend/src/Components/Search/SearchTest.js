import React, { useState, useEffect } from 'react';
import useDebounce from './UseDebounce';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then(results => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

  // Pretty standard UI with search input and results
  return (
    <div>
      <input
        placeholder="Поиск записей"
        onChange={e => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {results.map(result => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img
            src={`${result.thumbnail.path}/portrait_incredible.${
              result.thumbnail.extension
            }`}
          />
        </div>
      ))}
    </div>
  );
}


function searchCharacters(search) {
  const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
  const queryString `apikey=${apiKey}&titleStartsWith=${search}`;
  return fetch(
    `https://localhost:8888/api/search`,
    {
      method: 'GET'
    }
  )
    .then(res => res.json())
    .then(res => res.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
}