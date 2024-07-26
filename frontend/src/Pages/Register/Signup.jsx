import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getSignupFailure, getSignupRequest, getSignupSuccess } from "../../redux/SignUp/signaction";
import NavSecond from "../../component/header/NavSecond";

const Signup = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const [spin, setspin] = useState(true);
  const {isAuthenticated} = useSelector((store) => store.signUp)

  const [image, setimage] = useState("");

  const [sdata, setsdata] = useState({
    fname:"",
    fname:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{

    const {name,value} = e.target
      setsdata({...sdata,[name]:value})
    }
  // console.log(sdata)

  const setProfile = (e) => {
    setimage(e.target.files[0]);
  };

  console.log(image)
  const handleSubmit = async(e) =>{

    e.preventDefault();
    const { fname,lname,email,password} = sdata;

    if(fname==""){
      toast.error("Please enter your First Name")
    }
    else if(lname==""){
      toast.error("Please enter Last Name")
    }else if(email==""){
      toast.error("Please enter your Email")
    }
    else if(password==""){
      toast.error("Please enter your password")
    }
    else{
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("password", password);
      data.append("user_profile", image);
      const config = {
        headers:{
          "Content-Type": "multipart/form-data",
        }
      }
      dispatch(getSignupRequest())
      axios.post('https://nykkabackend-cgkg.onrender.com/user/register',
        data,
        config
      ).then((res) => {
        console.log(res)
        dispatch(getSignupSuccess(res.data.finalUser))
        toast('Sign up Successfully.')
        nav('/login')
      }).catch((error) => {
        toast.error('This email address already exist.')
        dispatch(getSignupFailure());
        console.log(error)
      });
    }
  }

  
  useEffect(() => {
    setTimeout(() => {
      setspin(false);
    }, 1300);
  }, [])

  return (
    <>
    <NavSecond/>
    {
      spin ? (
        <Loader />
      ) : (
        <>
        <div className="login_div">
        <h1>SignUp</h1>
        <input className="input" name='fname' type="text"  placeholder="Enter Your First Name" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input className="input" name='lname' type="text"  placeholder="Enter Your Last Name" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input className="input" name='email' type="text"  placeholder="Enter Your Email" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input  className="input" name='password' type="text"  placeholder="Enter Your Password" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br/>
        <input name="user_profile"
        onChange={setProfile} type='file' placeholder="Choose Profile picture" className="input" style={{fontSize: "17px", textAlign:"center",backgroundColor:"white"}} /><br/>
        <button className="buton" type='submit' onClick={handleSubmit} >Signup</button>
        <h5>Already have an account? <Link to='/login' style={{ color:"black"}}><span style={{ color:"black"}}>Login</span></Link></h5>
        <ToastContainer position="top-center"/>
      </div>
      </>
      )
    }
    </>
  );
};

export default Signup;
