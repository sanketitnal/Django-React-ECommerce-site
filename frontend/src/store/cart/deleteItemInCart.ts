import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcessState } from './types';

interface Details {
    productId: number,
    token: null | string
}

export const deleteItemInCartThink = createAsyncThunk(
    'cart/delete',
    async(details:Details, thunkAPI) => {
        try {
            const url = "/api/cart/delete/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    productId: details.productId
                }),
                headers: {
                    "Authorization": `Bearer ${details.token}`,
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            let response = await res.json();

            if(res.ok) {
                response.productId = details.productId;
                return response;
            } else {
                let detailOrMessage = null;
                if(response.detail) {
                    detailOrMessage = response.detail;
                } else if(response.message) {
                    detailOrMessage = response.message;
                }

                let errObj:any = {
                    status: res.status, 
                    message: res.status==401 ? "User lacks valid authentication credentials. Please login" : (detailOrMessage || res.statusText),
                }
                return thunkAPI.rejectWithValue({
                    productId: details.productId,
                    error: errObj
                });
            }
        } catch(error:any) {
            let errorMessage = `
                Failed to delete item likely due to network error.
                Please try again after some time
            `
            return thunkAPI.rejectWithValue({
                    productId: details.productId,
                    error: new Error(errorMessage)
                });
        }
    }
);

export const DeleteItemInCartFulfilled = (state:any, action:any) => {
    /**
     * action.payload = {
     *      productId: number,
     * }
     */
    state.cartItemsIsLoading[action.payload.productId] = false;
    state.cartItemsError[action.payload.productId] = null;
    for(let item of state.cartItems) {
        item.product._id;
    }
    state.cartItems = state.cartItems.filter((item:any) => item.product._id !== action.payload.productId);
}

export const DeleteItemInCartRejected = (state:any, action:any) => {
    state.cartItemsIsLoading[action.payload.productId] = false;
    /**
     * action.payload = {
     *      productId: number,
     *      error: Error
     * }
     */
    state.cartItemsError[action.payload.productId] = action.payload.error.message;
}

export const preDeleteItemInCartSetupReducer = (state:any, action:any) => {
    /**
     * action.payload {
     *      productId: number
     * }
     */
    state.cartItemsIsLoading[action.payload.productId] = true;
    state.cartItemsError[action.payload.productId] = null;
}