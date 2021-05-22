import { PRODUCTS } from '../../data/dummy-data.js';
import { Product } from '../../models/product';

const SET_PRODUCTS = 'rn-shop/products-reducer/SET_PRODUCTS';
export const DELETE_PRODUCT = 'rn-shop/products-reducer/DELETE_PRODUCT';
const ADD_PRODUCT = 'rn-shop/products-reducer/ADD_PRODUCT';
const UPDATE_PRODUCT = 'rn-shop/products-reducer/UPDATE_PRODUCT';

const initialState = {
  all: [],
  user: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, all: action.products, user: action.userProducts };
    case DELETE_PRODUCT: {
      const filterProducts = (arr) => arr.filter((product) => product.id !== action.pid);
      return { ...state, all: filterProducts(state.all), user: filterProducts(state.user) };
    }
    case ADD_PRODUCT: {
      const { ownerId, id, title, description, imageUrl, price } = action.dataProduct;
      const newProduct = new Product(id, ownerId, title, imageUrl, description, price);
      return { all: [...state.all, newProduct], user: [...state.user, newProduct] };
    }
    case UPDATE_PRODUCT: {
      const getIndex = (array) => array.findIndex((product) => product.id === action.pid);
      const productIndexAll = getIndex(state.all);
      const productIndexUser = getIndex(state.user);
      const updateProduct = { ...state.all[productIndexAll], ...action.dataProduct };
      state.all[productIndexAll] = updateProduct;
      state.user[productIndexUser] = updateProduct;
      return { all: [...state.all], user: [...state.user] };
    }
    default:
      return state;
  }
};

export default productsReducer;

// Action Creators
const setProductsAC = (products, userProducts) => ({
  type: SET_PRODUCTS,
  products,
  userProducts,
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
export const setProducts = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  try {
    const response = await fetch('https://rn-shop-95f98-default-rtdb.firebaseio.com/products.json');
    const productsData = await response.json();

    const products = Object.keys(productsData).map((key) => {
      const { title, ownerId, imageUrl, description, price } = productsData[key];
      return new Product(key, ownerId, title, imageUrl, description, price);
    });

    const userProducts = products.filter((product) => product.ownerId === userId);
    dispatch(setProductsAC(products, userProducts));
  } catch (err) {
    throw err;
  }
};

export const addProduct = (title, imageUrl, description, price) => async (dispatch, getState) => {
  const { token, userId } = getState().auth;
  const dataProduct = { ownerId: userId, title, imageUrl, description, price };
  try {
    const response = await fetch(`https://rn-shop-95f98-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataProduct),
    });
    const { name } = await response.json();
    dispatch(addProductAC({ id: name, ...dataProduct }));
  } catch (err) {
    throw err;
  }
};

export const updateProduct = (productId, title, imageUrl, description) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const dataProduct = { title, imageUrl, description };
  const response = await fetch(
    `https://rn-shop-95f98-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataProduct),
    }
  );

  if (!response.ok) throw new Error('Something went wrong!');
  dispatch(updateProductAC(productId, dataProduct));
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-95f98-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) throw new Error('Something went wrong!');
  dispatch(deleteProductAC(productId));
};
