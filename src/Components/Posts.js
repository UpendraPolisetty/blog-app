import Loader from "./Loader";
import { Post } from "./Post";

const Posts = (props) => {


  if(props.error){
    return <p>{props.error}</p>
  }

  if (!props.articles) {
    return <Loader />;
  }
  console.log(props.articles);
return (
    <>
      {props.articles.map(article => (
        <Post key={article.slug} {...article} />
      ))}
    </>
  );
};

export default Posts;
