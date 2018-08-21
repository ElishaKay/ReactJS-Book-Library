import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_POSTS, FETCH_POST,
        CREATE_POST, DELETE_POST } from './types';

// External API For Creating and deleting Posts
const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=PAPERCLIP1234";

export const fetchPosts = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
  console.log('these are the posts:', res)

  dispatch({ type: FETCH_POSTS, payload: res.data });
}

export const createPost = (values, callback) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/posts${API_KEY}`, values);
  callback();

  dispatch({ type: CREATE_POST, payload: res.data });
}

export const fetchPost = id => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  dispatch({ type: FETCH_POST, payload: res.data });
}

export const deletePost = (id, callback) => async dispatch => {
  const res = await axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  callback();

  dispatch({ type: DELETE_POST, payload: id });
}
