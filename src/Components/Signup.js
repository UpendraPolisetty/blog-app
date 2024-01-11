import React, { useState } from 'react';
import "../Styles/Signup.css";
import { BaseUrl } from './utils/Constant';
import { Validate } from './utils/Validate';
import { Link } from 'react-router-dom';

export const Signup = () => {
  let [data , setData] = useState({
    username : "",
    email : "",
    password : "",
    errors : {
      username : "",
      email : "",
      password : "",

    }
  })

  let handleChange = (e) => {
    let {name ,value } = e.target;
    let errors = {...data.errors}
    Validate(errors , name, value);
    setData({[name]:value,errors})
    console.log(setData);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    let {username,email,password} = data;
    console.log(username,email,password);
    let url = BaseUrl + "users";
  }
  let {username,email,password , errors} = data;
  return (
    <div >
      <div className='signup_div'>
      <form className='form' onSubmit={handleSubmit}>
       <h1>Sign Up</h1>
       <Link to="/login">
          Have an account?
       </Link>
        <input className='input' name='username' value={username} onChange={handleChange} type="text" placeholder='Your name'/>
        <p className='error'>{errors.username}</p>
        <input className='input' name='email' value={email} onChange={handleChange} type="email" placeholder='Email adress'/>
        <p className='error'>{data.errors.email}</p>
        <input className='input' name='password' value={password} onChange={handleChange} type="text" placeholder='password' />
        <p className='error'>{errors.password}</p>
        <input className='form_btn' type='submit' disabled={errors.username|| errors.email || errors.password} value='Submit' />
      </form>
      </div>
    </div>
  )
}
