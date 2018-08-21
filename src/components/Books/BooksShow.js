import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBook, deleteBook } from "../../actions";

class BooksShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchBook(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteBook(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { book } = this.props;
    console.log('heres the book object in bookShow Component:',book);
    if (!book) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Book
        </button>
        <h3>{book.title}</h3>
        <h6>Categories: {book.categories}</h6>
        <p>{book.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ books }, ownProps) {
  console.log('books[ownProps.match.params.id]',books[ownProps.match.params.id]);
  return { book: books[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchBook, deleteBook })(BooksShow);
