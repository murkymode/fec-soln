import React from 'react';
import Stars from 'react-star-ratings';
import { useHistory } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import Column from '../../layout/Column';
import { averageRating, STOCK_IMAGE } from '../../../utils';
import Price from '../../overview/selection/Price';


export default function RelatedTile ({ product }) {
  const history = useHistory();
  const { id, styles: [style], reviews } = product;
  const { photos: [photo] } = style;

  return (
    <Column
      onClick={() => { history.push(`/products/${id}`); }}
      style={{
        position: 'relative',
        margin: '0 1em',
        flexShrink: '0',
        height: '400px',
        width: '275px',
        border: '1px solid black'
      }}>

      <>
        <FaStar
          color="white"
          style={{ position: 'absolute', margin: '0.2em', top: 0, right: 0 }}
        />
        <img
          style={{ height: '70%', maxWidth: '100%' }}
          src={photo.thumbnail_url || STOCK_IMAGE}
        />
      </>

      <h5 style={{ margin: '0.3em' }}>{product.category}</h5>
      <h3 style={{ margin: '0.3em' }}>{product.name}</h3>

      <Price style={style} />

      <div style={{ margin: '0.3em' }}>
        <Stars
          style={{ margin: '0.3em' }}
          rating={averageRating(reviews)}
          starDimension="1em"
          starSpacing="0.1em"
        />
      </div>
    </Column>
  );
}
