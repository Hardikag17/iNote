//jshint esversion:6
import React from "react";
import axios from 'axios';
import { API_ROOT } from '../components/api-config';

class secrets extends React.Component{

    constructor(props){
        super(props);

        this.submitHandle = this.submitHandle.bind(this);
    }
    
    submitHandle(event){
        
        axios
        .get(`${API_ROOT}/logout`)
        .then(res=>{
            console.log(res);
            window.location.replace("http://localhost:3000/");
            console.log("logging u out");
            
        })
        .catch((err)=>{
            console.log(err);
        });


    }

    componentDidMount(){
        
        axios
        .get(`${API_ROOT}/secrets`)
        .then(res=>{
            console.log(res.status);
            console.log("Logged In");
            
        })
        .catch((err)=>{
            console.log(err);
        });

    }
        
    
    render(){
        return(
            <div>
                <center>
                <h1>This is a secured page.</h1>
                <br></br>
                <h4>Secret :#CryptoIsFuture</h4>
                <button type='submit' className='btn btn-primary' onClick ={this.submitHandle}>Logout</button>
                </center>
            </div>
        )
    }
}

export default secrets;