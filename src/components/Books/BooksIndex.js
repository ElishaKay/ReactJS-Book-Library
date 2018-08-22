import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../actions";

import ImageModalList from '../Modal/ImageModalList'
import Layout from '../Modal/Layout'


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    return (
      <div>
        <Layout>
          <div className='grid'>
            <ImageModalList images={_.map(this.props.books).reverse()}/>
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