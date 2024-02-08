import React, { useState } from "react";
import '../Styles/NewArticle.css';
import { ArticlesUrl } from "./utils/Constant";
import { useNavigate } from "react-router-dom";

const NewArticle = ({user}) => {
  let [articleData , setArticleData] = useState({
    title : '',
    description : '',
    body : '',
    tagList : '',
    errors : {
      title : '',
      description : '',
      body : '',
      tagList : ''
    }
  })

  const handleChange = (e) => {
    const {name , value} = e.target;
    setArticleData(prevState => ({
      ...prevState,[name] : value
    }))
  }
  let Navigate = useNavigate();
  const handleSubmit = (e) => {
    const token = localStorage.getItem('TokenKey');
    e.preventDefault();
    const {title,description, body, tagList, errors} = articleData;
    fetch(ArticlesUrl,{
      method : 'POST',
      headers : { 'Content-Type' : 'application/json', authorization : `${token}`},
      body: JSON.stringify({
        article : {title, description, body, tagList : tagList.split(',').map(tag => tag.trim())}
      })
    }).then(res => {
      if(!res.ok){
        throw new Error('Can not create new article')
      }
      return res.json();
    }).then(({article})=> {
      console.log(article);
      setArticleData({
        title : '',
        description : '',
        body :'',
        tagList :''
      })
      Navigate('/')
    }).catch(err => setArticleData({errors}))
    console.log('Form Submitted : ' , articleData);
  }
  const {title , description, body, tagList} = articleData;
  return (
    <div className="edit-article">
            <form>
              <fieldset className="wrapper">
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" name="title" placeholder="Article Title" value={title} onChange={handleChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="what is this article about ?"
                    value={description}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    cols="30"
                    rows="8"
                    name="body"
                    className="form-control"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="tagList"
                    className="form-control"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={handleChange}
                  />
                  <div></div>
                </fieldset>
                <button className="btn" onClick={handleSubmit}>Publish Article</button>
              </fieldset>
            </form>
          </div>
  );
};

export default NewArticle;
