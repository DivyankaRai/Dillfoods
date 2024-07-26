import React from 'react'
import { Link } from 'react-router-dom'
import "./Navsecond.css"

const NavSecond = () => {
  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
          <Link to='/' style={{textDecoration: 'none'}}><p>Categories</p></Link>    
          <Link to='/' style={{textDecoration: 'none'}}><p>Beauty Advice</p></Link>
          <Link to='/' style={{textDecoration: 'none'}}><p>Brands</p></Link>
          <Link to='/' style={{textDecoration: 'none'}}><p>Makeup</p></Link>
          <Link to='/' style={{textDecoration: 'none'}}><p>Skin</p></Link>
          <Link to='/' style={{textDecoration: 'none'}}><p>Hair</p></Link>
          <Link to='/' style={{textDecoration: 'none'}}><p>Fragrances</p></Link>
        </div>
        <div className="right_data">

        </div>
      </div>
    </div>
  )
}

export default NavSecond
