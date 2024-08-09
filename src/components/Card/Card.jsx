import React from "react";
import "../Item/Item.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, new_price, old_price, handleEditClick  }) => {
  return (
    <div className="item">
      <Link to={`/addproduct/userproduct/${id}`}>
        <img src={image} alt="" />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">${new_price}</div>
        <div className="item-price-old">${old_price}</div>
      </div>
      <div>
        <button
          style={{ marginTop: "10px" }}
          onClick={() => handleEditClick(id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
