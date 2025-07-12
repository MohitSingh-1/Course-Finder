import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
   totalItems:localStorage.getItem("totalItem")?JSON.parse(localStorage.getItem("totalItem")):0,
    
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItem(state, value){
            state.token = value.payload;
        },
        // user these three slice where toast will be used
        // add to cart
        // remove from cart
        // reset cart
    },
});

export const {setTotalItem} = cartSlice.actions;
export default cartSlice.reducer;
