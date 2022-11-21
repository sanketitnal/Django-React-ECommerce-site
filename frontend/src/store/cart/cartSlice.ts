import { createSlice } from '@reduxjs/toolkit';
import { addToCartThunk, AddToCartFulfilled, AddToCartRejected, preAddToCartSetupReducer } from "./addToCart";
import { loadCartThunk, LoadCartFulfilled, LoadCartRejected, preLoadCartSetupReducer } from "./loadCart";
import { deleteItemInCartThink, DeleteItemInCartFulfilled, DeleteItemInCartRejected, preDeleteItemInCartSetupReducer } from "./deleteItemInCart";
import { updateItemQuantityThunk, UpdateItemQuantityFulfilled, UpdateItemQuantityRejected, preUpdateItemQuantitySetupReducer } from "./updateItemQuantity";

const initialState = {
    addtocartProcess: {
        loading: false,
        error: null,
        success: null
    },
    loadCartProcess: {
        loading: false,
        error: null,
        success: null
    },
    cartItems: null,
    cartItemsIsLoading: null,
    cartItemsError: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        preAddToCartSetup: preAddToCartSetupReducer,
        preLoadCartSetup :preLoadCartSetupReducer,
        preDeleteItemInCartSetup: preDeleteItemInCartSetupReducer,
        preUpdateItemQuantitySetup: preUpdateItemQuantitySetupReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartThunk.fulfilled, AddToCartFulfilled)
            .addCase(addToCartThunk.rejected, AddToCartRejected)
            .addCase(loadCartThunk.fulfilled, LoadCartFulfilled)
            .addCase(loadCartThunk.rejected, LoadCartRejected)
            .addCase(deleteItemInCartThink.fulfilled, DeleteItemInCartFulfilled)
            .addCase(deleteItemInCartThink.rejected, DeleteItemInCartRejected)
            .addCase(updateItemQuantityThunk.fulfilled, UpdateItemQuantityFulfilled)
            .addCase(updateItemQuantityThunk.rejected, UpdateItemQuantityRejected)
    }
});

export const {
    preAddToCartSetup,
    preLoadCartSetup,
    preDeleteItemInCartSetup,
    preUpdateItemQuantitySetup
} = cartSlice.actions;

export default cartSlice.reducer;