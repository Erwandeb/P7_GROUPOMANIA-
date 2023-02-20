import React, { useState, useEffect } from 'react';
import { getAllPost } from '../../clienthttp/api';
import '../posts/Post.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const getPost = async (e) => {
        try {
          const res = await getAllPost();
          console.log("tes",res)
          setPosts(res.data);
        } catch (err) {
          console.log(err.response || err.message);
        }
      };
    
      useEffect(() => {
        getPost();
      }, []);


    return (
        <div>
        {posts.map((post) => (
        <div className="post" key={post.ID}>
            <span className="auteur">{post.AUTHOR_ID}</span>
            <p>{post.CONTENT ? post.CONTENT : ""}</p>
            {post.IMAGES ? <img src={post.IMAGES} alt="" /> : ""}
        </div>
        ))}
        </div>
    );
};

export default Posts;