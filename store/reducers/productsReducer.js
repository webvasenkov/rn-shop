import { PRODUCTS } from '../../data/dummy-data.js';
import { Product } from '../../models/product';

export const DELETE_PRODUCT = 'RN-SHOP/PRODUCTS-REDUCER/DELETE-PRODUCT';
const ADD_PRODUCT = 'RN-SHOP/PRODUCTS-REDUCER/ADD-PRODUCT';
const UPDATE_PRODUCT = 'RN-SHOP/PRODUCTS-REDUCER/UPDATE-PRODUCT';

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
    case ADD_PRODUCT: {
      const { title, description, imageUrl, price } = action.dataProduct;
      const newProduct = new Product(Date.now(), 'u1', title, imageUrl, description, price);
      return { ...state, all: [...state.all, newProduct], user: [...state.all, newProduct] };
    }
    case UPDATE_PRODUCT: {
      const productIndex = state.all.findIndex((product) => product.id === action.pid);
      const updateProduct = { ...state.all[productIndex], ...action.dataProduct };
      state.all[productIndex] = updateProduct;
      state.user[productIndex] = updateProduct;
      return { ...state, all: [...state.all], user: [...state.user] };
    }
    default:
      return state;
  }
};

export default productsReducer;

// === ACTION CREATORS ===
export const deleteProduct = (productId) => ({ type: DELETE_PRODUCT, pid: productId });
export const addProduct = (title, imageUrl, description, price) => ({
  type: ADD_PRODUCT,
  dataProduct: { title, imageUrl, description, price },
});
export const updateProduct = (productId, title, imageUrl, description) => ({
  type: UPDATE_PRODUCT,
  pid: productId,
  dataProduct: { title, imageUrl, description },
});
