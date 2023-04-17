import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const ForgetPassword = () => {
  const [error, setError] = useState('')
  const emailRef = useRef()
  const { passwordReset } = useContext(AuthContext);
  const handelReset = event => {
    event.preventDefault();
    const email = emailRef.current.value;
    passwordReset(email)
    .then(result => {
      alert('An email send to your email address.')

    })
    .catch(error => setError(error.message))
  }
  return (
    <div className='form-container'>
      <h2 className='form-title'>Forget Password</h2>
      <p className='error'>{reportError}</p>
      <form onSubmit={handelReset}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} name="email" id="" required />
        </div>
        <input className='btn-submit' type="submit" value="Reset" />
      </form>
    </div>
  );
};

export default ForgetPassword;