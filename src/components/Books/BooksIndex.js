import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions";

import ImageModalList from '../Modal/ImageModalList'
import Layout from '../Modal/Layout'


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
    console.log(this.props.books);
  }

  render() {
    let fetchedBooks = _.map(this.props.books)

    return (
      <div>
        <Layout length={fetchedBooks.length}>
          <div className='grid'>
            <ImageModalList images={fetchedBooks.reverse()}/>
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