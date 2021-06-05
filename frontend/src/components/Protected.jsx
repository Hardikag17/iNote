//jshint esverion:6
import React from "react";
import { Route } from "react-router";
import secrets from "./secrets";
import { API_ROOT } from '../components/api-config';
import axios from "axios";

class Protected extends React.Component{

    constructor(props){
        super(props);
        this.state={
            status:1                  //   0---LoggegIn           1---Logged off
        };

        axios
        .get(`${API_ROOT}/secrets`)
        .then(res=>{
            console.log(res.data);
            console.log("logging u out");
            
        })
        .catch((err)=>{
            console.log(err);
        });

    
    }



  
    render(){

        if(this.state.status===0){
            return(<Route exact path='/secrets' component ={secrets}/>);
            
        }
        else{
            return(<div>
                <h1>Sorry it's a Protected Route</h1>
            </div>);
        }
    }
        
}

export default Protected;