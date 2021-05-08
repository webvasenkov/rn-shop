import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
