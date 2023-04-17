import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('')
  const handelSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    if (password !== confirm) {
      setError("Password didn't match");
      return
    }
    else if (password.length < 6) {
      setError("Password must be 6 characters");
      return
    }
    createUser(email, password)
      .then(result => {
        const loggedUser = result.user;
        form.reset();
        alert('Verify Your Email')
        sendEmailVerification(loggedUser);
        console.log(loggedUser)
      })
      .catch(error => setError(error.message));
  }
  return (
    <div className='form-container'>
      <h2 className='form-title'>Sign Up</h2>
      <p className='error'><small>{error}</small></p>
      <form onSubmit={handelSignUp}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="" required />
        </div>
        <input className='btn-submit' type="submit" value="Sign Up" />
      </form>
      <div className='page-toggle'>
        Already have an account? <Link className='yellow-text' to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default SignUp;