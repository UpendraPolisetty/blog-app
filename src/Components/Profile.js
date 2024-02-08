import React, { useEffect, useState } from 'react';
import '../Styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Posts from './Posts';
import { Pagination } from './Pagination';
import { ArticlesUrl } from './utils/Constant';

const Profile = ({user}) => {
  let [state , setState] = useState({
    activeTab : 'author',
    articles : [],
  })
  console.log(user);
  let handleActiveTab = (tab) => {
    setState({ activeTab : tab})
  }
  useEffect(() => {
    fetchData();
  }, [state.activeTab]); 

  let fetchData = () => {

    fetch(ArticlesUrl + `?${state.activeTab}=${user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not fetch data for specific user!');
        }
        return res.json(); // Parse response JSON
      })
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          articles: data.articles,
        }));
      })
      .catch((err) => {
        setState((prevState) => ({
          ...prevState,
          articles: null,
          error: "Not able to fetch articles",
        }));
      });
  };

  return (
    <div className='profile-container'>
      <div className='user-info'>
        <div>
          <img src={user.image || '/images/smiley.jpg'} className='profile-img' alt="user image" />
          <h4 className='name'>{user.username}</h4>
          <p className='bio'></p>
          <a href="/settings" className='edit-btn'>Edit Profile Settings</a>
        </div>
      </div>
      <div className='article-info'>
        <div className='wrapper'>
        <div>
          <ul className='head_info'>
            <li className={state.activeTab === 'author' && 'active'} >
              <a href="#" onClick={() => handleActiveTab('author')}>My Articles</a>
            </li>
            <li className={state.activeTab === 'favorited' && 'active'} >
              <a href="#" onClick={() => handleActiveTab('favorited')}>Favourited Articles</a>
            </li>
          </ul>
        </div>
        <hr/>
        {/* <div className='article-preview'>
          <p>No articles are here... yet</p>
        </div> */}
        <Posts articles={state.articles}/>
        <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Profile