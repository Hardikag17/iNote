//jshint esversion:6
import React from 'react';
import axios from 'axios';
import secrets from '../components/secrets';
import "../styles/login.css";
import { API_ROOT } from '../components/api-config';

export const UserContext = React.createContext();
class login extends React.Component{

  constructor(props){
    super(props);

    this.state ={
      username : '',
      password : '',
      status : 0,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
   
  }

  handleUsernameChange(event){
    this.setState({
      username : event.target.value
    });
  }

  handlePasswordChange(event){
    this.setState({
      password : event.target.value
    });
  }

  submitHandle(event){
    console.log("button clicked");
    event.preventDefault();

    
      var username = this.state.username ;
      var password = this.state.password;
    
    axios
      .post(`${API_ROOT}/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then((res)=>{
        console.log(res);
        if(res.status=== 200){
          this.setState({
            status:1
          });
          window.location.replace("http://localhost:3000/secrets");
        }
        else{
          
          this.setState({
            status:0
          });
        }
       
      })
      .catch((err)=>{
        console.log(err);
      });        
  }


  render() {
     
    return (
      <div className="bg-login">
        <div className='w-25 p-3 row mb-3 position-absolute top-50 start-50 translate-middle'>
          <center>
            <h3>Login</h3>
          </center>
          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={this.submitHandle} action='/login' method='POST'>
            <label htmlFor ='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              id='username'
              className='form-control'
              name='username'
              value={this.state.username}
              onChange={this.handleUsernameChange}
              placeholder='Enter email'></input>
            <br></br>
            <label for='password' class='form-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='form-control'
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder='Enter Password' required ="required"></input>
            <br></br>
            <center>
              <button type='submit' className='btn btn-primary' onClick ={this.submitHandle}>
                Submit
              </button><br></br>{this.state.status?"Logged in":"Not logged in"}
            <br></br>  
            <br></br>  

            <button type='submit' class='btn btn-primary'>
              <i class="fab fa-google"></i>signup with google
            </button>
      
           
            </center>
          </form>
        </div>
      </div>
    );
  }

}


export default login;
