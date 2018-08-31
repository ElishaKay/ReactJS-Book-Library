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

  checkTitle(title){
    let fetchedBooks = _.map(this.props.books)

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
        <div className="row">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <ImageModal {...newBook} id={fetchedBooks.length} checkTitle={this.checkTitle.bind(this)}/>
        </div>
        <div className="col-md-4">
        </div>
    </div>

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