import { PRODUCTS } from '../../data/dummy-data.js';

export const DELETE_PRODUCT = 'RN-SHOP/PRODUCTS-REDUCER/DELETE-PRODUCT';

const initialState = {
  all: PRODUCTS,
  user: PRODUCTS.filter(({ ownerId }) => ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const filterProducts = (arr) => arr.filter((product) => product.id !== action.pid);
      return { ...state, all: filterProducts(state.all), user: filterProducts(state.user) };
    }
    default:
      return state;
  }
};

export default productsReducer;

// === ACTION CREATORS ===
export const deleteProduct = (productId) => ({ type: DELETE_PRODUCT, pid: productId });
