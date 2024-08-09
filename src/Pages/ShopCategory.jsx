import React, { useState } from 'react';
import './CSS/ShopCategory.css';
import { useSelector } from 'react-redux'; 
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  console.log(props);
  const all_products = useSelector((state) => state.cart.all_products);
  const productsData = useSelector((state) => state.products.productsData);
  
  // Filtered products based on category
  const filteredProducts = [...all_products, ...productsData].filter(item => item.category === props.category);
  
  const [sortOption, setSortOption] = useState('');

  // Handle sorting change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sorting  products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return (a.new_price || a.price) - (b.new_price || b.price);
    } else if (sortOption === 'price-desc') {
      return (b.new_price || b.price) - (a.new_price || a.price);
    } 
    return 0;
  });

  return (
    <div className='shop-category'>
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-{sortedProducts.length} out of {sortedProducts.length} products</span>
        </p>
        <div className="shopcategory-sort">
          <p className='sort-by'>Sort By : </p>
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>  
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price || item.price}
            old_price={item.old_price}
            source={all_products.includes(item) ? "all_products" : "productsData"}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
