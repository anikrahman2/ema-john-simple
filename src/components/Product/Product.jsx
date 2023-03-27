import './Product.css';
import React from 'react';

const Product = (props) => {
  const {name, price, img, ratings, seller, stock, quantity} = props.product;
  return (
    <div className='product'>
      <img src={img} alt="" />
      <div className='product-info'>
        <h6 className='product-name'>{name}</h6>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} Stars</p>
      </div>
      <button className='btn-cart'>Add To Cart</button>
    </div>
  );
};

export default Product;