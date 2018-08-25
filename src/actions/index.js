import axios from 'axios';
import { FETCH_BOOKS, SAVE_BOOK, DELETE_BOOK } from './types';
import filterTitle from '../helpers/filterTitle'

const ROOT_URL = "https://www.googleapis.com/books/v1/volumes?q=when";
let bookTitles = [];

export const fetchBooks = () => async dispatch => {
  const res = await axios.get(`${ROOT_URL}`);

  let books = {};
  let id = 0;
  for(let i=0; i<9; i++){
    let book = res.data.items[i].volumeInfo;
    let bookTitle = filterTitle(book.title);
    bookTitles.push(bookTitle);
    let imgSrc = book.imageLinks ? book.imageLinks.thumbnail.replace("zoom=1", "zoom=100") : 'https://www.classicposters.com/images/nopicture.gif'
    books[i] = {id: id++,
                title: bookTitle,
                author: book.authors[0], 
                img: imgSrc,
                published: book.publishedDate,
                content: book.description
    }
  }
  console.log('booktitles: ', bookTitles);
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const saveBook = (values, callback) => dispatch => {
  let bookTitle = filterTitle(values.title);
  let titleExists = (bookTitles.indexOf(bookTitle) > -1);
  if(titleExists){
    console.log('title exists!');
  } else {
    callback();  
  }

  values.img = values.img.includes("575c56519f72666e381d4efd") ? 'http://sybasigns.com.au/images/products-large/new-books-book-stickers.jpg' : values.img
  values.title = bookTitle;
  dispatch({ type: SAVE_BOOK, payload: values });
}

export const deleteBook = id => dispatch => {
  dispatch({ type: DELETE_BOOK, payload: id });
}
