import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBook, updateBook } from "../../actions";
import BooksNew from "../Books/BooksNew";

class ImageContent extends Component {
  componentWillMount() {
    this.setState({ editing: false })
    console.log('this.props in ImageContent Component',this.props);
    console.log()
  }

  renderContent() {
    if (this.props.udpateBook) {
      return (
         <div className='image-content'>
            <h3>{this.props.title}</h3>
            <h6>Author: {this.props.author}</h6>
            <h6>Published: {this.props.published}</h6>
            <p>{this.props.text}</p>

            <button 
              className="btn btn-info pull-xs-right"
              onClick={this.setState({ editing: true })}
            >
                Edit Book
            </button>
        </div>
      );
    }

    return (
      <BooksNew book={this.props} />
    );
  }

  render() {
    return (
    	 <div>
	        {this.renderContent()}
	     </div>
    );
  }
};


function mapStateToProps(state) {
  return {
    book: state.activeBook
  };
}


export default connect(mapStateToProps, { fetchBook, updateBook })(ImageContent);
