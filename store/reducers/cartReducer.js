import { CartItem } from '../../models/cart-item';
import { ADD_ORDER } from './orderReducer';
import { DELETE_PRODUCT } from './productsReducer';

const ADD_TO_CART = 'RN-SHOP/CART-REDUCER/ADD-TO-CART';
const REMOVE_FROM_CART = 'RN-SHOP/CART-REDUCER/REMOVE-FROM-CART';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const { price, title } = addedProduct;
      let updateOrNewProduct;
      if (state.items[addedProduct.id]) {
        const { quantity, priceProduct, titleProduct, sum } = state.items[addedProduct.id];
        updateOrNewProduct = new CartItem(quantity + 1, priceProduct, titleProduct, sum + price);
      } else {
        updateOrNewProduct = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewProduct },
        totalAmount: state.totalAmount + price,
      };
    }
    case REMOVE_FROM_CART: {
      const currentItem = state.items[action.pid];
      let updatedItems;
      if (currentItem && currentItem.quantity > 1) {
        const updateItem = {
          ...currentItem,
          quantity: currentItem.quantity - 1,
          sum: currentItem.sum - currentItem.priceProduct,
        };
        updatedItems = { ...state.items, [action.pid]: updateItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.pid];
      }
      return { ...state, items: updatedItems, totalAmount: state.totalAmount - currentItem.priceProduct };
    }
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT: {
      const currentItem = state.items[action.pid];
      if (!currentItem) return state;
      const updatedItems = { ...state.items };
      delete updatedItems[action.pid];
      return { ...state, items: updatedItems, totalAmount: state.totalAmount - currentItem.sum };
    }
    default:
      return state;
  }
};

export default cartReducer;

// === ACTION CREATORS ===
export const addToCart = (product) => ({ type: ADD_TO_CART, product });
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, pid: productId });
