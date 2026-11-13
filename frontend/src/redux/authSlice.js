import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState = {
  token: savedToken || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    updateUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;