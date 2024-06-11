// Redux: store.js
import { configureStore } from '@reduxjs/toolkit'; 
import modalReducer from './reducers';

const rootReducer = {
  modal: modalReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;