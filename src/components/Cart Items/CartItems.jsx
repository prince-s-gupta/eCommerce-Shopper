import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartItems.css";
import remove from "../Assets/removeicon.png";
import {
  removeFromCart,
  getTotalCartAmount,
  decreaseQuantity,
  increaseQuantity,
  updateQuantity,
} from "../../Redux/CartSlice";

const CartItems = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const all_products = useSelector((state) => state.cart.all_products);
  const productsData = useSelector((state) => state.products.productsData);

  const allProducts = useMemo(() => {
    return [
      ...all_products,
      ...productsData.map(product => ({
        ...product,
        new_price: product.price,
      })),
    ];
  }, [all_products, productsData]);
  

  const placeOrder = () => {
    if (Object.keys(cartItems).some((productId) => cartItems[productId] > 0)) {
      Object.keys(cartItems).forEach((productId) => {
        const quantity = cartItems[productId];
        for (let i = 0; i < quantity; i++) {
          dispatch(removeFromCart(productId));
        }
      });
      setOrderPlaced(true);
    } else {
      alert("Cart is empty. Cannot place an order.");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const validQuantity = Math.max(1, parseInt(newQuantity, 10) || 0);
    dispatch(updateQuantity({ productId, newQuantity: validQuantity }));
  };

  const totalCartAmount = useSelector(getTotalCartAmount);

  return (
    <div className="cartItems">
      <div className="classItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProducts.map((product) => {
        console.log(product)
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartItems-format classItems-format-main">
                <img src={product.image} alt="" className="cartIcon-product-icon" />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <div className="cartItems-quantity">
                  <button
                    onClick={() => dispatch(increaseQuantity(product.id))}
                    className="icartItems-quantity"
                  >
                    +
                  </button>
                  <input
                    type="number"
                    value={cartItems[product.id]}
                    onChange={(event) =>
                      handleQuantityChange(product.id, event.target.value)
                    }
                    className="cartItems-quantity"
                    min="0"
                  />
                  <button
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                    className="decreaseSpan"
                  >
                    -
                  </button>
                </div>

                <p>${product.new_price * cartItems[product.id]}</p>
                <img
                  src={remove}
                  alt=""
                  className="cartitems-removeicon"
                  onClick={() => dispatch(removeFromCart(product.id))}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>SubTotal</p>
              <p>${totalCartAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalCartAmount}</h3>
            </div>
          </div>
          {orderPlaced ? (
            <p className="cartItems-orderPlaced">
              Your order has been successfully placed!
            </p>
          ) : (
            <button onClick={placeOrder}>Place Order</button>
          )}
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code , Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter PromoCode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
