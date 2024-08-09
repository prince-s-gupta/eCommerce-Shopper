import { createSlice } from "@reduxjs/toolkit";
import all_products from "../components/Assets/allPRoducts";

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_products.length + 1; index++) {
    cart[index] = 0;
    console.log(all_products)
  }
  return cart;
};

const initialState = {
  cartItems: getDefaultCart(),
  all_products,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const itemId = action.payload;
    //   if (state.cartItems[itemId] === undefined) {
    //     state.cartItems[itemId] = 0;
    //   }
    //   state.cartItems[itemId] += 1;
    //   console.log(itemId)
    // },
    addToCart: (state, action) => {
      let itemId;
    
      // Check if action.payload is an object and has an id property
      if (typeof action.payload === 'object' && action.payload !== null && 'id' in action.payload) {
        // Destructure id from action.payload
        itemId = action.payload.id;
      } else {
        // If action.payload is not an object with an id, use it directly
        itemId = action.payload;
      }
    
      // Check if the item is already in the cart
      if (state.cartItems[itemId] === undefined) {
        state.cartItems[itemId] = 0;
      }
    
      // Increment the quantity of the item in the cart
      state.cartItems[itemId] += 1;
    
      // Log the itemId to the console
      console.log(itemId);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] !== undefined) {
        delete state.cartItems[itemId];
      }
    },  
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      state.cartItems[productId] += 1;
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      if (state.cartItems[productId] > 1) {
        state.cartItems[productId] -= 1;
      }
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      state.cartItems[productId] = newQuantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} = cartSlice.actions;

export const getTotalCartAmount = (state) => {
  let totalAmount = 0;
  for (const item in state.cart.cartItems) {
    if (state.cart.cartItems[item] > 0) {
      const itemInfo = state.cart.all_products.find(
        (product) => product.id === Number(item)
      );
      if (itemInfo) {
        totalAmount += itemInfo.new_price * state.cart.cartItems[item];
      } else {
        const userProduct = state.products.productsData.find(
          (product) => product.id === item
        );
        if (userProduct) {
          totalAmount += userProduct.price * state.cart.cartItems[item];
        }
      }
    }
  }
  return totalAmount;
};

export const getTotalCartItems = (state) => {
  const cartState = state.cart;
  if (!cartState) {
    return 0;
  }
  let totalItems = 0;
  for (const item in cartState.cartItems) {
    if (cartState.cartItems[item] > 0) {
      totalItems += cartState.cartItems[item];
    }
  }
  return totalItems;
};


export default cartSlice.reducer;
