import React, { useEffect,useState } from 'react';
import "../Styles/App.css";
import {Header} from "./Header";
import {Home} from "./Home";
import {Signup} from "./Signup";
import {Login} from "./Login";
import {NoMatch} from "./NoMatch";
import {SinglePost} from "./SinglePost";
import {Routes ,BrowserRouter as Router, Route } from "react-router-dom";




export const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/signup' exact Component={Signup}/>
          <Route path='/login' exact Component={Login}/>
          <Route path='/article/:slug'  Component={SinglePost}/>
          <Route path='/*' exact Component={NoMatch}/>
        </Routes>
      </Router>
    </div>
  )
}

