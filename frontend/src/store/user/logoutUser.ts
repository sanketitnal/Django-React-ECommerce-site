import { ProcessState } from "./types";

export const logoutUserReducer = (state:any) => {
    let userInfo = localStorage.getItem("userInfo");
    if(userInfo) {
        localStorage.removeItem("userInfo");
    }
    let loggedOutUserProcessState:ProcessState = {
        loading: false,
        error: null,
    }
    state.loginProcess = loggedOutUserProcessState;
    state.userInfo = null;
}