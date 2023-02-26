import React, { useState, useEffect } from 'react';
import { getAllPost } from '../../clienthttp/api';
import '../posts/Post.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const getPost = async (e) => {
        try {
          const res = await getAllPost();
          console.log("resulats",res)
          setPosts(res.data);
        } catch (err) {
          console.log(err.response || err.message);
        }
      };
    
      useEffect(() => {
        getPost();
      }, []);


    return (
        <>
          {posts.map((post) => (
          <div className="post" key={post.ID}>
              <span className="auteur">{post.AUTHOR_ID}</span>
              <p className='content'>{post.CONTENT ? post.CONTENT : ""}</p>
             {/*  {post.IMAGES ? <img src={post.IMAGES} alt="" class="image" /> : ""} */}
          </div>
          ))}
        </>
    );
};

export default Posts;