//jshint esverion:6
import React from "react";
import { Route } from "react-router";
import secrets from "./secrets";
import { API_ROOT } from '../components/api-config';
import axios from "axios";
axios.defaults.withCredentials=true;

class Protected extends React.Component{

    constructor(props){
        super(props);
        this.state={
            status:0                  //   0---LoggegIn           1---Logged off
        };

        axios
        .get(`${API_ROOT}/secrets`)
        .then(res=>{
            console.log(res);
            if(res.status=== 200){
                this.setState({
                  status:1
                });
              }
              else{
                
                this.setState({
                  status:1
                });
              }
            
        })
        .catch((err)=>{
            console.log("token is not found");
        });


    }

  
    render(){

        if(this.state.status===1){
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