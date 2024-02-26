import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Blog,BlogState} from "../type/typeBlog";

const initialState: BlogState = {
    blogs: [],
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers:{
        addBlog:(state, action :PayloadAction<Blog> ) => {
            state.blogs.push(action.payload);
        }
    }
});

export const {addBlog} = blogSlice.actions;
export default blogSlice.reducer;