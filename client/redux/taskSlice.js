import { createSlice } from '@reduxjs/toolkit';
export const taskSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1;
        },
    },
});
export const { increment } = taskSlice.actions;