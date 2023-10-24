import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { registerUser, loginUser, logoutUser, setError } = userSlice.actions;

export const registerUserAsync = (user) => async (dispatch) => {
  try {
    await AsyncStorage.setItem(user.username, JSON.stringify(user));
    dispatch(registerUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginUserAsync = (username, password) => async (dispatch) => {
  try {
    const userData = await AsyncStorage.getItem(username);
    const user = JSON.parse(userData);

    if (user && user.password === password) {
      dispatch(loginUser(user));
    } else {
      dispatch(setError('Incorrect username or password'));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default userSlice.reducer;
