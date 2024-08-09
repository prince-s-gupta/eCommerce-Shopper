import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BreadCum from "../components/BreadCums/BreadCum";
import ProductDisplay from "../components/Product Display/ProductDisplay";

const Product = () => {
  const { productId } = useParams();
  const all_products = useSelector((state) => state.cart.all_products);
  const product = all_products.find((e) => e.id === Number(productId));

  return (
    <div>
      <BreadCum product={product} />
      <ProductDisplay product={product} /> 
    </div>
  );
};

export default Product;
