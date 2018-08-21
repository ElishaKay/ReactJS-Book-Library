import React, { Component } from "react";
import BooksNew from "../Books/BooksNew";

class ImageContent extends Component {
  componentWillMount() {
    console.log('this.props in ImageContent Component',this.props);
  }

  renderContent() {
    if (this.props) {
      return (
        <BooksNew />
      );
    }

    return (
      <div className='image-content'>
	    <h3>{this.props.title}</h3>
	    <h6>Author: {this.props.author}</h6>
	    <h6>Published: {this.props.published}</h6>
	    <p>{this.props.text}</p>

	    <button 
	    	className="btn btn-info pull-xs-right"
	    >
	        Edit Book
	    </button>
	  </div>
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


export default ImageContent;
