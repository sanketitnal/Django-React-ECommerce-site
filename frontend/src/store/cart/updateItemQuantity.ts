import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcessState } from './types';

interface Detail {
    productId: number,
    newQuantity: number,
    token: string | null
}

export const updateItemQuantityThunk = createAsyncThunk(
    'cart/updateitem',
    async(detail:Detail, thunkAPI) => {
        console.log("Here");
        try {
            const url = "http://localhost:8000/api/cart/update/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    productId: detail.productId,
                    newQuantity: detail.newQuantity,
                }),
                headers: {
                    "Authorization": `Bearer ${detail.token}`,
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            let response = await res.json();

            if(res.ok) {
                response.productId = detail.productId;
                response.newQuantity = detail.newQuantity;
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
                    error: errObj,
                    productId: detail.productId,
                });
            }
        } catch(error:any) {
            let errorMessage = `
                Failed to update quantity likely due to network error.
                Please try again after some time
            `
            return thunkAPI.rejectWithValue({
                productId: detail.productId,
                error: new Error(errorMessage)
            });
        }
    }
);

export const UpdateItemQuantityFulfilled = (state:any, action:any) => {
    /**
     * action.payload = {
     *      productId: number,
     *      newQuantity: number
     * }
     */
    for(let item of state.cartItems) {
        if(item.product._id == action.payload.productId) {
            item.quantity = action.payload.newQuantity;
            break;
        }
    }
    state.cartItemsIsLoading[action.payload.productId] = false;
    state.cartItemsError[action.payload.productId] = null;
}

export const UpdateItemQuantityRejected = (state:any, action:any) => {
    state.cartItemsIsLoading[action.payload.productId] = false;
    /**
     * action.payload = {
     *      productId: number,
     *      error: Error
     * }
     */
    state.cartItemsError[action.payload.productId] = action.payload.error.message;
}

export const preUpdateItemQuantitySetupReducer = (state:any, action:any) => {
    /**
     * action.payload {
     *      productId: number
     * }
     */
    state.cartItemsIsLoading[action.payload.productId] = true;
    state.cartItemsError[action.payload.productId] = null;
}