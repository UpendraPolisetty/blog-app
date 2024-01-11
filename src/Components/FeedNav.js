import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/FeedNav.css'

export const FeedNav = ({activeTab , removeTab}) => {

  return (
    <nav className='feed-nav mt-5'>
      <ul className='flex'>
        <li className='feed-nav-item'onClick={removeTab} >
          <Link to="/" className={`${activeTab === '' && 'active'} text-slate-950 text-xl pr-5`} >Global Feed</Link>
        </li>
        {activeTab && (<li activeClassName='feed-nav-item'>
          <Link to='/' className= {`${activeTab && 'active'} text-xl pr-5`}>#{activeTab}</Link>
        </li>)}
      </ul>
    </nav>
  )
}
