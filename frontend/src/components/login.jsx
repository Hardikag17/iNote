//jshint esversion:6
import React from 'react';
import axios from 'axios';
import { API_ROOT } from '../components/api-config';
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

  /*message(){
    if(this.state.status){
      document.getElementById("code").innerHTML = "Not logged in";
    }
    else{
      document.getElementById("code").innerHTML = "Logged in";
    }
  }
  */
  submitHandle(event){
    console.log("button clicked");
    event.preventDefault();

    
      var username = this.state.username ;
     
    
    axios
      .get(`${API_ROOT}/users/${username}`)
      .then((res)=>{
        console.log(res.data);
        if(res.data.username && res.data.password){
          this.setState({
            status:1 
          });
          console.log(this.state.status);
        }
        else{ 
          this.setState({
            status:0
          });
          console.log(this.state.status);
        }
      })
      .catch((err)=>{
        console.log(err);
      });        
  }


  render() {
    
    
    return (
      <div>
        <div className='w-25 p-3 row mb-3 position-absolute top-50 start-50 translate-middle'>
          <center>
            <h3>This is Login Page.</h3>
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
              placeholder='Enter Password'></input>
            <br></br>
            <center>
              <button type='submit' className='btn btn-primary' onClick ={this.submitHandle}>
                Submit
              </button>{this.state.status?"Logged in":"Not logged in"}
           
            </center>
          </form>
        </div>
      </div>
    );
  }

}


export default login;
