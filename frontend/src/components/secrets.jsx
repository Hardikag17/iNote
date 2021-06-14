//jshint esversion:6
import React, { useState } from 'react';
import axios from 'axios';
import uuid from "react-uuid";
import { API_ROOT } from '../components/api-config';
import '../styles/secrets.css';
import Notes from "../components/notes.jsx";

class secrets extends React.Component {
  
  constructor(props) {
    super(props);
    this.submitHandle = this.submitHandle.bind(this);
  }


  submitHandle(event) {
    axios
      .get(`${API_ROOT}/logout`)
      .then((res) => {
        console.log(res);
        window.location.replace('http://localhost:3000/');
        console.log('logging u out');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get(`${API_ROOT}/secrets`)
      .then((res) => {
        console.log(JSON.stringify(res.user));
        console.log('Logged In');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  render() {
    
    return (
      <div className="bg">
        <div className=" notepad-nav ">
          <h1 className="c">#DTech</h1>
          <button
            type='submit'
            className='a c btn btn-primary '
            onClick={this.submitHandle}>
            Logout
          </button>
        </div>
        <Notes/>
      </div>
    );
  }
}

export default secrets;
