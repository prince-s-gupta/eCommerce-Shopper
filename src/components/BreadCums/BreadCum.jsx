import React from 'react'
import './BreadCum.css'
import arrow from "../Assets/right-arrow.png"

const BreadCum = (props) => {
    const { product } = props;
    return (
        <div className='breadcrum'>
            Home <img src={arrow} alt="" /> Shop <img src={arrow} alt="" />  {product.category } <img src={arrow} alt="" /> {product.name}
        </div>
    )
}

export default BreadCum
