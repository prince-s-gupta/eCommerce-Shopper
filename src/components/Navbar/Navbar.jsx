import React, { useState, useRef } from "react";
import "./Navbar.css";
import cart from "../Assets/cart-icon.png";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import drop from "../Assets/drop.png"
import { getTotalCartItems } from "../../Redux/CartSlice";

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const totalCartItems = useSelector(getTotalCartItems);
  const menuref = useRef();

  const dropdownToggle = ()=>{
    menuref.current.classList.toggle("nav-menu-visible");
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>Shopper</p>
      </div>
        <img onClick={dropdownToggle} className="nav-dropdown" src={drop} alt="" />
      <ul ref={menuref} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("allproducts")}>
          <Link to="/allproducts">All Products</Link>
          {menu === "allproducts" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens">Men</Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens">Women</Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("jwellery")}>
          <Link to="/jwellery">Jewellery</Link>
          {menu === "jwellery" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/addproduct">
          <button>Add Products</button>
        </Link>
        <Link to="/cart">
          <img src={cart} alt="Cart" />
          {totalCartItems > 0 && (
            <div className="nav-cart-count">{totalCartItems}</div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
