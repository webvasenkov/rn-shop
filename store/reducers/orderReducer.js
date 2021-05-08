import { Order } from '../../models/order';

export const ADD_ORDER = 'RN-SHOP/ORDER-REDUCER/ADD-ORDER';

const initialState = {
  orders: [],
  totalAmount: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(Date.now().toString(), action.order.cartItems, action.order.totalAmount, new Date());

      return {
        ...state,
        orders: state.orders.concat(newOrder),
        totalAmount: state.totalAmount + action.order.totalAmount,
      };
    default:
      return state;
  }
};

export default orderReducer;

export const addOrder = (totalAmount, cartItems) => ({
  type: ADD_ORDER,
  order: { totalAmount, cartItems },
});
