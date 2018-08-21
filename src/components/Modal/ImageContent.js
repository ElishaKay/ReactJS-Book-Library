import React from 'react';

export default ({ title, text, published, author }) => (
  <div className='image-content'>
    <h3>{title}</h3>
    <h6>Author: {author}</h6>
    <h6>Published: {published}</h6>
    <p>{text}</p>

    <button 
    	className="btn btn-info pull-xs-right"
    	// onClick={this.onDeleteClick.bind(this)}
    >
        Edit Book
    </button>
  </div>
)