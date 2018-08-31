import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions";

import ImageModal from '../Modal/ImageModal'
import Layout from '../Modal/Layout'


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  checkTitle(title){
    let fetchedBooks = this.props.books

    console.log(fetchedBooks);
    //   for (var key in bookTitles) {
    //     if (values.title === bookTitles[key].title && values.id!==bookTitles[key].id){
    //       // return onError()
    //       console.log('title exists');
    //     }
    //   }

  }

  render() {
    let fetchedBooks = _.map(this.props.books).reverse()

    return (
      <div>
        <Layout length={fetchedBooks.length}>
          <div className='grid'>
            {fetchedBooks.map((image,i) => <ImageModal key={i} {...image} checkTitle={this.checkTitle.bind(this)} />)}            
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