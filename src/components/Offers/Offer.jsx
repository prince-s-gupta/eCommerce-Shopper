import React from 'react'
import './Offer.css'
import OfferImg from "../Assets/exclusiceimage.png"

const Offer = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>Only On Best Seller Product</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={OfferImg} alt="" />
        </div>
    </div>
  )
}

export default Offer