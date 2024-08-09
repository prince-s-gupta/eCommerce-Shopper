import React from 'react'
import './Hero.css'
import handIcon from '../Assets/palm-hand_1427.png'
import hero from '../Assets/hero.png'


const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={handIcon} alt="" />
                </div>
                <p>Collection</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src="" alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero} alt="" />
        </div>
    </div>
  )
}

export default Hero