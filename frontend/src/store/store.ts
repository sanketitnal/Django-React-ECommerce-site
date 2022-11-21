import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './user/userSlice';
import cartSliceReducer from './cart/cartSlice';
import {UserState} from "./user/types";

////////////////////////////////////////////////////////////////////
// userSliceReducer
const userPreloadedState: UserState = {
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
if(localStorage.getItem("userInfo")) {
    userPreloadedState.userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
}
////////////////////////////////////////////////////////////////////

const initialState = {
    user: userPreloadedState,
    cart: {
        addtocartProcess: {
            loading: false,
            error: null,
            success: null
        },
        loadCartProcess: {
            loading: false,
            error: null,
            success: null
        },
        cartItems: null,
        cartItemsIsLoading: null,
        cartItemsError: null
    }
};
const rootReducer = { 
    user: userSliceReducer,
    cart: cartSliceReducer
}
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;