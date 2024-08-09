import React from 'react';
import './ProductDisplay.css';
import starfill from '../Assets/starfill.png';
import stardull from '../Assets/stardull.png';
import { addToCart } from '../../Redux/CartSlice';
import { useDispatch } from 'react-redux';




const ProductDisplay = ({ product }) => {
    const dispatch = useDispatch(); 

    const handleAddToCart = () => {
      dispatch(addToCart(product.id)); 
    };
  
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img src={product.image} alt="" className='productdisplay-main-img' />
                </div>
            </div>
            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={starfill} alt="" />
                    <img src={starfill} alt="" />
                    <img src={starfill} alt="" />
                    <img src={starfill} alt="" />
                    <img src={stardull} className="dull" alt="" />
                    <p>{product.rating.rate}</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={handleAddToCart}>Add to cart</button>
                <p className='productdisplay-right-category'><span>Category : </span> {product.category}</p>
                <p className='productdisplay-right-category'><span>Tags : </span> Modern , Label</p>
            </div>
        </div>
    )
}

export default ProductDisplay