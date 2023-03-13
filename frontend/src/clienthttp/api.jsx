import axios from 'axios';
import { setUserData } from "../features/user.slice";

export const login = (email, password) => {
  const URL = `${import.meta.env.VITE_APP_API_URL}/auth/login`;
  return axios({
    method: "post",
    url:URL,
    data: {
      email,
      password,
    },
  })
  .then((res)=>{
    const token = res.data.token;
    const userId = res.data.userId;
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res
  })
  .catch(error => {
    console.error(error);
    return { error: 'Login failed, please try again later.' };
  });
};  




export const signup = (email, password) => {
  const URL = `${import.meta.env.VITE_APP_API_URL}/auth/signup`;
  return axios({
    method: "post",
    url:URL,
    data: {
      email,
      password,
    },
  })
  .catch(error => {
    console.error(error);
    return { error: 'Signup failed, please try again later.' };
  });
};


export const getAllPost = (pageNumber, limit, query) => {
  const URL = `${import.meta.env.VITE_APP_API_URL}/post?page=${pageNumber}&limit=${limit}`;
  return axios({
    method: "get",
    url: URL,
  })
  .catch(error => {
    console.error(error);
    return { error: 'Signup failed, please try again later.' };
  });
};


export const createPost = (text, images) => {
  const URL = `${import.meta.env.VITE_APP_API_URL}/post/create`;
  return axios({
    method: 'post',
    url: URL,
    data: {
      text,
      images,
    },
  }).catch((error) => {
    console.error(error);
    return { error: 'Creation of post failed, please try again later.' };
  });
};


/* export const deletePost = (text, images) => {
  const URL = `${import.meta.env.VITE_APP_API_URL}/post/create`;
  return axios({
    method: 'post',
    url: URL,
    data: {
      text,
      images,
    },
  }).catch((error) => {
    console.error(error);
    return { error: 'Creation of post failed, please try again later.' };
  });
};
 */