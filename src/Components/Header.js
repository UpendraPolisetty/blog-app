import React from 'react';
import "../Styles/Header.css"
import { Link, NavLink } from 'react-router-dom';

export const Header = ({isLoggedIn,user}) => {
  return (
    <div>
      <section className='header_div'>
        <div className='header_left'>
          <Link to="/"  className='logo'>
            <img src="https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"style={{height:"40px"}} alt="logo" />
            <h1>BOX</h1>
          </Link>
        </div>
        <nav className='header_right'>
            { isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
          </nav>
      </section>
    </div>
  )
}

const NonAuthHeader = () => {
  return (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/signup">SignUp</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
  </ul>
  )
};
const AuthHeader = () => {
  return (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/signup">New Article</Link>
    </li>
    <li>
      <Link to="/">Settings</Link>
    </li>
    <li>
      <Link to="/">Profile</Link>
    </li>
  </ul>
  )
};