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
    const existingUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];
    existingUsers.push(user);
    // Add the new user to the existing users array.
    await AsyncStorage.setItem(user.username, JSON.stringify(user));
    await AsyncStorage.setItem("users", JSON.stringify(existingUsers));
    dispatch(registerUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginUserAsync = (user) => async (dispatch) => {
  try {
    dispatch(loginUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default userSlice.reducer;
