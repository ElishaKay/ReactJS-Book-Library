import React from 'react'
import Modal from './Modal'
import ImageHead from './ImageHead'
import ImageContent from './ImageContent'

export default ({ children }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    <div className='grid__item'>
	    <Modal
	      maxwidth={700}
	      maxheight={500}
	      ms={500}
	    >
	      <Modal.Head>
	        <ImageHead />
	      </Modal.Head>
	      <Modal.Content>
	        <ImageContent />
	      </Modal.Content>
	    </Modal>
	</div>

    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)