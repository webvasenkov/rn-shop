import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH = 'rn-shop/auth-reducer/AUTH';
const LOGOUT = 'rn-shop/auth-reducer/LOGOUT';
let timer;

const initialState = {
  userId: '',
  token: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { userId: action.userId, token: action.token };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

// Action Creators
export const authAC = (userId, token) => ({ type: AUTH, userId, token });
export const logoutAC = () => {
  clearTimeout(timer);
  AsyncStorage.removeItem('authData');
  return { type: LOGOUT };
};

// Thunks
const setLogoutTimer = (expiresTime) => (dispatch) => {
  console.log(expiresTime);
  timer = setTimeout(() => dispatch(logoutAC()), expiresTime);
};

export const auth = (email, password, type) => async (dispatch) => {
  let mode;

  if (type === 'signup') mode = 'signUp';
  else if (type === 'login') mode = 'signInWithPassword';
  else throw new Error('Something went wrong!');

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyAvq0wGUyCKX_KwTSJ4FrtxxHbAtj1mwfg`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const authData = await response.json();

  if (!response.ok) {
    const { error } = await response.json();
    let message = 'Something went wrong!';
    if (error.message === 'EMAIL_NOT_FOUND') message = 'This email could not be found!';
    if (error.message === 'INVALID_PASSWORD') message = 'This password is not valid!';
    if (error.message === 'EMAIL_EXISTS') message = 'This email already exist!';
    throw new Error(message);
  }

  dispatch(authAC(authData.localId, authData.idToken));
  const expiresDate = new Date(Date.now() + parseInt(authData.expiresIn)).toISOString();
  dispatch(setLogoutTimer(parseInt(authData.expiresIn) * 1000));

  AsyncStorage.setItem(
    'authData',
    JSON.stringify({
      userId: authData.localId,
      token: authData.idToken,
      expiresDate,
    })
  );
};
