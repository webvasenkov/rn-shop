import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(ReduxThunk)));
