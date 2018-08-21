import React from 'react';
import Modal from '../Modal/Modal'
import ImageHead from '../Modal/ImageHead'
import ImageContent from '../Modal/ImageContent'

export default item => (
  <div key={item.id} className='grid__item'>
    <Modal
      maxwidth={700}
      maxheight={500}
      ms={500}
    >
      <Modal.Head>
        <ImageHead {...item}/>
      </Modal.Head>
      <Modal.Content>
        <ImageContent {...item}/>
      </Modal.Content>
    </Modal>
  </div>
)