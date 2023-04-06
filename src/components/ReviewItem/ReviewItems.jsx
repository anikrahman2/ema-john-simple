import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItems = ({ product, handelRemoveFromCart }) => {
  const { img, name, price, id, quantity, } = product;
  return (
    <div className='review-item'>
      <img src={img} alt="Product Image" />
      <div className='review-details'>
        <p className='product-title'>{name}</p>
        <p>Price: <span className='orange-text'>$ {price}</span></p>
        <p>Quantity: <span className='orange-text'>{quantity}</span></p>
      </div>
      <button onClick={() => handelRemoveFromCart(id)} className='btn-delete'>
        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItems;