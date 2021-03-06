import { CartItem } from '../../models/cart-item';
import { ADD_ORDER } from './orderReducer';
import { DELETE_PRODUCT } from './productsReducer';

const ADD_TO_CART = 'rn-shop/card-reducer/ADD-TO-CART';
const REMOVE_FROM_CART = 'rn-shop/cart-reducer/REMOVE-FROM-CART';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, price, title } = action.product;
      let updateOrNewProduct;

      if (state.items[id]) {
        const { quantity, priceProduct, titleProduct, sum } = state.items[id];
        updateOrNewProduct = new CartItem(quantity + 1, priceProduct, titleProduct, sum + price);
      } else {
        updateOrNewProduct = new CartItem(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [id]: updateOrNewProduct },
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
