
// // // Without Persist
// import { configureStore} from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import cartReducer from '../Redux/CartSlice';
// import productReducer from "../Redux/productSlice"


// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);

// const store = configureStore({
//   reducer: {
//     cart: persistedReducer,
//     products : productReducer
//   },
// });

// const persistor = persistStore(store);

// export { store, persistor };


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../Redux/CartSlice';
import productReducer from '../Redux/productSlice';
import { combineReducers } from '@reduxjs/toolkit';

  
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };