//jshint esversion:6
import React from "react";
import './App.css';
import Home from "../src/components/home";
import SignUp from "../src/components/signup";
import LogIn from "../src/components/login";
import secrets from "../src/components/secrets";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App(){
  return(
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={LogIn} />
            <Route path='/secrets' component ={secrets}/>
          </Switch>
        </Router>
  );
}
  /*constructor(props){
    super(props);
    this.state ={apiResponse:""};
  }

  callAPI(){
    fetch("http://localhost:9000/users")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse: res}));
  }

  componentWillMount(){
    this.callAPI();
  }
*/
  

export default App;
