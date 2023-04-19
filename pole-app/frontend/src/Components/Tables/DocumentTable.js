import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, {Component} from 'react';

export default class DocumentTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items:[],
            currentItem: {text:"первое дело", inner_key:"firstItem"}
        }
    }
    componentDidMount() {
        fetch("http://localhost:5003/documents")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
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
              <tbody><tr></tr></tbody>
            </table>
          </div>
        </>
      );
    }
}
