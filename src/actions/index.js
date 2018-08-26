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
    let nextId = id++;
    let imgSrc = book.imageLinks ? book.imageLinks.thumbnail.replace("zoom=1", "zoom=100") : 'https://www.classicposters.com/images/nopicture.gif'
    books[i] = {id: nextId,
                title: bookTitle,
                author: book.authors[0], 
                img: imgSrc,
                published: book.publishedDate,
                content: book.description
    }
    bookTitles.push({id: nextId, title: bookTitle });
  }
  dispatch({ type: FETCH_BOOKS, payload: books });
}

export const saveBook = (values, onSuccess, onError) => dispatch => {
  values.img = values.img.includes("575c56519f72666e381d4efd") ? 'http://sybasigns.com.au/images/products-large/new-books-book-stickers.jpg' : values.img
  values.title = filterTitle(values.title);

  for (var key in bookTitles) {
    if (values.title === bookTitles[key].title && values.id!==bookTitles[key].id){
      return onError()
    }
  }
  onSuccess()
  dispatch({ type: SAVE_BOOK, payload: values });
}

export const deleteBook = id => dispatch => {
  dispatch({ type: DELETE_BOOK, payload: id });
}
