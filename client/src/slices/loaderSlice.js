import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false
}

const loaderSlice = createSlice({
    name:"loader",
    initialState,
    reducers:{
        setLoader(state,action){
            state.loading=action.payload;
        }
    }
})

export const { setLoader} = loaderSlice.actions;

export default loaderSlice.reducer;