import { PRODUCTS } from '../../data/dummy-data.js';

const initialState = {
  all: PRODUCTS,
  user: PRODUCTS.filter(({ ownerId }) => ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  return state;
};

export default productsReducer;
