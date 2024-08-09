import React from 'react';
import '../User Product Display/UserDisplay.css'
import starfill from '../Assets/starfill.png';
import stardull from '../Assets/stardull.png';
import { addToCart } from '../../Redux/CartSlice';
import { useDispatch } from 'react-redux';

const userdisplay = ({ product }) => {
    const dispatch = useDispatch(); 

    const handleAddToCart = () => {
        dispatch(addToCart({ id: product.id })); 
    };

    const newPrice = parseFloat(product.price); 
    const oldPrice = newPrice * 1.2; 

    // Create an array to represent the rating with filled and dull stars
    const starArray = Array(5).fill(false).map((_, index) => index < product.rating);

    return (
        <div className='userdisplay'>
            <div className="userdisplay-left">
                <div className="userdisplay-img-list">
                    <img src={product.image} alt="Product" />
                    <img src={product.image} alt="Product" />
                    <img src={product.image} alt="Product" />
                    <img src={product.image} alt="Product" />
                </div>
                <div className="userdisplay-img">
                    <img src={product.image} alt="Product" className='userdisplay-main-img' />
                </div>
            </div>
            <div className="user-display-right">
                <h1>{product.name}</h1>
                <div className="userdisplay-right-stars">   
                    {starArray.map((isFilled, index) => (
                        <img
                            className={isFilled ? "starfilled" : "starDull"}
                            key={index}
                            src={isFilled ? starfill : stardull}
                            alt={isFilled ? "Star Fill" : "Star Dull"}
                        />
                    ))}
                    <p>{product.rating}</p>
                </div>
                <div className="userdisplay-right-prices">
                    <div className="userdisplay-right-price-old">${oldPrice.toFixed(2)}</div>
                    <div className="userdisplay-right-price-new">${newPrice.toFixed(2)}</div>
                </div>
                <div className="userdisplay-right-description">
                    {product.description}
                </div>
                <div className="userdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="userdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={handleAddToCart}>Add to cart</button>
                <p className='userdisplay-right-category'><span>Category: </span> {product.category}</p>
                <p className='userdisplay-right-category'><span>Tags: </span> Modern, Label</p>
            </div>
        </div>
    );
}

export default userdisplay;
