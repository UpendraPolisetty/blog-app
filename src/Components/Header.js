import React from 'react';
import "../Styles/Header.css"

export const Header = () => {
  return (
    <div>
      <section className='header_div'>
        <div className='header_left'>
          <a href="/">
            <img src="https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"style={{height:"40px"}} alt="logo" />
            <h1>BOX</h1>
          </a>
          
        </div>
        <div className='header_right'>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/signup">SignUp</a>
            </li>
            <li>
              <a href="login">Login</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
