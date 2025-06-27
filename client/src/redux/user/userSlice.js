import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currUser:null,
    err:null,
    loading:false
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reucers:{
        signInStart:(state)=>{
            state.loading=true;
            state.err=null;
        },
        signInSuccess:(state,action)=>{
            state.currUser=action.payload;
            state.loading=false;
            state.err=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.err=action.payload;
        },
    },
});

export const {signInFailure,signInStart,signInSuccess}=userSlice.actions;
export default userSlice.reducer;