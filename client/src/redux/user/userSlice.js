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
        updateStart:(state)=>{
            state.loading=true;
            state.err=null;
        },
        updateSuccess:(state,action)=>{
            state.currUser=action.payload;
            state.loading=false;
            state.err=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.err=action.payload;
        },
        dltUserStart:(state)=>{
            state.loading=true;
            state.err=null;
        },
        dltUserSuccess:(state)=>{
            state.currUser=null;
            state.loading=null;
            state.err=null;
        },
        dltUserFailure:(state,action)=>{
            state.loading=false;
            state.err=action.payload;
        },
    },
});

export const {signInFailure,signInStart,signInSuccess,updateFailure,updateStart,updateSuccess,dltUserFailure,dltUserStart,dltUserSuccess}=userSlice.actions;
export default userSlice.reducer;