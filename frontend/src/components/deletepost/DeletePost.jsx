import React, { useState, useEffect } from 'react';
import '../deletepost/deletepost.css';

const DeletePostBtn = () => {
    const [deletePost, setDeletePost] = useState(null);
   
    const deleteThePost = async (e) => {
      e.preventDefault();
      try {
        
      } catch (err) {
        console.log( err.response || err.message);
      }
    }

    return (
        <a href='' onClick={deleteThePost} className='delete-post'>
            Supprimer
        </a>
    );
};

export default DeletePostBtn;