import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItem/ReviewItems';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCardAlt } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
  const savedCart = useLoaderData()
  const [cart, setCart] = useState(savedCart);
  const handelClearCart = () => {
    setCart([])
    deleteShoppingCart()
  }
  const handelRemoveFromCart = (id) => {
    const remaining = savedCart.filter(pd => pd.id !== id);
    setCart(remaining)
    removeFromDb(id)
  }
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
        <Cart
          cart={cart}
          handelClearCart={handelClearCart}
        >
          <Link to='/checkout'>
            <button className='btn-proceed'>
              Proceed To Checkout
              <FontAwesomeIcon icon={faCreditCardAlt} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;