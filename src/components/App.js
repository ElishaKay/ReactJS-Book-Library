import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import BooksIndex from "./Books/BooksIndex";
import BooksNew from "./Books/BooksNew";
import BooksShow from "./Books/BooksShow";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
             <Route exact path="/" component={BooksIndex} />
             <Route path="/books/new" component={BooksNew} />
             <Route path="/books/:id" component={BooksShow} />
          </div>
        </BrowserRouter>
	  </div>
    );
  }
}

export default connect(null, actions)(App);
