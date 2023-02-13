import axios from 'axios';


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