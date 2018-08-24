import React from 'react'
import ImageModal from './ImageModal'

import newBook from '../../constants/newBook'

export default ({ children, length }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    <div className="row">
    	<div className="col-md-4">
    	</div>
    	<div className="col-md-4">
    		<ImageModal {...newBook} id={length}/>
    	</div>
    	<div className="col-md-4">
    	</div>
    </div>
    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)