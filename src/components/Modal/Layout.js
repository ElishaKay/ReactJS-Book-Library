import React from 'react'
import ImageModal from './ImageModal'

import newbook from '../Books/newbook'

export default ({ children, length }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    <ImageModal {...newbook} id={length}/>

    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)