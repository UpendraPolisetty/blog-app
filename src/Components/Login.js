import React, { useState } from 'react';
import "../Styles/Login.css"
import { Link } from 'react-router-dom';
import { Validate } from './utils/Validate';

export const Login = () => {
  let [state , setState] = useState({
    email : '',
    password : '',
    errors : {
      email : '',
      password  : '',
    }
  });
  console.log(state);
  let handleChange = (e) => {
    let {name ,value } = e.target;
    let errors = {...state.errors}
    Validate(errors , name, value);
    setState({[name]:value,errors})
  }

  let handleSubmit = (e) => {
    e.preventDefault();
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
