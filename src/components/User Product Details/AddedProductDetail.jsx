import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDisplay from "../User Product Display/UserDisplay"
import "./AddedProductDetail.css"

const AddedProductDetail = () => {
  const { productId } = useParams();
  const productsData = useSelector((state) => state.products.productsData);
  const product = productsData.find((product) => product.id === productId);
  

  return (
    <div className='product-display'>
      {product ? <UserDisplay product={product} /> : <div>Product not found</div>}
    </div>
  );
};

export default AddedProductDetail;
