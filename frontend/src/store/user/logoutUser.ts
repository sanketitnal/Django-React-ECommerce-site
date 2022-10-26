import { ProcessState } from "./types";

export const logoutUserReducer = (state:any) => {
    let userInfo = localStorage.getItem("userInfo");
    if(userInfo) {
        localStorage.removeItem("userInfo");
    }
    let loggedOutUserProcessState:ProcessState = {
        loading: false,
        error: null,
        success: true
    }
    state.loginProcess = loggedOutUserProcessState;
    state.userInfo = null;
}