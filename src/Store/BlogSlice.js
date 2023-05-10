import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: []
}

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    addUSers: (state, action) => {
     state.list.push(action.payload)
    },

    deleteUsers: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.list.find((user) => user.id === id);
      console.log(existingUser)
      if (existingUser) {
        return {...state.list,list: state.list.filter(user=> user.id!== id)}
      }
    },
    editUser: (state, action) => {
      const { id, Text,Description } = action.payload;
      const existingUser = state.list.find((user) => user.id === id);
      if (existingUser) {
        existingUser.Text = Text;
        existingUser.Description = Description;
      }
    }
  }
});
export const { addUSers,deleteUsers,editUser} = BlogSlice.actions;
export default BlogSlice.reducer;
