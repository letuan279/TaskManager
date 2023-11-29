import { configureStore } from '@reduxjs/toolkit';
import { taskSlice } from './taskSlice';

const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
};
export const store = configureStore({
    reducer: {
        task: taskSlice.reducer
    },
});