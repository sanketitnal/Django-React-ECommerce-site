import { createSlice } from '@reduxjs/toolkit';

import { logoutUserReducer } from "./logoutUser";
import { saveUserReducer } from "./saveUser";
import { loginUserFulfilled, loginUserRejected, loginUserThunk, preLoginAttemptSetupReducer } from './loginUser';
import { registerUserFulfilled, registerUserThunk, registerUserRejected, preRegisterAttemptSetupReducer } from "./registerUser";
import { updateUserFulfilled, updateUserRejected, updateUserThunk, preUpdateAttemptSetupReducer } from './updateUser';
import { UserState } from "./types";

const initialState: UserState = {
    loginProcess: {
        loading: false,
        error: null,
        success: null
    },
    registerProcess: {
        loading: false,
        error: null,
        success: null
    },
    updateProcess: {
        loading: false,
        error: null,
        success: null
    },
    userInfo: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logoutUser: logoutUserReducer,
        preLoginAttemptSetup: preLoginAttemptSetupReducer,
        saveUser: saveUserReducer,
        preRegisterAttemptSetup: preRegisterAttemptSetupReducer,
        preUpdateAttempSetup: preUpdateAttemptSetupReducer
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUserThunk.fulfilled, loginUserFulfilled)
        .addCase(loginUserThunk.rejected, loginUserRejected)
        .addCase(registerUserThunk.fulfilled, registerUserFulfilled)
        .addCase(registerUserThunk.rejected, registerUserRejected)
        .addCase(updateUserThunk.fulfilled, updateUserFulfilled)
        .addCase(updateUserThunk.rejected, updateUserRejected)
    }
});

export const {

    logoutUser,
    preLoginAttemptSetup,
    saveUser,
    preRegisterAttemptSetup,
    preUpdateAttempSetup

} = userSlice.actions;
export default userSlice.reducer;