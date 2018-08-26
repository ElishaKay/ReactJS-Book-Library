import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStore} from 'redux';
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

const store = createStore((state = 0, action) => {
	return action.type === 'increment' ? state + 1 : state;
});

console.log(store.getState());
store.subscribe(() => {
	console.log(store.getState());
})
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'increment' });
