import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions";

import ImageModal from '../Modal/ImageModal'
import Layout from '../Modal/Layout'

import newBook from '../../constants/newBook'


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  checkTitle(updatedBook){
    let fetchedBooks = _.map(this.props.books)
      for (var value of fetchedBooks) {
        if (updatedBook.title === value.title && updatedBook.id!==value.id){
           return {exists: true}
        }
      }
    return {exists: false}  
  }

  render() {
    let { books } = this.props;
    let maxKey=0;
    for (var key in books){
      if(parseInt(key)>maxKey){
        maxKey = parseInt(key);
      }
    }
    books = _.map(books).reverse()

    return (
      <div>
        <div className="row">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <ImageModal {...newBook} id={maxKey+1} checkTitle={this.checkTitle.bind(this)}/>
        </div>
        <div className="col-md-4">
        </div>
    </div>

        <Layout length={books.length}>
          <div className='grid'>
            {books.map((image,i) => <ImageModal key={i} {...image} checkTitle={this.checkTitle.bind(this)} />)}            
          </div>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books };
}

export default connect(mapStateToProps, { fetchBooks })(BooksIndex);