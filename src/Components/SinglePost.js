import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArticlesUrl } from './utils/Constant';
import Loader from './Loader';
import "../Styles/SinglePost.css";


export const SinglePost = () => {

  let [state , setState] = useState({
    article : null,
    error : ''
  });

  let slug = useParams().slug
  useEffect(() => {
    fetch(ArticlesUrl +'/'+slug).then(res => {
      if(!res.ok){
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(data =>{
      setState({ article : data.article , error : '' });
    }).catch(err => {
      setState({ error : 'Not able to fetch article!' });
    } )
  },[])

  const { article, error } = state;
  if(error) {
    return <p>{error}</p>
  }
  if(!article){
    return <Loader />
  }
  return (
    <article className='artical-page'>
      <header className='banner'>
        <div className='container'>
          <h1 className='article-title'>{article.title}</h1>
          <div className='article-meta'>
            <Link to='/profile'>
              <img src="/images/smiley.jpg" alt="Smiley" />
            </Link>
            <div className='info'>
               <Link to="/profile">
                <p>{article.author.username}</p>
                <time>{article.createdAt}</time>
               </Link>
            </div>
          </div>
        </div>
      </header>
      <div className='container page'>
        <div className='row article-content'>{article.body}</div>
      </div>
      <hr/>
      <footer>
        <div className='sign'>
          <p className=''>
            <Link className='links' to="/login">Sign in</Link>
            &nbsp; or &nbsp;
            <Link className='links' to="/signup">Sign Up </Link> to add comments on this article
          </p>
        </div>
      </footer>
    </article>
  )
}
