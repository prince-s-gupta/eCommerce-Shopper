import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: nanoid(),
      };
      state.productsData.push(newProduct);
    },
    updateFormData: (state, action) => {
      const { id, updatedData } = action.payload;
      const product = state.productsData.find((product) => product.id === id);
    
      if (product) {
        Object.assign(product, updatedData);
      }
    }
  },
});

export const { addFormData, updateFormData } = productSlice.actions;
export default productSlice.reducer;
