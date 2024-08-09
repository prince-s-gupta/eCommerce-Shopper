import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AddedProducts.css";
import Card from "../Card/Card";
import EditProduct from "../Edit Product/EditProduct";


const AddedProducts = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const productsData = useSelector((state) => state.products.productsData);

  const handleEditClick = (id) => {
    if (productsData) {
      const productToEdit = productsData.find((product) => product.id === id);
      setEditingProduct(productToEdit);
    }
  };

  const handleCloseEditForm = () => {
    setEditingProduct(null);
  };

  return (
    <>
    <div className="product-user">
      <h1>User Added Products</h1>
    </div>
    <div className="product-list">
      {productsData.length > 0 ? (
        productsData.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.price}
            old_price={(product.price * 1.2).toFixed(2)}
            handleEditClick={handleEditClick}
          />
        ))
      ) : (
        <p className="product-notFound">No products found.</p>
      )}
      {editingProduct && (
        <EditProduct product={editingProduct} onClose={handleCloseEditForm} />
      )}
    </div>
    </>
  );
};

export default AddedProducts;
