import { DOMEN_SITE, DOMEN_SERVER } from '../../config/const.js';

const makeAPICall = async (path, data) => {
  try {
    const response = await fetch(DOMEN_SERVER + path);
    const data = await response.json();
    setData(data)
  }
  catch (e) {
    console.log(e)
  }
}



// 👇️ named exports
export {SmallButton, BigButton};



export default class APIService{
    // Insert an article
    static InsertDocument(body){
        return fetch(`http://localhost/exiles/api/documents/add/`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }
}