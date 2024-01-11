
import { Link } from "react-router-dom";
import "../Styles/post.css";


export const Post = (props) => {
  const {author , updatedAt,title,description,favoritesCount,slug} = props;
  return (
   <article className="post">
    <header className="flex between post_header">
      <div className="flex between">
        <Link to="/profile">
          <img src={author.image || '/images/smiley.jpg'} alt={author.username} />
        </Link>
        <div className="post-details">
          <Link to="/profile" className="anchor post-author">
            <h2>
              {author.username}
            </h2>
          </Link>
          <time>{updatedAt}</time>
        </div>
      </div>
      <div className="like-btn">
        <span>&hearts;</span>
        <span>{favoritesCount}</span>
      </div>
    </header>
    <Link to={`/article/${slug}`} className="anchor">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
    <footer>
      <Link to={`/article/${slug}`} className="anchor" style={{color : "rgb(224, 154, 24)"}}>
        Read more
      </Link>
    </footer>
    <div className="hero_container">
             <div className="line"></div>
        </div>  
   </article>
  );
};
