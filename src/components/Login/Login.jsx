import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  console.log(from)
  const handelSignIn = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        form.reset();
        navigate(from, { replace: true })
      })
      .catch(error => setError(error.message))
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>Login</h2>
      <p className='error'>{error}</p>
      <form onSubmit={handelSignIn}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show ? 'text' : 'password'} name="password" id="" required />
          <p onClick={() => setShow(!show)}>
            {
              show ? <span style={{ cursor: 'pointer' }}>Hide Password</span> : <span style={{ cursor: 'pointer' }}>Show Password</span>
            }
          </p>
        </div>
        <input className='btn-submit' type="submit" value="Login" />
      </form>
      <div className='page-toggle'>
        <p>New to Ema-john? <Link className='yellow-text' to='/sign-up'>Create New Account</Link></p>
        <p>Forgot Password? <Link className='yellow-text' to='/forget-password'>Reset</Link></p>
      </div>
    </div>
  );
};

export default Login;