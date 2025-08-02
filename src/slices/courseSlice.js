import {createSlice} from "@reduxjs/toolkit"

console.log(typeof(localStorage.getItem("token")))
const initialState = {
    courseList:[],
    loading:false,
    search:''
    
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setCourseList(state, value) {
            state.courseList = value.payload;
        },
        setSearch(state, value){
            state.search = value.payload;
        }
    },
});

export const {setSignupData, setToken , setLoading} = authSlice.actions;
export default authSlice.reducer;