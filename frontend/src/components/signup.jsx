//jshint esversion:6
import React from 'react';
import axios from 'axios';
import { API_ROOT } from '../components/api-config';

class SignUp extends React.Component{

  constructor(props){
    super(props);

    this.state ={
      username : '',
      password : '',
      status : null,
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
    var username= this.state.username;
    var password= this.state.password;
    axios
      .post(`${API_ROOT}/signup`, {
        username: this.state.username,
        password: this.state.password
      })
      .then((res)=>{
        console.log(res.data);
        this.setState({
          status:0
          
        });

        window.location.replace("http://localhost:3000/secrets");
      })        
      .catch((error)=>{
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className='w-25 p-3 row mb-3 position-absolute top-50 start-50 translate-middle'>
          <center>
            <h3>This is SignUp Page.</h3>
          </center>
          <br></br>
          <br></br>
          <br></br>
          <form onSubmit={this.submitHandle} action='/signup' method='POST'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              id='username'
              className='form-control validate'
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
              className='form-control validate'
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              placeholder='Enter Password'></input>
            <br></br>
            <center>
              <button type='submit' className='btn btn-primary' onClick ={this.submitHandle}>
                Submit
              </button><br></br>{this.state.status?"Account Successfully made":"Please enter the details"}
           
            </center>
          </form>
        </div>
      </div>
    );
  }

}


export default SignUp;
