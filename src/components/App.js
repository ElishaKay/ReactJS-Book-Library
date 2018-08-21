import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import PostsIndex from "./books/posts_index";
import PostsNew from "./books/posts_new";
import PostsShow from "./books/posts_show";


class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
              <Header />
              <Route exact path="/" component={PostsIndex} />
              <Route path="/posts/new" component={PostsNew} />
              <Route path="/posts/:id" component={PostsShow} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
