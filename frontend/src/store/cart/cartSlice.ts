import { createSlice } from '@reduxjs/toolkit';
import { addToCartThunk, AddToCartFulfilled, AddToCartRejected, preAddToCartSetupReducer } from "./addToCart";

const initialState = {
    addtocartProcess: {
        loading: false,
        error: null,
        success: null
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        preAddToCartSetup: preAddToCartSetupReducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartThunk.fulfilled, AddToCartFulfilled)
            .addCase(addToCartThunk.rejected, AddToCartRejected)
    }
});

export const {
    preAddToCartSetup
} = cartSlice.actions;

export default cartSlice.reducer;