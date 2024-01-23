import React, { useEffect,useState } from 'react';
import "../Styles/App.css";
import {Header} from "./Header";
import {Home} from "./Home";
import {Signup} from "./Signup";
import {Login} from './Login';
import {NoMatch} from "./NoMatch";
import {SinglePost} from "./SinglePost";
import {Routes ,BrowserRouter as Router, Route } from "react-router-dom";
import { localStorageKey, userVerifyUrl } from './utils/Constant';
import FullPageLoader from './FullPageLoader';
import NewArticle from './NewArticle';
import Settings from './Settings';
import Profile from './Profile';





export const App = () => {
  let [state , setState] = useState({
    isLoggedIn : false,
    user : null,
    isVerfying : true,
  })
  let updateUser = (user) => {
    setState({
      isLoggedIn : true,
      user : user,
      isVerfying : false,
    })
    localStorage.setItem(localStorageKey ,user.token)
  }

  useEffect(() => {
    let key = localStorage[localStorageKey]
    if(key){
      fetch(userVerifyUrl,{
        method: "GET",
        headers: {
          "Authorization": `Token ${key}`,
        }
      }).then(res =>{
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors)
          });
          // throw new Error("Login is not successful");
        }
        return res.json();
      }).then(({user})=> updateUser(user)).catch((err) => { console.log(err);})
    } else {
      setState({ isVerfying : false });
    }
  } , [])
  console.log(state.isLoggedIn , state.user);
  if(state.isVerfying) {
    return <FullPageLoader />
  }
  return (
    <div>
      <Router>
      <Header isLoggedIn = {state.isLoggedIn} user = {state.user} />
        {
          state.isLoggedIn ? <AuthenticatedUser /> : < NonAuthenticatedUser updateUser = {updateUser} /> 
        }
      </Router>
    </div>
  )
}

function AuthenticatedUser () {
  return <Routes>
  <Route path='/' exact Component={Home}/>
  <Route path='/newArticle' exact Component={NewArticle}/>
  <Route path='/settings' exact Component={Settings}/>
  <Route path='/profile' exact Component={Profile}/>
  <Route path='/article/:slug'  Component={SinglePost}/>
  <Route path='/*' exact Component={NoMatch}/>
</Routes>
}

function NonAuthenticatedUser ({updateUser}) {
  return <Routes>
  <Route path='/' exact Component={Home}/>
  <Route path='/signup' exact element={<Signup updateUser={updateUser}/>}/>
  <Route path='/login' exact element={<Login updateUser={updateUser}/>}/>
  <Route path='/article/:slug'  Component={SinglePost}/>
  <Route path='/*' exact Component={NoMatch}/>
</Routes>
}