import './Shop.css';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);
  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id of the stored product
    for (const id in storedCart) {
      // step 2: get product from products by using id
      const addedProducts = products.find(product => product.id === id);
      if (addedProducts) {
        // step 3: add quantity
        const quantity = storedCart[id]
        addedProducts.quantity = quantity;
        // add the product to the savedCart
        savedCart.push(addedProducts);
      }

    }
    // savedCart set to the setCart function
    setCart(savedCart);
  }, [products])

  const handelAddToCart = (product) => {
    // const newCart = [...cart, product];
    let newCart = [];
    const exist = cart.find(pd => pd.id === product.id);
    if (!exist) {
      product.quantity = 1;
      newCart = [...cart, product];

    }
    else {
      exist.quantity = exist.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exist]
    }
    setCart(newCart);
    addToDb(product.id)
  };
  const handelClearCart = () => {
    setCart([])
    deleteShoppingCart()
  }

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
        <Cart
          cart={cart}
          handelClearCart={handelClearCart}
        >
          <Link to='/orders'>
            <button className='btn-proceed'>
              Review Orders
              <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;