import React from "react";
import "./Popular.css";
import data_product from "../Assets/data.js";
import Item from "../Item/Item";

const Popular = () => {
  return (
    <div className="popular">
      <h1>POPULAR IN MEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              source="all_products"  // Add source prop here
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
