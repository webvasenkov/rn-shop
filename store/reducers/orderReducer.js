import { Order } from '../../models/order';

const SET_ORDERS = 'rn-shop/order-reducer/SET_ORDERS';
export const ADD_ORDER = 'rn-shop/order-reducer/ADD_ORDER';

const initialState = {
  orders: [],
  totalAmount: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case ADD_ORDER: {
      const { id, items, totalAmount, date } = action.order;
      const newOrder = new Order(id, items, totalAmount, date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        totalAmount: state.totalAmount + totalAmount,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;

// Action Creators
const setOrdersAC = (orders) => ({ type: SET_ORDERS, orders });
const addOrderAC = (order) => ({ type: ADD_ORDER, order });

// Thunks
export const setOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  try {
    const response = await fetch(`https://rn-shop-95f98-default-rtdb.firebaseio.com/orders/${userId}.json`);
    const ordersData = await response.json();

    const orders = Object.keys(ordersData).map((key) => {
      const { items, totalAmount, date } = ordersData[key];
      return new Order(key, items, totalAmount, new Date(date));
    });

    dispatch(setOrdersAC(orders));
  } catch (err) {
    throw err;
  }
};

export const addOrder = (totalAmount, items) => async (dispatch, getState) => {
  const { token, userId } = getState().auth;
  const date = new Date();
  const orderData = { totalAmount, items, date };

  const response = await fetch(
    `https://rn-shop-95f98-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...orderData, date: date.toISOString() }),
    }
  );

  if (!response.ok) throw new Error('Something went wrong!');

  const { name: id } = await response.json();
  dispatch(addOrderAC({ id, ...orderData }));
};
