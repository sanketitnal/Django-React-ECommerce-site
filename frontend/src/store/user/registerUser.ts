import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserError, UserState, UserRegisterDetails, ProcessState } from "./types";

export const registerUserThunk = createAsyncThunk(
    'user/register',
    async(userRegisterDetails:UserRegisterDetails, thunkAPI) => {
        try {
            /////
            const url = "http://localhost:8000/api/user/register/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    email: userRegisterDetails.email,
                    password: userRegisterDetails.password,
                    firstName: userRegisterDetails.firstName,
                    lastName: userRegisterDetails.lastName
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            /////

            let registerResponse = await res.json();
            if(res.ok) {
                return registerResponse;
            } else {
                let detailOrMessage = null;
                if(registerResponse.detail) {
                    detailOrMessage = registerResponse.detail;
                } else if(registerResponse.message) {
                    detailOrMessage = registerResponse.message;
                }
                
                let loginErrorObj:UserError = {
                    status: res.status, 
                    message: (detailOrMessage || res.statusText),
                }
                return thunkAPI.rejectWithValue(loginErrorObj);
            }
        } catch(error:any) {
            let errorMessage = `
            Failed to complete registration request likely due to network error.
            Please try again after some time
            `
            return thunkAPI.rejectWithValue(new Error(errorMessage));
        }
    }
);

export const registerUserFulfilled = (state:any, action:any) => {
    let userInfo:User = action.payload;
    let registrationSuccessProcessState:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.registerProcess = registrationSuccessProcessState;
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
}

export const registerUserRejected = (state:any, action:any) => {
    let registrationFailureProcessState:ProcessState = {
        loading: false,
        error: action.payload,
        success: false
    }
    state.registerProcess = registrationFailureProcessState;
}

export const preRegisterAttemptSetupReducer = (state:any) => {
    let preregistrationProcessState:ProcessState = {
        loading: true,
        error: null,
        success: null
    }
    state.registerProcess = preregistrationProcessState;
}