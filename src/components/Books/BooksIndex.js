import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../actions";

import { map, is, contains, curry, reduce, toPairs, __, prop, equals, pipe, find, ifElse, F, identity } from 'ramda';
import { cloneChildren, Head, Content, easingFunctions, getElapsedTime, calcProgressVal, callFn, getNewStyles, setStyleToElement, setStylesToElement, pickFromRect, _findChildren, findChildrenOr, findChildren, findChildrenOrIdentity, getLastPositionStyles, states, openState, afterOpenState, closingState, isActiveState, isAfterOpenState, isClosingState, isOpenedState } from "../../helpers/modalStyling";

import images from '../Modal/images'
import Modal from '../Modal/Modal'
import ImageHead from '../Modal/ImageHead'


const ImageContent = ({ title, text }) => (
  <div className='image-content'>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
)

const ImageModal = item => (
  <div key={item.id} className='grid__item'>
    <Modal
      maxwidth={700}
      maxheight={500}
      ms={500}
    >
      <Modal.Head>
        <ImageHead {...item}/>
      </Modal.Head>
      <Modal.Content>
        <ImageContent {...item}/>
      </Modal.Content>
    </Modal>
  </div>
)

const ImageModalList = ({ images }) => map(ImageModal, images)

const Layout = ({ children }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)


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
