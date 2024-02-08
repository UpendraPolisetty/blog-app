import React from 'react';
import "../Styles/Header.css"
import { Link, useNavigate} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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
            { isLoggedIn ? <AuthHeader user = {user} /> : <NonAuthHeader />}
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
const AuthHeader = ({user}) => {
  let Navigate = useNavigate();
  let userLogout = () => {
    localStorage.removeItem('TokenKey');
    window.location.reload();
    Navigate('/')
    
  }
  return (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/newArticle">New Article</Link>
    </li>
    <li>
      <Link to="/settings">Settings</Link>
    </li>
    <li>
      <Link to="/profile">Profile</Link>
    </li>
    <li>
      <button onClick={ userLogout}>Logout</button>
    </li>
  </ul>
  )
};