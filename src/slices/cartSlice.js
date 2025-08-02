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
    },
});

export const {setTotalItem} = cartSlice.actions;
export default cartSlice.reducer;
