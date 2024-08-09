import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  // directing link according to the products data source
  const productLink = props.source === 'all_products' ?  `/product/${props.id}` : `/addproduct/userproduct/${props.id}`;
  // console.log(props)

  
  return (
    <div className="item">
      <Link to={productLink}>
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price || props.price}</div>
        {props.old_price && <div className="item-price-old">${props.old_price}</div>}
      </div>
    </div>
  );
};

export default Item;
