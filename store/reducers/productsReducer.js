import { PRODUCTS } from '../../data/dummy-data.js';
import { Product } from '../../models/product';

const SET_PRODUCTS = 'rn-shop/products-reducer/SET_PRODUCTS';
export const DELETE_PRODUCT = 'rn-shop/products-reducer/DELETE_PRODUCT';
const ADD_PRODUCT = 'rn-shop/products-reducer/ADD_PRODUCT';
const UPDATE_PRODUCT = 'rn-shop/products-reducer/UPDATE_PRODUCT';

const initialState = {
  all: PRODUCTS,
  user: PRODUCTS.filter(({ ownerId }) => ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, all: action.products, user: action.products.filter(({ ownerId }) => ownerId === 'u1') };
    case DELETE_PRODUCT: {
      const filterProducts = (arr) => arr.filter((product) => product.id !== action.pid);
      return { ...state, all: filterProducts(state.all), user: filterProducts(state.user) };
    }
    case ADD_PRODUCT: {
      const { id, title, description, imageUrl, price } = action.dataProduct;
      const newProduct = new Product(id, 'u1', title, imageUrl, description, price);
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

// Action Creators
const setProductsAC = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const addProductAC = (dataProduct) => ({
  type: ADD_PRODUCT,
  dataProduct,
});

const deleteProductAC = (productId) => ({ type: DELETE_PRODUCT, pid: productId });

const updateProductAC = (productId, dataProduct) => ({
  type: UPDATE_PRODUCT,
  pid: productId,
  dataProduct,
});

// Thunks
export const setProducts = () => async (dispatch) => {
  try {
    const response = await fetch('https://rn-shop-95f98-default-rtdb.firebaseio.com/products.json');
    const products = await response.json();

    const normalizeProducts = Object.keys(products).map((key) => {
      const { title, imageUrl, description, price } = products[key];
      return new Product(key, 'u1', title, imageUrl, description, price);
    });

    dispatch(setProductsAC(normalizeProducts));
  } catch (err) {
    throw err;
  }
};

export const addProduct = (title, imageUrl, description, price) => async (dispatch) => {
  const dataProduct = { title, imageUrl, description, price };

  const response = await fetch('https://rn-shop-95f98-default-rtdb.firebaseio.com/products.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataProduct),
  });

  const { name } = await response.json();

  dispatch(addProductAC({ id: name, ...dataProduct }));
};

export const updateProduct = (productId, title, imageUrl, description) => async (dispatch) => {
  const dataProduct = { title, imageUrl, description };
  const response = await fetch(`https://rn-shop-95f98-default-rtdb.firebaseio.com/products/${productId}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataProduct),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  dispatch(updateProductAC(productId, dataProduct));
};

export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`https://rn-shop-95f98-default-rtdb.firebaseio.com/products/${productId}.json`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Something went wrong!');
  dispatch(deleteProductAC(productId));
};
