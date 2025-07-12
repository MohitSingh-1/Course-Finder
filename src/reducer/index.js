import {combineReducers} from  "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../../../../Study-Notion-master/src/slices/profileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer
})

export default rootReducer