import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
