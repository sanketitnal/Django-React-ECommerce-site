import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserError, UserState, UserLoginDetails, ProcessState } from "./types";

export const loginUserThunk = createAsyncThunk(
    'user/login',
    async(userLoginDetails:UserLoginDetails, thunkAPI) => {
        try {
            /////
            const url = "http://localhost:8000/api/user/login/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    username: userLoginDetails.username,
                    password: userLoginDetails.password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            /////

            let loginResponse = await res.json();
            if(res.ok) {
                return loginResponse;
            } else {
                let detailOrMessage = null;
                if(loginResponse.detail) {
                    detailOrMessage = loginResponse.detail;
                } else if(loginResponse.message) {
                    detailOrMessage = loginResponse.message;
                }

                let loginErrorObj:UserError = {
                    status: res.status, 
                    message: (detailOrMessage || res.statusText),
                }
                return thunkAPI.rejectWithValue(loginErrorObj);
            }
        } catch(error:any) {
            let errorMessage = `
            Failed to complete login request likely due to network error.
            Please try again after some time
            `
            return thunkAPI.rejectWithValue(new Error(errorMessage));
        }
    }
);

export const loginUserFulfilled = (state:any, action:any) => {
    let userInfo:User = action.payload;
    let loginSuccessProcessState:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.loginProcess = loginSuccessProcessState;
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
}

export const loginUserRejected = (state:any, action:any) => {
    let loginFailureProcessState:ProcessState = {
        loading: false,
        error: action.payload,
        success: false
    }
    state.loginProcess = loginFailureProcessState;
}

export const preLoginAttemptSetupReducer = (state:any, action:any) => {
    let loginProcessState:ProcessState = {
        loading: true,
        error: null,
        success: null
    }
    state.loginProcess = loginProcessState;
}