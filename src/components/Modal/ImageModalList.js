import React from 'react';
import ImageModal from '../Modal/ImageModal'
import { map } from 'ramda';

export default ({ images }) => map(ImageModal, images)
