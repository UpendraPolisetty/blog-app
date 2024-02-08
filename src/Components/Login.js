import React, { useState } from 'react';
import "../Styles/Login.css"
import { Link } from 'react-router-dom';
import { Validate } from './utils/Validate';
import {LoginUrl} from '../Components/utils/Constant.js';
import {useNavigate} from 'react-router-dom';

export const Login = ({updateUser}) => {

  let [state , setState] = useState({
    email : '',
    password : '',
    errors : {
      email : '',
      password  : '',
    }
  });
  let handleChange = (e) => {
    let {name ,value } = e.target;
    let errors = {...state.errors}
    Validate(errors , name, value);
    setState(prevState => ({...prevState, [name]:value,errors : {...errors}}))
  }
let Navigate = useNavigate();
  let handleSubmit = (e) => {
    e.preventDefault();
    let {email, password } = state;
    console.log(email, password);

    fetch(LoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors)
          });
          // throw new Error("Login is not successful");
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user);
        updateUser(user)
        localStorage.setItem('TokenKey', user.token);
        Navigate('/')
      })
      .catch((errors) => {
        setState({ ...state, errors : {...state.errors, email : 'Email or Password is incorrect'  }})
      });
  };
  const {email , password , errors} = state;
  return (
    <div>
      <div className='login_div'>
      <form className='form' action='' onSubmit={handleSubmit}>
       <h1>Login</h1>
       <Link to="/signup">
          Need an account?
       </Link>
        <input className='input' name='email' type="email" placeholder='Email adress' onChange={handleChange} value={email}/>
        <span className='error'>{errors.email}</span>
        <input className='input' name='password' type="text" placeholder='password' onChange={handleChange} value={password}/>
        <span className='error'>{errors.password}</span>
        <input className='form_btn' type='submit' disabled={errors.email || errors.password} value='Submit' />
      </form>
      </div>
    </div>
  )
}
