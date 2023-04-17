import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // observer
  const createUser = (email, password) => {
    setLoading(true);
   return createUserWithEmailAndPassword(auth, email, password);
  } 
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const passwordReset = email => {
    return sendPasswordResetEmail(auth, email);
  }
  const logOut = () => signOut(auth);
  useEffect((user) => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false);
    });
    // stop observing while unmounting
    return () => {
      return unsubscribe();
    };
  }, [])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    passwordReset
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;