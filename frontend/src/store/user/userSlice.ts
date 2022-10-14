import { createSlice } from '@reduxjs/toolkit';

import { logoutUserReducer } from "./logoutUser";
import { saveUserReducer } from "./saveUser";
import { loginUserFulfilled, loginUserRejected, loginUserThunk, preLoginAttemptSetupReducer } from './loginUser';
import { registerUserFulfilled, registerUserThunk, registerUserRejected, preRegisterAttemptSetupReducer } from "./registerUser";
import { UserState } from "./types";

const initialState: UserState = {
    loginProcess: {
        loading: false,
        error: null
    },
    registerProcess: {
        loading: false,
        error: null
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUserThunk.fulfilled, loginUserFulfilled)
        .addCase(loginUserThunk.rejected, loginUserRejected)
        .addCase(registerUserThunk.fulfilled, registerUserFulfilled)
        .addCase(registerUserThunk.rejected, registerUserRejected)
    }
});

export const {

    logoutUser,
    preLoginAttemptSetup,
    saveUser,
    preRegisterAttemptSetup

} = userSlice.actions;
export default userSlice.reducer;