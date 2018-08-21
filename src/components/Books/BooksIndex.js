import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../actions";

import { map, is, contains, curry, reduce, toPairs, __, prop, equals, pipe, find, ifElse, F, identity } from 'ramda';
import { cloneChildren, Head, Content, easingFunctions, getElapsedTime, calcProgressVal, callFn, getNewStyles, setStyleToElement, setStylesToElement, pickFromRect, _findChildren, findChildrenOr, findChildren, findChildrenOrIdentity, getLastPositionStyles, states, openState, afterOpenState, closingState, isActiveState, isAfterOpenState, isClosingState, isOpenedState } from "../../helpers/modalStyling";

import images from '../Modal/images'
import ImageModalList from '../Modal/ImageModalList'
import Layout from '../Modal/Layout'


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  renderBooks() {
    console.log(this.props.books);
    return _.map(this.props.books, book => {
      return (
        <li className="list-group-item" key={book.id}>
          <Link to={`/books/${book.id}`}>
            {book.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/books/new">
            Add a Book
          </Link>
        </div>
        <h3>Books</h3>
        <ul className="list-group">
          {this.renderBooks()}
        </ul>
        <Layout>
          <div className='grid'>
            <ImageModalList images={images}/>
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
