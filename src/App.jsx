import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Banner from "./components/Assets/men_banner.jpg";
import AllProductBanner from "./components/Assets/allproductBanner.jpg"
import AddProduct from "./Pages/AddProduct";
import AddedProductDetail from "./components/User Product Details/AddedProductDetail";
import AllProducts from "./components/All Products/AllProducts";


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {" "}
          <Navbar /> <Outlet />{" "}
        </>
      ),
      children: [
        {
          path: "/",
          element: <Shop />,
        },
        {
          path: "/allproducts",
          element: <AllProducts banner={AllProductBanner} />,
        },
        {
          path: "/mens",
          element: <ShopCategory banner={Banner} category="men's clothing" />,
        },
        {
          path: "/womens",
          element: <ShopCategory banner={Banner} category="women's clothing" />,
        },
        {
          path: "/jwellery",
          element: <ShopCategory banner={Banner} category="jewelery" />,
        },
        {
          path: "/product/:productId", 
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/addproduct",
          element: <AddProduct />,
        },
        {
          path: "/addproduct/userproduct/:productId",
          element: <AddedProductDetail   />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
