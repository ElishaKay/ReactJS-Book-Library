import React from 'react';
import ImageModal from './ImageModal'
import { map } from 'ramda';

export default ({ images }) => map(ImageModal, images)
