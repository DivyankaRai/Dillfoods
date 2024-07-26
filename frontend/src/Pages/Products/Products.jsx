// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import "./products.css";
import axios from "axios";
import {
  getProductsRequest,
  getProductsFailure,
  getProductsSuccess,
} from "../../redux/Products/productAction";
import NavSecond from "../../component/header/NavSecond";
import { Loader } from "../../component/Loading";

const Products = () => {

  const [sort, setsort] = useState("desc")
  const [spin, setspin] = useState(true)
  const [category, setcategory] = useState("All")
  const [search, setsearch] = useState("")
  const nav = useNavigate()


  const product = useSelector((store) => store.products.products);
  console.log(product)
  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(getProductsRequest());

    return axios
      .get(`https://nykkabackend-cgkg.onrender.com/products?search=${search}&category=${category}&sort=${sort}&page=1`)
      .then((res) => {                                      
        dispatch(getProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getProductsFailure());
      });
  };

  console.log(category)

  const shift = (id) => {
    console.log(id)
    nav(`/product/${id}`)
  }
  
  useEffect(() => {
    getTodos();
    setTimeout(() => {
      setspin(false)
    }, 1000);
  }, [category,sort]);

  return (
    <>
          <NavSecond/>
          {
            spin ? <Loader/> :      <div>
              <div className="main_pro">
                {product.map((e, i) => {
                  return (
                    <>
                      <div onClick={()=>shift(e._id)}>
                          <img src={e.images} alt="img" />
                        <h2>{e.name}</h2>
                        <div><i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                        <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                        <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                        <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                        </div>
                        <p style={{fontWeight: "600"}}>MRP: ₹{e.price}</p>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          }
    </>
  );
};

export default Products;