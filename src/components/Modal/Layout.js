import React from 'react'
import AddBook from '../Books/AddBook'

import newbook from '../Books/newbook'

export default ({ children }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    <AddBook {...newbook}/>

    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)