
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/header/Navbar";
import "./App.css"
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Login from './Pages/Register/Login';
import Signup from './Pages/Register/Signup';
import Cart from './Pages/Cart/Cart';    
import Shipping from './Pages/Shipping/Shipping';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './redux/Login/loginAction';
import { useEffect, useState } from 'react';
import Order from './Pages/Shipping/Order';
import Payment from './Pages/Payment';
import Error from "./Pages/Error/Error";
import Footer from "./component/Footer/Footer";


function App() {

  const dispatch = useDispatch()
  let token = localStorage.getItem("usersdatatoken");
  const {login,isAuthenticated} = useSelector(store => store.login)


  useEffect(() => {
    dispatch(getUserData(token))
  }, [])

  return (
    <>
    <Navbar user={{login,isAuthenticated}} />
      <Routes>
      {
        isAuthenticated == true ?( <>
        <Route path="/shipping" element={<Shipping /> } /> 
        <Route path='/payment' element={<Payment/>} />
        <Route path="/order" element={<Order /> } />
        </>) : (<Route path='/login' element={<Login/>}/>)
      }  
        <Route path="*" element={<Error /> } />
        <Route path="/" element={<Products /> } />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/product/:id" element={<SingleProduct /> } />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
