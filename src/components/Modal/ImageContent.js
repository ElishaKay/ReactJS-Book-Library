import React from 'react';

export default ({ title, text, published }) => (
  <div className='image-content'>
    <h3>{title}</h3>
    <h6>Published: {published}</h6>
    <p>{text}</p>
  </div>
)