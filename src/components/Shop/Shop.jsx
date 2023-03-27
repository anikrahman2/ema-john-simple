import './Shop.css';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);
  const [cart, setCart] = useState([]);

  const handelAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div className='shop-container'>
      <div>
        <h1>Products Coming Here: {products.length}</h1>
          <div className='products-container'>
            {
              products.map(product => <Product 
                product={product} 
                key={product.id}
                handelAddToCart={handelAddToCart}></Product>)
            }
          </div>
      </div>
      <div className="cart-container">
        <h2>Order Summary</h2>
        <p>Selected Item: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;