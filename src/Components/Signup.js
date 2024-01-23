import React, { useState } from "react";
import "../Styles/Signup.css";
import { SignUpUrl } from "../Components/utils/Constant.js";
import { Validate } from "./utils/Validate";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

export const Signup = ({updateUser}) => {
  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    errors: {
      username: "",
      email: "",
      password: "",
    },
  });

  let [loading, setLoading] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    let errors = { ...data.errors };
    Validate(errors, name, value);
    setData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...errors },
    }));
  };

  let Navigate = useNavigate()
  let handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let { username, email, password } = data;
    console.log(username, email, password);

    fetch(SignUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { username, email, password },
      }),
    })
      .then((res) => {
        if (!res.ok) {
           return  res.json().then(({ errors }) =>{
            return Promise.reject(errors);
           });
          
          // throw new Error("Fetch is not successful");
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user);
        setLoading(false);
        updateUser(user)
        setData({
          username: "",
          email: "",
          password: "",
          errors: { username: "", email: "", password: "" },
        });
        Navigate('/')
      })
      .catch((errors) => {
        setLoading(false);
        setData({ ...data, errors })
      });
  };

  let { username, email, password, errors } = data;

  return (
    <div>
      <div className="signup_div">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <Link to="/login">Have an account?</Link>
          <input
            className="input"
            name="username"
            value={username}
            onChange={handleChange}
            type="text"
            placeholder="Your name"
          />
          <p className="error">{errors.username}</p>
          <input
            className="input"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Email address"
          />
          <p className="error">{data.errors.email}</p>
          <input
            className="input"
            name="password"
            value={password}
            onChange={handleChange}
            type="text"
            placeholder="password"
          />
          <p className="error">{errors.password}</p>
          <input
            className="form_btn"
            type="submit"
            disabled={errors.username || errors.email || errors.password}
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};
