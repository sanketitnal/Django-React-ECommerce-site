import { UserState } from "./types";

export const saveUserReducer = (state:any, action:any) => {
    let userInfo:UserState = action.payload;
    if(userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    state.isLoggedIn = true;
    state.loginError = false;
    state.error = null;
    state.user = userInfo;
    state.loading = false;
}