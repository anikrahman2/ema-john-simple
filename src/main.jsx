import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Home from './components/layout/Layout';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import { cartProductsLoader } from './loaders/cartProductLoader';
import Checkout from './components/Checkout/Checkout';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/provider/AuthProvider';
import Layout from './components/layout/Layout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import PrivateRoute from './components/routes/PrivateRoute';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Shop />
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'checkout',
        element:
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
      },
      {
        path: 'sign-up',
        element: <SignUp></SignUp>
      },
      {
        path: '/forget-password',
        element: <ForgetPassword></ForgetPassword>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
