import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getAllPost } from '../../clienthttp/api';
import '../posts/Post.css';
import Createpost from '../createpost/Createpost';
import DeletePostBtn from '../deletepost/DeletePost';
import { useSelector } from 'react-redux';

const Posts = () => {

const [posts, setPosts] = useState([]);
const [endOfList, setEndOfList] = useState(false);
const [newPost, setNewPost] = useState(false);
const [limit, setLimit] = useState(10);
const [query, setQuery] = useState('');
const [pageNumber, setPageNumber] = useState(1);

const observer = useRef();

const lastPostElementRef = useCallback((node) => {
  if (endOfList) {
    return;
  }
  if (observer.current) {
    observer.current.disconnect();
  }
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setPageNumber((nextPageNumber) => nextPageNumber + 1);
    }
  });

  if (node) {
    observer.current.observe(node);
  }
}, [endOfList]);

const loadMorePosts = async () => {
  try {
    const res = await getAllPost(pageNumber, limit, query);
    console.log(res);
    if (res.data.length === 0) {
      setEndOfList(true);
    }
    setPosts((prevPosts) => [...prevPosts, ...res.data]);
  } catch (err) {
    console.log(err.response || err.message);
  }
};

useEffect(() => {
  loadMorePosts();
}, [pageNumber, newPost]);

if (newPost) {
  setPosts((prevPosts) => [...prevPosts, newPost]);
  setNewPost(null);
}
console.log(newPost)

return (
  <>
    <Createpost setNewPost={setNewPost} />
    {posts.map((post, index) => (
      <div
        className="post"
        key={post.ID}
        ref={posts.length === index + 1 ? lastPostElementRef : null}
      >
        <span className="auteur">{post.AUTHOR_ID}</span>
        <p className="content">{post.CONTENT ? post.CONTENT : ''}</p>
        {post.IMAGES ? <img src={post.IMAGES} alt="" className="image" /> : false}
        {post.AUTHOR_ID === post.AUTHOR_ID ? <DeletePostBtn /> : null}
      </div>
    ))}
    {endOfList && <p>Vous avez vu toutes les publications</p>}
  </>
);
};

export default Posts;