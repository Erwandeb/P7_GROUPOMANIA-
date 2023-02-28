import React, { useState, useEffect } from 'react';
import { createPost } from '../../clienthttp/api';
import '../createpost/Createpost.css';

const Createpost = () => {
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(message, images);
      console.log(res.data);
    } catch (err) {
      console.log(err.response || err.message);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const filenames = files.length === 1 ? files[0].name : [...files].map(file => file.name);
    setImages(filenames);
  };

  return (
    <form onSubmit={handleCreatePost} className='create-post-form'>
      <div className='input-wrapper'>
        <label htmlFor='message'>Votre message</label>
        <input
          type='text'
          id='message'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          minLength='2'
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='images'>Images</label>
        <input
          type='file'
          id='images'
          onChange={handleImageChange}
          accept='image/png, image/jpeg, image/jpg'
          multiple
        />
      </div>
      <button type='submit' className='button'>
        Poster ce message
      </button>
    </form>
  );
};

export default Createpost;