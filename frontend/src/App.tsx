import React from 'react';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import ProductDetails from './Pages/ProductDetailsPage/ProductDetailsPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import CartPage from './Pages/CartPage/CartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/product/:productId",
    element: <ProductDetails />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/cart",
    element: <CartPage />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;