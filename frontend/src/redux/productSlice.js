import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setData: (state, action) => {
      console.log(action)
      state.productList = [...action.payload];
    },
    addCartItems: (state, action) => {
      // console.log(action.payload);
      const total = action.payload.price;
      state.cartItem = [
        ...state.cartItem,
        { ...action.payload, qty: 1, total },
      ];
      // console.log(action.payload)
    },
    deleteCartItem: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItem.splice(index, 1);
      toast('One item removed from cart');
    },

    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );

      if (index !== -1) {
        const item = state.cartItem[index];
        const availability = item.availability || 999;

        if (item.qty < availability) {
          state.cartItem[index].qty += 1;
        } else {
          toast(
            `Cannot increase quantity beyond availability (${availability})`
          );
        }
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        const qty = state.cartItem[index].qty;
        if (qty > 0) {
          state.cartItem[index].qty -= 1;
        }
      }
    },
  },
});

export const { setData, addCartItems, deleteCartItem,increaseQty,decreaseQty } = productSlice.actions;
export default productSlice.reducer;
