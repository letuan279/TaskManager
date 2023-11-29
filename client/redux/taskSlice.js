import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient'

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (arg, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/tasks', {
                "user": "655a1d62787fe99d2289b2f7"
            });
            return response.data.data.tasks;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchTasks.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [fetchTasks.rejected]: (state, action) => {
            state.status = 'failed';
            console.log("FAILED CASE::ACTION::", { action });
            state.error = action.payload.message;
        },
    }
});

// export const { getAll } = tasksSlice.actions;