import axios from 'axios';
import { FETCH_BOOKS, UPDATE_BOOK, DELETE_BOOK } from './types';

const ROOT_URL = "https://www.googleapis.com/books/v1/volumes?q=computers";

export const fetchBooks = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}`);

  let books = {};
  let id = 0;

  for(let i=0; i<6; i++){
    let book = res.data.items[i].volumeInfo;
    let imgSrc = book.imageLinks ? book.imageLinks.thumbnail.replace("zoom=1", "zoom=100") : 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
    books[i] = {id: id++,
                title: book.title,
                author: book.authors[0], 
                img: imgSrc,
                published: book.publishedDate,
                content: book.description,
                udpateBook: false
    }
  }
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const updateBook = (values, callback) => dispatch => {
  callback();
  dispatch({ type: UPDATE_BOOK, payload: values });
}

export const deleteBook = id => dispatch => {
  dispatch({ type: DELETE_BOOK, payload: id });
}
