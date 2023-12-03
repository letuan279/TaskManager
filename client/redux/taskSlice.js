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

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/tasks/${id}`);
            return id;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (payload, { rejectWithValue }) => {
        try {
            payload.user = "655a1d62787fe99d2289b2f7"
            payload.status = 1
            const response = await apiClient.post(`/tasks/create`, payload);
            return response.data.data.task;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
)

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            payload.user = "655a1d62787fe99d2289b2f7"
            const response = await apiClient.put(`/tasks/${id}`, payload);
            return response.data.data.task;
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
            state.error = action.payload.message;
        },
        [deleteTask.pending]: (state, action) => {
            state.status = 'loading';
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(item => item._id !== action.payload)
        },
        [deleteTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
        [addTask.pending]: (state, action) => {
            state.status = 'loading';
        },
        [addTask.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload)
        },
        [addTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
        [editTask.pending]: (state, action) => {
            state.status = 'loading';
        },
        [editTask.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            const editedTaskIndex = state.data.findIndex(item => item._id === action.payload._id);
            if (editedTaskIndex !== -1) {
                state.data[editedTaskIndex] = action.payload;
            }
        },
        [editTask.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    }
});

// export const { getAll } = tasksSlice.actions;