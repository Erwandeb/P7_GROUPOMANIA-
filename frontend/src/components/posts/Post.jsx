import React, { useState, useEffect } from 'react';
import { getAllPost } from '../../clienthttp/api';
import '../posts/Post.css';
import Createpost from '../createpost/Createpost';
import DeletePostBtn from '../deletepost/DeletePost';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [counter, setCounter] = useState(0);

  const getPost = async () => {
    try {
      const res = await getAllPost();
      console.log('resulats', res);
      setPosts(res.data);
    } catch (err) {
      console.log(err.response || err.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [newPost]);

  return (
    <>
      <Createpost setNewPost={setNewPost} />
      {posts.map((post) => (
        <div className="post" key={post.ID}>
          <span className="auteur">{post.AUTHOR_ID}</span>
          <p className="content">{post.CONTENT ? post.CONTENT : ''}</p>
          {post.IMAGES ? <img src={post.IMAGES} alt="" className="image" /> : false}
          <DeletePostBtn />
        </div>
      ))}
    </>
  );
};

export default Posts;
