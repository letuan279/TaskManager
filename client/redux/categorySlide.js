import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategory',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/categories', {
                "user": "655a1d62787fe99d2289b2f7"
            });
            return response.data.data.categories;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (payload, { rejectWithValue }) => {
        try {
            payload.user = "655a1d62787fe99d2289b2f7"
            const response = await apiClient.post(`/categories/create`, payload);
            return response.data.data.category;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            payload.user = "655a1d62787fe99d2289b2f7"
            const response = await apiClient.put(`/categories/${id}`, payload);
            return response.data.data.category;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/categories/${id}`);
            return id;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
        [addCategory.pending]: (state, action) => {
            state.status = 'loading';
        },
        [addCategory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload)
        },
        [addCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
        [editCategory.pending]: (state, action) => {
            state.status = 'loading';
        },
        [editCategory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const editedCategoryIndex = state.data.findIndex(item => item._id === action.payload._id);
            if (editedCategoryIndex !== -1) {
                state.data[editedCategoryIndex] = action.payload;
            }
        },
        [editCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
        [deleteCategory.pending]: (state, action) => {
            state.status = 'loading';
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(item => item._id !== action.payload)
        },
        [deleteCategory.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    }
});
