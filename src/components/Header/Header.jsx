import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handelSignOut = () => {
    logOut()
      .then(() => { })
      .catch(() => { });
  }
  return (
    <nav className='header'>
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        {
          !user &&
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>

        }
        {
          user &&
          <span className='text-white'> Welcome {user.email}</span>
        }
        {
          user && <button className='btn-sign-out' onClick={handelSignOut}>Sign Out</button>
        }
      </div>
    </nav>
  );
};

export default Header;