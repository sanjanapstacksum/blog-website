import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: []
}

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    addUSers: (state, action) => {
     state.list = [...state.list,action.payload]
    },
    
  }
});
export const { addUSers} = BlogSlice.actions;
export default BlogSlice.reducer;
