import axios from 'axios';
import { FETCH_BOOKS, SAVE_BOOK, DELETE_BOOK } from './types';

const ROOT_URL = "https://www.googleapis.com/books/v1/volumes?q=computers";

function filterTitle(str) {
     let newTitle = '';
     let splitStr = str.toLowerCase().split(' ');
     for (let i = 0; i < splitStr.length; i++) {
       let newWord = splitStr[i].replace(/\W/g, '')
       newWord = newWord.charAt(0).toUpperCase() + newWord.substr(1);
       newTitle += newWord + ' ';   
     }
     return newTitle.trim()
}

export const fetchBooks = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}`);

  let books = {};
  let id = 0;

  for(let i=0; i<6; i++){
    let book = res.data.items[i].volumeInfo;
    let imgSrc = book.imageLinks ? book.imageLinks.thumbnail.replace("zoom=1", "zoom=100") : 'http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg'
    books[i] = {id: id++,
                title: filterTitle(book.title),
                author: book.authors[0], 
                img: imgSrc,
                published: book.publishedDate,
                content: book.description
    }
  }
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const saveBook = (values, callback) => dispatch => {
  callback();
  console.log(values);
  values.title = filterTitle(values.title);
  dispatch({ type: SAVE_BOOK, payload: values });
}

export const deleteBook = id => dispatch => {
  dispatch({ type: DELETE_BOOK, payload: id });
}
