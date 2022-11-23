import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcessState } from './types';

interface OrderDetails {
    productId: string,
    orderQuantity: number,
    token: string | null
}

export const addToCartThunk = createAsyncThunk(
    'cart/add',
    async(orderDetail:OrderDetails, thunkAPI) => {
        try {
            const url = "/api/cart/add/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    productId: orderDetail.productId,
                    orderQuantity: orderDetail.orderQuantity
                }),
                headers: {
                    "Authorization": `Bearer ${orderDetail.token}`,
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            let addToCartResponse = await res.json();

            if(res.ok) {
                return addToCartResponse;
            } else {
                let detailOrMessage = null;
                if(addToCartResponse.detail) {
                    detailOrMessage = addToCartResponse.detail;
                } else if(addToCartResponse.message) {
                    detailOrMessage = addToCartResponse.message;
                }

                let addToCartErrorObj:any = {
                    status: res.status, 
                    message: res.status==401 ? "User lacks valid authentication credentials. Please login" : (detailOrMessage || res.statusText),
                }
                return thunkAPI.rejectWithValue(addToCartErrorObj);
            }

        } catch(error:any) {
            let errorMessage = `
                Failed to complete AddToCart request likely due to network error.
                Please try again after some time
            `
            return thunkAPI.rejectWithValue(new Error(errorMessage));
        }
    }
);

export const AddToCartFulfilled = (state:any, action:any) => {
    let addtocartProcess:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.addtocartProcess = addtocartProcess;
}

export const AddToCartRejected = (state:any, action:any) => {
    let addtocartProcess:ProcessState = {
        loading: false,
        error: action.payload,
        success: false
    }
    state.addtocartProcess = addtocartProcess;
}

export const preAddToCartSetupReducer = (state:any, action:any) => {    
    let addtocartProcess:ProcessState = {
        loading: true,
        error: null,
        success: null
    }
    state.addtocartProcess = addtocartProcess;
}