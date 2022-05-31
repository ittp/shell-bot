/**
 * axios with a custom config.
 */

import axios from 'axios';
// import { auth } from '@strapi/helper-plugin';
const auth = ({ env })=> {
  token: env("token"),
  user: env("user")
}
const instance = axios.create({
  baseURL: "",
  headers: {},
  cors: true
  
 // baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async config => {
    config.headers = {
      'Authorization': `Bearer ${auth.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    // whatever you want to do with the error
    if (error.response?.status === 401) {
      //auth.clearAppStorage();
      //window.location.reload();
    }

    throw error;
  }
);

export default instance;
