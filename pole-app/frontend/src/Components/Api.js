export default class APIService{
    // Insert an article
    static InsertDocument(body){
        return fetch(`http://localhost:8888/api/documents/add/`,{
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