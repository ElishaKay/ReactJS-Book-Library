import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import BooksIndex from "./Books/BooksIndex";

class App extends Component {
  render() {
    return (
      <div className="container">
          <BooksIndex />
	  </div>
    );
  }
}

export default connect(null, actions)(App);
