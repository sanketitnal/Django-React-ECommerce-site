import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProcessState } from './types';

interface User {
    token: string | null
}

export const loadCartThunk = createAsyncThunk(
    'cart/load',
    async(userDetails:User, thunkAPI) => {
        try {
            const url = "/api/cart/get/";
            const options = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userDetails.token}`,
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            let response = await res.json();

            if(res.ok) {
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
                return thunkAPI.rejectWithValue(errObj);
            }
        } catch(error:any) {
            let errorMessage = `
                Failed to complete loading the cart likely due to network error.
                Please try again after some time
            `
            return thunkAPI.rejectWithValue(new Error(errorMessage));
        }
    }
);

export const LoadCartFulfilled = (state:any, action:any) => {
    let loadCartProcess:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.loadCartProcess = loadCartProcess;
    state.cartItems = action.payload;
    
    let loadingInitState:any = {};
    for(let item of state.cartItems) {
        loadingInitState[item.product._id] = false;
    }
    state.cartItemsIsLoading = loadingInitState;
    state.cartItemsError = loadingInitState;
}

export const LoadCartRejected = (state:any, action:any) => {
    let loadCartProcess:ProcessState = {
        loading: false,
        error: action.payload,
        success: false
    }
    state.loadCartProcess = loadCartProcess;
}

export const preLoadCartSetupReducer = (state:any, action:any) => {    
    let loadCartProcess:ProcessState = {
        loading: true,
        error: null,
        success: null
    }
    state.loadCartProcess = loadCartProcess;
    state.cartItems = null,
    state.cartItemsCache = null,
    state.cartItemsError = null
}