import { CartItem } from '../../models/cart-item';

const ADD_TO_CART = 'RN-SHOP/CART-REDUCER/ADD-TO-CART';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
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
    default:
      return state;
  }
};

export default cartReducer;

// === ACTION CREATORS ===
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});
