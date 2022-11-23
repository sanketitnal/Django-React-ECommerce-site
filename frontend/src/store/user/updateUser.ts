import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserError, UserProfileDetails, ProcessState } from "./types";

export const updateUserThunk = createAsyncThunk(
    'user/update',
    async(userProfileDetails:UserProfileDetails, thunkAPI) => {
        try {
            /////
            const token = "";
            const url = "/api/user/update/";
            const options = {
                method: "POST",
                body: JSON.stringify({
                    firstName: userProfileDetails.firstName,
                    lastName: userProfileDetails.lastName
                }),
                headers: {
                    "Authorization": `Bearer ${userProfileDetails.token}`,
                    "Content-type": "application/json"
                }
            }
            let res:Response = await fetch(url, options);
            /////

            let updateResponse = await res.json();
            if(res.ok) {
                return updateResponse;
            } else {
                let detailOrMessage = null;
                if(updateResponse.detail) {
                    detailOrMessage = updateResponse.detail;
                } else if(updateResponse.message) {
                    detailOrMessage = updateResponse.message;
                }

                let loginErrorObj:UserError = {
                    status: res.status, 
                    message: (detailOrMessage || res.statusText),
                }
                return thunkAPI.rejectWithValue(loginErrorObj);
            }
        } catch(error:any) {
            let errorMessage = `
            Failed to update profile likely due to network error.
            Please try again after some time
            `
            return thunkAPI.rejectWithValue(new Error(errorMessage));
        }
    }
);

export const updateUserFulfilled = (state:any, action:any) => {
    let userInfo:User = state.userInfo;
    userInfo.firstName = action.payload.firstName;
    userInfo.lastName = action.payload.lastName;
    let updateSuccessProcessState:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.updateProcess = updateSuccessProcessState;
    state.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export const updateUserRejected = (state:any, action:any) => {
    let updateFailureProcessState:ProcessState = {
        loading: false,
        error: action.payload,
        success: false
    }
    state.updateProcess = updateFailureProcessState;
}

export const preUpdateAttemptSetupReducer = (state:any, action:any) => {
    let updateProcessState:ProcessState = {
        loading: true,
        error: null,
        success: null
    }
    state.updateProcess = updateProcessState;
}