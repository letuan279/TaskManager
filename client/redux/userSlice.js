import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient'
import { setupToken } from '@/utils/token';

export const edit = createAsyncThunk(
    'user/edit',
    async (editForm, { rejectWithValue }) => {
        try {
            setupToken()
            const response = await apiClient.post('/user/edit', editForm)
            const user = response.data.data
            return user;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (registerForm, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/user/register', registerForm)
            const user = response.data.data.user
            localStorage.setItem('token', response.data.data.accessToken)
            return user;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (token, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/user/check', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            return response.data.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (loginForm, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/user/login', loginForm);
            const user = response.data.data.user
            localStorage.setItem('token', response.data.data.accessToken)
            return user;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: {
        [register.pending]: (state, action) => {
            state.status = 'loading';
        },
        [register.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message;
        },
        [checkAuth.pending]: (state, action) => {
            state.status = 'loading';
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [checkAuth.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message;
        },
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message;
        },
        [edit.pending]: (state, action) => {
            state.status = 'loading';
        },
        [edit.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [edit.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message;
        },
    }
})
