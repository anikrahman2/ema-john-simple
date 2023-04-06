import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItem/ReviewItems';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
  const savedCart = useLoaderData()
  const [cart, setCart] = useState(savedCart);
  const handelRemoveFromCart = (id) => {
    const remaining = savedCart.filter(pd => pd.id !== id);
    setCart(remaining)
    removeFromDb(id)

    console.log(id)
  }
  console.log(savedCart)
  return (
    <div className='shop-container'>
      <div className='review-container'>
        {
          cart.map(product => <ReviewItems
            product={product}
            key={product.id}
            handelRemoveFromCart={handelRemoveFromCart}
          />)
        }
      </div>
      <div className='cart-container'>
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Orders;