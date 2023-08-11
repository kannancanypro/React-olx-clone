import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  var loginModel = {};
  const signInFunc = async (e) => {
    try {
      e.preventDefault();
      loginModel = {
        "email": email,
        "password": password
      }
      const auth = getAuth()
      const { user } = await signInWithEmailAndPassword(auth, loginModel.email, loginModel.password)
      console.log(user.toJSON())
      if (user.uid) {
       navigateToHome()
      }
    }
    catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  var navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/home');
  }



  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={signInFunc}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
