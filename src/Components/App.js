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
    
  }

  useEffect(() => {
    let key = localStorage[localStorageKey];
  
    const fetchUser = async () => {
      try {
        if (key) {
          const res = await fetch(userVerifyUrl, {
            method: "GET",
            headers: {
              "Authorization": `${key}`,
            },
          });
  
          if (!res.ok) {
            const { errors } = await res.json();
            throw new Error(errors);
          }
  
          const { user } = await res.json();
          console.log(user);
          updateUser(user);
        } else {
          setState({ isLoggedIn: false, user: null, isVerifying: false });
        }
      } catch (error) {
        console.log(error);
        setState({ isLoggedIn: false, user: null, isVerifying: false });
      }
    };
  
    fetchUser();
  }, []);
  console.log(state.isLoggedIn , state.user);
  if(state.isVerfying) {
    return <FullPageLoader />
  }
  return (
    <div>
      <Router>
      <Header isLoggedIn = {state.isLoggedIn} user = {state.user} />
        {
          state.isLoggedIn ? <AuthenticatedUser  user = {state.user} /> : < NonAuthenticatedUser updateUser = {updateUser} user = {state.user} /> 
        }
      </Router>
    </div>
  )
}

function AuthenticatedUser ({user}) {
  return <Routes>
  <Route path='/' exact Component={Home}/>
  <Route path='/newArticle' exact  element={<NewArticle user={user} />}/>
  <Route path='/settings' exact  element={<Settings user={user} />}/>
  <Route path='/profile' exact  element={<Profile user={user} />}/>
  <Route path='/article/:slug'  element={<SinglePost user={user} />}/>
  <Route path='/*' exact Component={NoMatch}/>
</Routes>
}

function NonAuthenticatedUser ({updateUser,user}) {
  return <Routes>
  <Route path='/' exact Component={Home}/> dfh
  <Route path='/signup' exact element={<Signup updateUser={updateUser}/>}/>
  <Route path='/login' exact element={<Login updateUser={updateUser}/>}/>
  <Route path='/article/:slug'  element={<SinglePost user={user} />}/>
  <Route path='/*' exact Component={NoMatch}/>
</Routes>
}