import React, { useState } from "react";
import "./AllProducts.css";
import { useSelector } from "react-redux";
import Item from "../Item/Item";
import Pagination from "../Pagination/Pagination";

const AllProducts = ({ banner }) => {
  const all_products = useSelector((state) => state.cart.all_products);
  const productsData = useSelector((state) => state.products.productsData);
  const combinedProducts = [...all_products, ...productsData];
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 10;

  const sortedProducts = [...combinedProducts].sort((a, b) => {
    if (sortOption === "price-asc") {
      return (a.new_price || a.price) - (b.new_price || b.price);
    } else if (sortOption === "price-desc") {
      return (b.new_price || b.price) - (a.new_price || a.price);
    }
    return 0;
  });

  const pageCount = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const endIdx = (currentPage + 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIdx, endIdx);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="all-products">
      <img src={banner} alt="" />
      <div className="all-products-toolbar">
        <div className="sort-dropdown">
          <label>Sort By:</label>
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="all-products-list">
        {currentProducts.map((item, i) => (
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
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
};

export default AllProducts;
