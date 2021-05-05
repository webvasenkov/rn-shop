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
      const priceProduct = addedProduct.price;
      const titleProduct = addedProduct.price;
      let updateOrNewProduct;

      if (state.items[addedProduct.id]) {
        updateOrNewProduct = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          priceProduct,
          titleProduct,
          state.items[addedProduct.id].sum + priceProduct
        );
      } else {
        updateOrNewProduct = new CartItem(1, priceProduct, titleProduct, priceProduct);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewProduct },
        totalAmount: state.totalAmount + priceProduct,
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
