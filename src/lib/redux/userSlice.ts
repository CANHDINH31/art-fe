import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null as {
    favourite: any[];
    cart: any[];
  } | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },

    favourite: (state, action) => {
      if (state.user) {
        const index = state.user?.favourite.findIndex(
          (item: any) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.user?.favourite.splice(index, 1);
        } else {
          state.user?.favourite.push(action.payload);
        }
      }
    },

    addToCart: (state, action) => {
      console.log(action.payload, "payload");
    },
  },
});

export const { login, logout, favourite, addToCart } = userSlice.actions;

export default userSlice.reducer;
