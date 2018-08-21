import axios from 'axios';
import { FETCH_BOOKS, FETCH_BOOK, CREATE_BOOK, DELETE_BOOK } from './types';

const ROOT_URL = "https://www.googleapis.com/books/v1/volumes?q=computers";

export const fetchBooks = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}`);

  let books = {};
  let id = 0;
  for(let i=0; i<9; i++){
    let book = res.data.items[i].volumeInfo;
    books[i] = {id: id++,
                title: book.title,
                author: book.authors[0], 
                img: book.imageLinks.thumbnail.replace("zoom=1", "zoom=100"),
                published: book.publishedDate,
                text: book.description,
                udpateBook: false
              }
  }
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const updateBook = (values, callback) => async dispatch => {
  console.log('these are the updateBook values',values);
  callback();
  dispatch({ type: UPDATE_BOOK, payload: res.data });
}

export const createBook = (values, callback) => async dispatch => {
  const res = await axios.post(`${ROOT_URL}/books${API_KEY}`, values);
  callback();

  dispatch({ type: CREATE_BOOK, payload: res.data });
}

export const fetchBook = id => async dispatch => {
  const res = await axios.get(`${ROOT_URL}/books/${id}${API_KEY}`);

  dispatch({ type: FETCH_BOOK, payload: res.data });
}

export const deleteBook = (id, callback) => async dispatch => {
  const res = await axios.delete(`${ROOT_URL}/books/${id}${API_KEY}`)
  callback();

  dispatch({ type: DELETE_BOOK, payload: id });
}
