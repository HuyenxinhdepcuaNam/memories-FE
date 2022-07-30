import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
    posts: [],
    currentId: null,

}

const url = 'http://localhost:5000/posts'

export const getPosts = createAsyncThunk('user/getPosts',
    async () => {
        try {
            const response = await axios(url)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const createPost = createAsyncThunk('user/createPost',
    async (newPost) => {
        try {
            const response = await axios.post(url, newPost)
            // console.log('check createPost', newPost)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updatePost = createAsyncThunk('user/updatePost',
    async (postData) => {
        try {
            // console.log('check response', postData)
            const response = await axios.patch(`${url}/${postData._id}`, postData)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = createAsyncThunk('user/deletePost',
    async (id) => {
        try {
            const { data } = await axios.delete(`${url}/${id}`)
            // console.log('check id', id)
            return id
        } catch (error) {
            console.log(error)
        }
    }
)

export const likePost = createAsyncThunk('user/likePost',
    async (id) => {
        try {
            const response = await axios.patch(`${url}/${id}/likePost`)
            // console.log('check likePost', response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getCurrentId: (state, action) => {
            state.currentId = action.payload
            // console.log('check currentId', state.currentId)
        }
    },
    extraReducers: {
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts = [...state.posts, action.payload]
        },
        [updatePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            // console.log('check updatePost', action.payload)
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
            // console.log('check updatePost', action.payload)
        },
        [likePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            // console.log('check updatePost', action.payload)
        },
    }
})

export const { posts, getCurrentId } = postSlice.actions

export default postSlice.reducer