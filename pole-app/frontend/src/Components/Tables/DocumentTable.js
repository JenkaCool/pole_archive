import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, {Component} from 'react';
import DocumentStroke from '../Document/DocumentStroke';

export default class DocumentTable extends Component {
    constructor(props){
        super(props)
        this.state = { docs: [] };
    }
    componentDidMount() {
       fetch("http://localhost:5003/documents")
       .then(response => {
          response.json();
       })
       .then(posts => {
          this.setState({ posts });
       })
       .then(err => {
          console.log(err);
       });
    }

    render() {
      return (
        <>
          <h3>Список документов</h3>
          <div id='tools'>
            <Link to="/document-add"><button className="manage-button">Добавить новый документ</button></Link>
            <Link to="/document"><button className="manage-button">Посмотреть запись</button></Link>
          </div>
          <div className="big-table">
            <table>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                {this.state.docs.map(doc => (
                  <DocumentStroke doc={doc}/>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
}
